"use client";

import React, { useState, useEffect } from "react";
import { getArticles, addArticle } from "@/app/lib/firebase";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]); // Stan artykułów
  const [title, setTitle] = useState(""); // Stan tytułu
  const [content, setContent] = useState(""); // Stan treści
  const [loading, setLoading] = useState(false); // Stan ładowania
  const [error, setError] = useState(null); // Stan błędu

  // Pobierz artykuły przy pierwszym ładowaniu komponentu
  useEffect(() => {
    fetchArticles();
  }, []);

  // Funkcja pobierająca artykuły z Firestore
  const fetchArticles = async () => {
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
  };

  // Funkcja obsługująca dodanie nowego artykułu
  const handleAddArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newArticle = {
      title,
      content,
      date: new Date(),
    };

    try {
      await addArticle(newArticle);
      setTitle(""); // Wyczyść tytuł
      setContent(""); // Wyczyść treść
      fetchArticles(); // Odśwież listę artykułów
    } catch (err) {
      setError("Failed to add article.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Articles</h1>

      {/* Formularz dodawania artykułu */}
      <form
        onSubmit={handleAddArticle}
        className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-lg mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">Add Article</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full rounded-lg"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Article"}
        </button>
      </form>

      {/* Obsługa błędów */}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {/* Wyświetlanie artykułów */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Articles</h2>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="p-4 bg-white shadow-lg rounded-lg flex flex-col justify-between"
              >
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-gray-700 mt-2">{article.content}</p>
                <span className="text-gray-500 text-sm mt-4">
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
