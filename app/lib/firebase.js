import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuZpWnRf0EgfAOq0axuhvZsbbTnIuT2Gw",
  authDomain: "lab5-27e91.firebaseapp.com",
  projectId: "lab5-27e91",
  storageBucket: "lab5-27e91.appspot.com",
  messagingSenderId: "703615843516",
  appId: "1:703615843516:web:6a7f9a725c1f4bd0ace4b9",
};

const app = initializeApp(firebaseConfig); // Upewnij się, że ta linia działa poprawnie
const auth = getAuth(app); // Używamy inicjalizowanego auth

// Funkcja rejestracji użytkownika
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.message); // Wyrzucamy błąd, jeśli wystąpił
  }
};

// Funkcja logowania użytkownika
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message); // Wyrzucamy błąd, jeśli wystąpił
  }
};

// Funkcja wylogowywania użytkownika
export const logoutUser = async () => {
  try {
    await signOut(auth); // Wylogowujemy użytkownika
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export { auth }; // Eksportujemy auth, aby można było go używać w innych częściach aplikacji
