// src/components/Navbar/Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-gray-200 transition-colors">
          🎙️ Speech Transcriber
        </Link>
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
              location.pathname === "/" 
                ? "bg-blue-700 font-semibold" 
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/history"
            className={`px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
              location.pathname === "/history" 
                ? "bg-blue-700 font-semibold" 
                : ""
            }`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;