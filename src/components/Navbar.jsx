import { useState, useEffect } from "react";
import { ScanLine } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 w-full z-[100] ${
        scrolled
          ? "bg-black/50 backdrop-blur-lg border-b border-white/10"
          : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <ScanLine className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold text-lg">ProductScan</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors relative px-2 py-1"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="hidden sm:inline text-white font-medium">{user.name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
