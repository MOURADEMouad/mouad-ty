import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function getCartCount(): number {
  const cartStr = localStorage.getItem("cart");
  if (!cartStr) return 0;
  try {
    const cart = JSON.parse(cartStr);
    return cart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0);
  } catch {
    return 0;
  }
}

export default function Header() {
  const [cartCount, setCartCount] = useState(getCartCount());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    function updateCount() {
      setCartCount(getCartCount());
    }

    // Listen for localStorage changes in other tabs
    window.addEventListener("storage", updateCount);

    // Listen for custom event 'cartUpdated' in the same tab
    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Arwa Shop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "hover:text-blue-700 transition-colors"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "hover:text-blue-700 transition-colors"
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold flex items-center"
                : "hover:text-blue-700 transition-colors flex items-center"
            }
          >
            Panier
            {cartCount > 0 && (
              <span className="ml-1 inline-block bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "hover:text-blue-700 transition-colors"
            }
          >
            À propos
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold"
                : "hover:text-blue-700 transition-colors"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-blue-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2"
                  : "hover:text-blue-700 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2"
                  : "hover:text-blue-700 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold flex items-center py-2"
                  : "hover:text-blue-700 transition-colors flex items-center py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Panier
              {cartCount > 0 && (
                <span className="ml-1 inline-block bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2"
                  : "hover:text-blue-700 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2"
                  : "hover:text-blue-700 transition-colors py-2"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}