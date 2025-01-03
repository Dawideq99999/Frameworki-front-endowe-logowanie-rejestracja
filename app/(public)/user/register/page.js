"use client"; // Komponent renderowany po stronie klienta

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerWithEmailAndPassword } from "@/app/lib/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState(""); // Stan dla email
  const [password, setPassword] = useState(""); // Stan dla hasła
  const [confirmPassword, setConfirmPassword] = useState(""); // Stan dla potwierdzenia hasła
  const [error, setError] = useState(""); // Stan dla błędów
  const [loading, setLoading] = useState(false); // Stan ładowania
  const router = useRouter(); // Router do nawigacji

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja hasła
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true); // Ustawiamy stan ładowania

    try {
      await registerWithEmailAndPassword(email, password); // Rejestracja użytkownika
      router.push("/user/login"); // Przekierowanie po udanej rejestracji
    } catch (error) {
      setError(error.message || "Registration failed. Please try again."); // Obsługa błędów
    } finally {
      setLoading(false); // Zakończenie procesu ładowania
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 sm:p-12 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl lg:text-5xl font-semibold text-center text-gray-900 mb-8">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 mt-2 bg-gray-100 text-gray-900 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 mt-6 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-teal-700"
            } focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Display error message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        {/* Link to login */}
        <div className="mt-6 text-center">
          <p className="text-lg text-gray-600">
            Already have an account?{" "}
            <a
              href="/user/login"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
