"use client"; // Komponent renderowany po stronie klienta

import { useEffect, useState } from "react"; // Importujemy hooki useEffect i useState
import { useRouter } from "next/navigation"; // Router do przekierowań
import { useAuth } from "@/app/lib/AuthContext"; // Importujemy kontekst autoryzacji
import { signOut } from "firebase/auth"; // Funkcja wylogowania z Firebase
import { auth } from "@/app/lib/firebase"; // Importujemy auth z Firebase

export default function ProfilePage() {
  const { user } = useAuth(); // Pobieramy informacje o użytkowniku z kontekstu autoryzacji
  const router = useRouter(); // Inicjalizujemy router do nawigacji
  const [loading, setLoading] = useState(true); // Ustawiamy stan ładowania na true

  useEffect(() => {
    if (!user) {
      router.push("/notfound");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/user/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userInitials = (user?.displayName || user?.email || "User")
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#8A2BE2"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white p-6">
      {/* Nagłówek witający użytkownika */}
      <h1 className="text-5xl font-bold text-center mb-4">Welcome, {userInitials}</h1>

      {/* Opis strony profilu */}
      <p className="text-xl text-center text-gray-200 mb-6">
        This is your profile page. Manage your account and settings here.
      </p>

      {/* Avatar z inicjałami użytkownika */}
      <div
        className="w-40 h-40 flex items-center justify-center rounded-full text-4xl font-bold shadow-lg mb-6"
        style={{ backgroundColor: randomColor }}
      >
        {userInitials}
      </div>

      {/* Przycisk do wylogowania */}
      <button
        onClick={handleLogout}
        className="px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
}
