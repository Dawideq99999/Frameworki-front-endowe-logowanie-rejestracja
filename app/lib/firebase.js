import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where 
} from "firebase/firestore";

// Konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuZpWnRf0EgfAOq0axuhvZsbbTnIuT2Gw",
  authDomain: "lab5-27e91.firebaseapp.com",
  projectId: "lab5-27e91",
  storageBucket: "lab5-27e91.appspot.com",
  messagingSenderId: "703615843516",
  appId: "1:703615843516:web:6a7f9a725c1f4bd0ace4b9",
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Funkcja rejestracji użytkownika
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Rejestracja zakończona sukcesem:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Błąd rejestracji:", error.message);
    throw new Error(error.message);
  }
};

// Funkcja logowania użytkownika
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logowanie zakończone sukcesem:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Błąd logowania:", error.message);
    throw new Error(error.message);
  }
};

// Funkcja wylogowywania użytkownika
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Wylogowano użytkownika");
  } catch (error) {
    console.error("Błąd podczas wylogowywania:", error.message);
    throw new Error(error.message);
  }
};

// Funkcja do pobierania artykułów zalogowanego użytkownika
export const getArticles = async () => {
  const articles = [];
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("Nie zalogowano użytkownika.");
      return articles;
    }

    const q = query(
      collection(db, "articles"),
      where("userId", "==", currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    return articles;
  } catch (error) {
    console.error("Błąd pobierania artykułów:", error);
    throw new Error(error.message);
  }
};

// Funkcja do dodawania artykułów
export const addArticle = async (article) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("Użytkownik nie jest zalogowany.");
    }

    const newArticle = {
      ...article,
      userId: currentUser.uid, // Dodaj userId
    };

    const docRef = await addDoc(collection(db, "articles"), newArticle);
    console.log("Artykuł dodany z ID:", docRef.id);
  } catch (error) {
    console.error("Błąd dodawania artykułu:", error.message);
    throw new Error(error.message);
  }
};

// Eksport obiektów Firebase
export { auth, db };
