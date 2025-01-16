"use client"; // Komponent renderowany po stronie klienta

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; // Firebase observer do śledzenia stanu użytkownika
import { auth } from "./firebase"; // Import konfiguracji Firebase auth

// Tworzenie kontekstu autoryzacji
const AuthContext = createContext();

// Provider dla kontekstu autoryzacji
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stan dla aktualnego użytkownika
  const [loading, setLoading] = useState(true); // Stan ładowania (czy sprawdzamy stan użytkownika)

  // Ustawienie obserwatora na zmiany w stanie autoryzacji
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Ustawienie zalogowanego użytkownika w stanie
      setLoading(false); // Wyłączenie stanu ładowania
    });

    // Wyczyszczenie obserwatora po odmontowaniu komponentu
    return () => unsubscribe();
  }, []);

  // Renderowanie komponentu ładowania w trakcie sprawdzania stanu użytkownika
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children} {/* Przekazanie dzieci do kontekstu */}
    </AuthContext.Provider>
  );
};

// Hook do łatwego użycia kontekstu autoryzacji
export const useAuth = () => useContext(AuthContext);
