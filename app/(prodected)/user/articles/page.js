"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getArticles, addArticle } from "@/app/lib/firebase"; // Import Firestore functions
import { useAuth } from "@/app/lib/AuthContext"; // Import authentication context
import { useRouter } from "next/navigation"; // Router for redirection
import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const ArticlesPage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const router = useRouter(); // Router for navigation
  const [articles, setArticles] = useState([]); // Articles state
  const [title, setTitle] = useState(""); // Title of the new article
  const [content, setContent] = useState(""); // Content of the new article
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [avatarColor, setAvatarColor] = useState("#4682B4"); // Default avatar color

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/notfound");
    }
  }, [user, router]);

  // Fetch avatar color from Firestore
  const fetchAvatarColor = useCallback(async () => {
    try {
      const docRef = doc(db, "users", user?.uid); // Get the user's document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.avatar && data.avatar.color) {
          setAvatarColor(data.avatar.color); // Set the avatar color
        }
      }
    } catch (error) {
      console.error("Error fetching avatar color:", error);
    }
  }, [user?.uid]);

  // Fetch articles from Firestore
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    } catch (err) {
      setError("Failed to load articles.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    if (user) {
      fetchAvatarColor();
      fetchArticles();
      setLoading(false);
    }
  }, [user, fetchAvatarColor, fetchArticles]);

  // Handle adding a new article
  const handleAddArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      title,
      content,
      date: new Date(), // Add the current date
    };

    try {
      await addArticle(newArticle); // Add the article to Firestore
      setTitle(""); // Clear the form
      setContent("");
      fetchArticles(); // Refresh the articles list
    } catch (err) {
      setError("Failed to add article.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate user initials for the avatar
  const userInitials = (user?.displayName || user?.email || "User")
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white p-6">
      {/* Header with avatar */}
      <div className="flex flex-col items-center mb-6">
        <div
          className="w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold shadow-lg mb-2"
          style={{ backgroundColor: avatarColor }}
        >
          {userInitials}
        </div>
        <h1 className="text-5xl font-bold text-center">Articles</h1>
      </div>

      {/* Add Article Form */}
      <form
        onSubmit={handleAddArticle}
        className="bg-white p-6 rounded-lg shadow-md mb-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Article</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Article"}
        </button>
      </form>

      {/* Error Handling */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Display Articles */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-4">Your Articles</h2>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col justify-between"
              >
                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-4">{article.content}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(article.date.seconds * 1000).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
