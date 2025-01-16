"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form"; // Import React Hook Form
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "@/app/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: "",
      city: "",
      zipCode: "",
      avatarColor: "#4682B4",
    },
  });

  const avatarColor = watch("avatarColor"); // Śledzenie zmiany koloru w czasie rzeczywistym

  // Pobieranie danych użytkownika i ustawienie w formularzu
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "users", user?.uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.address) {
            setValue("street", data.address.street || "");
            setValue("city", data.address.city || "");
            setValue("zipCode", data.address.zipCode || "");
          }
          if (data.avatar) {
            setValue("avatarColor", data.avatar.color || "#4682B4");
          }
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      }
    };

    if (!user) {
      router.push("/notfound");
    } else {
      fetchUserData();
    }
  }, [user, router, setValue]);

  // Obsługa wylogowania
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/user/login");
    } catch (error) {
      console.error("Błąd podczas wylogowania:", error);
    }
  };

  // Obsługa wysyłania formularza
  const onSubmit = async (data) => {
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          address: {
            street: data.street,
            city: data.city,
            zipCode: data.zipCode,
          },
          avatar: {
            color: data.avatarColor,
          },
        },
        { merge: true }
      );

      alert("Dane zostały zaktualizowane!");
    } catch (error) {
      console.error("Błąd podczas aktualizacji danych użytkownika:", error);
    }
  };

  // Generowanie inicjałów użytkownika
  const userInitials = (user?.displayName || user?.email || "User")
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white p-6">
      {/* Nagłówek z avatarem */}
      <h1 className="text-5xl font-bold text-center mb-4">Welcome, {userInitials}</h1>
      <div
        className="w-40 h-40 flex items-center justify-center rounded-full text-4xl font-bold shadow-lg mb-6"
        style={{ backgroundColor: avatarColor }}
      >
        {userInitials}
      </div>

      {/* Formularz aktualizacji */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Address and Avatar
        </h2>
        <div className="mb-4">
          <label htmlFor="street" className="block text-gray-700 font-semibold mb-2">
            Street:
          </label>
          <input
            id="street"
            {...register("street")}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
            City:
          </label>
          <input
            id="city"
            {...register("city")}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-gray-700 font-semibold mb-2">
            ZIP Code:
          </label>
          <input
            id="zipCode"
            {...register("zipCode")}
            className="p-2 bg-gray-100 text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="avatarColor" className="block text-gray-700 font-semibold mb-2">
            Avatar Color:
          </label>
          <input
            id="avatarColor"
            type="color"
            {...register("avatarColor")}
            className="w-full h-10"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition"
        >
          Update Address and Avatar
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
