// app/components/Protected.js

"use client";  // Komponent renderowany po stronie klienta

import { useAuth } from "@/app/lib/AuthContext"; // Importujemy hook, aby sprawdzić, czy użytkownik jest zalogowany
import { useRouter } from "next/navigation"; // Importujemy useRouter do przekierowania

function Protected({ children }) {
  const { user } = useAuth(); // Pobieramy użytkownika z kontekstu
  const router = useRouter(); // Inicjalizujemy router

  if (!user) {
    // Jeśli użytkownik nie jest zalogowany, przekierowujemy go na stronę logowania
    router.push("/user/login");
    return null; // Możesz tutaj dodać loading spinner, jeśli chcesz poczekać na autentykację
  }

  return <>{children}</>; // Zwracamy dzieci tylko, jeśli użytkownik jest zalogowany
}

export default Protected;
