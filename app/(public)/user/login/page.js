"use client"; // Komponent renderowany po stronie klienta

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth } from "firebase/auth"; // Importujemy Firebase Auth

export default function SignInForm() {
  const [email, setEmail] = useState(""); // Stan dla email
  const [password, setPassword] = useState(""); // Stan dla hasła
  const [error, setError] = useState(""); // Stan dla błędów
  const [loading, setLoading] = useState(false); // Stan ładowania
  const router = useRouter(); // Router do nawigacji

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true); // Ustawiamy loading

    const auth = getAuth();
    try {
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/user/profile"); // Przekierowanie po udanym logowaniu
    } catch (error) {
      setError("Invalid email or password");
    } finally {
      setLoading(false); // Po zakończeniu ładowania
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-teal-500 via-blue-600 to-purple-700">
      <div className="w-full max-w-md bg-white p-12 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl lg:text-5xl font-semibold text-center text-gray-900 mb-8">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-xl font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-6 bg-teal-600 text-white text-xl font-semibold rounded-lg shadow-md ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-teal-700"
            } focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/user/register"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
