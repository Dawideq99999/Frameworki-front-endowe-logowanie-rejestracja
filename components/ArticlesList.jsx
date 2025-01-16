"use client";

import React, { useState, useEffect } from "react";
import { getArticles } from "@/app/lib/firebase";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
          >
            <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
            <p className="text-gray-600">{article.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(article.date.seconds * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesList;
