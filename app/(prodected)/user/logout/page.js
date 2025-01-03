"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth"; // Importujemy funkcję wylogowania
import { auth } from "@/app/lib/firebase"; // Firebase auth

export default function LogoutPage() {
  const [loading, setLoading] = useState(true); // Stan ładowania
  const [error, setError] = useState(null); // Stan błędu
  const router = useRouter();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setLoading(true); // Rozpoczynamy ładowanie
        await signOut(auth); // Wylogowujemy użytkownika
        router.push("/user/login"); // Przekierowanie na stronę logowania po wylogowaniu
      } catch (error) {
        setError("Error logging out: " + error.message); // Obsługa błędów
        console.error("Error logging out:", error);
      } finally {
        setLoading(false); // Kończymy ładowanie
      }
    };

    logoutUser(); // Wywołujemy funkcję wylogowania
  }, [router]);

  if (loading) {
    return <div>Logging out...</div>; // Komunikat podczas wylogowywania
  }

  if (error) {
    return <div>{error}</div>; // Wyświetlamy komunikat o błędzie
  }

  return null; // Po wylogowaniu i przekierowaniu nie wyświetlamy nic
}
