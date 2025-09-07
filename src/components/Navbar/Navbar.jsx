// src/components/Navbar/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import { MicVocal } from 'lucide-react';
import { House } from 'lucide-react';
import { History } from 'lucide-react';
const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
            to="/" 
            className="flex items-center justify-center gap-2 text-xl font-bold hover:text-gray-200 transition-colors"
        >
            <MicVocal className="w-6 h-6" />
            <span>Speech Transcriber</span>
        </Link>

        <div className="flex space-x-6">
          <Link
  to="/"
  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
    location.pathname === "/" 
      ? "bg-blue-700 font-semibold" 
      : ""
  }`}
>
  <House className="w-5 h-5" />
  <span>Home</span>
</Link>
          <Link
            to="/history"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-blue-500 ${
              location.pathname === "/history" 
                ? "bg-blue-700 font-semibold" 
                : ""
            }`}
          >
            <History className="w-5 h-5"/>
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;