"use client";

import React, { useState } from "react";
import { addArticle } from "@/app/lib/firebase";
import { auth } from "@/app/lib/firebase"; // Import Firebase Auth

const AddArticle = ({ onArticleAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pobierz ID zalogowanego użytkownika
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("You need to be logged in to add articles.");
      return;
    }

    const article = {
      title,
      content,
      date: new Date(),
      userId: currentUser.uid, // Dodaj userId
    };

    await addArticle(article);

    setTitle("");
    setContent("");
    if (onArticleAdded) onArticleAdded();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mb-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Article
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
