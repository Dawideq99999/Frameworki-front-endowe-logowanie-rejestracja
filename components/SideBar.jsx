import Link from "next/link";

function SideBar({ children }) {
  return (
    <div className="drawer drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Główna treść strony */}
      <div className="drawer-content flex flex-col items-center justify-center bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 min-h-screen p-6">
        {children}
      </div>

      {/* Boczne menu */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-gray-100 text-gray-800 shadow-lg min-h-full w-64 p-4">
          {/* Elementy nawigacji */}
          <li className="mb-4">
            <Link
              href="/user/login"
              className="block p-2 text-lg font-semibold hover:bg-gray-200 rounded-lg transition"
            >
              Login
            </Link>
          </li>
          <li className="mb-4">
            <Link
              href="/user/profile"
              className="block p-2 text-lg font-semibold hover:bg-gray-200 rounded-lg transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/user/articles"
              className="block p-2 text-lg font-semibold hover:bg-gray-200 rounded-lg transition"
            >
              Articles
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
