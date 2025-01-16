"use client"; // Komponent renderowany po stronie klienta

import { useEffect, useState } from "react"; // Importujemy hooki Reacta
import { useRouter } from "next/navigation"; // Router do nawigacji
import { useAuth } from "@/app/lib/AuthContext"; // Importujemy kontekst autoryzacji
import { signOut } from "firebase/auth"; // Funkcja wylogowania z Firebase
import { auth, db } from "@/app/lib/firebase"; // Import Firebase
import { doc, setDoc, getDoc } from "firebase/firestore"; // Funkcje do obsługi Firestore

export default function ProfilePage() {
  const { user } = useAuth(); // Pobieramy informacje o użytkowniku
  const router = useRouter(); // Router do nawigacji
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [street, setStreet] = useState(""); // Pole ulicy
  const [city, setCity] = useState(""); // Pole miasta
  const [zipCode, setZipCode] = useState(""); // Pole kodu pocztowego

  useEffect(() => {
    // Sprawdzanie, czy użytkownik jest zalogowany
    if (!user) {
      router.push("/notfound");
    } else {
      setLoading(false);
      fetchUserAddress(); // Pobieramy adres użytkownika
    }
  }, [user, router]);

  const fetchUserAddress = async () => {
    try {
      const docRef = doc(db, "users", user.uid); // Pobieranie dokumentu użytkownika
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.address) {
          setStreet(data.address.street || "");
          setCity(data.address.city || "");
          setZipCode(data.address.zipCode || "");
        }
      }
    } catch (error) {
      console.error("Błąd podczas pobierania adresu:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/user/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, "users", user.uid); // Tworzenie/aktualizacja dokumentu użytkownika
      await setDoc(docRef, {
        address: {
          street,
          city,
          zipCode,
        },
      }, { merge: true });

      alert("Address updated successfully!");
    } catch (error) {
      console.error("Błąd podczas aktualizacji adresu:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">Loading...</div>;
  }

  const userInitials = (user?.displayName || user?.email || "User")
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  const colors = ["#FF6347", "#4682B4", "#32CD32", "#FFD700", "#8A2BE2"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white p-6">
      {/* Nagłówek */}
      <h1 className="text-5xl font-bold text-center mb-4">Welcome, {userInitials}</h1>

      {/* Avatar */}
      <div
        className="w-40 h-40 flex items-center justify-center rounded-full text-4xl font-bold shadow-lg mb-6"
        style={{ backgroundColor: randomColor }}
      >
        {userInitials}
      </div>

      {/* Formularz aktualizacji adresu */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Update Address</h2>

        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">
            Street:
          </label>
          <input
            id="street"
            type="text"
            placeholder="Enter street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
            City:
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 font-semibold mb-2">
            ZIP Code:
          </label>
          <input
            id="zipCode"
            type="text"
            placeholder="Enter ZIP Code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
        >
          Update Address
        </button>
      </form>

      {/* Przycisk wylogowania */}
      <button
        onClick={handleLogout}
        className="mt-6 px-8 py-3 bg-red-600 text-white font-bold text-lg rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
}
