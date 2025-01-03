import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Strona nie została znaleziona
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Przepraszamy, ale podana ścieżka nie istnieje.
      </p>
      <Link
        href="/user/login"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Powrót do strony logowania
      </Link>
    </div>
  );
}
