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
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 focus:outline focus:outline-2 focus:outline-blue-800"
        >
          Arwa Shop
        </Link>

        {/* Desktop Navigation */}
        <nav role="navigation" aria-label="Menu principal" className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold focus:outline focus:outline-2 focus:outline-blue-800"
                : "hover:text-blue-700 transition-colors focus:outline focus:outline-2 focus:outline-blue-800"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold focus:outline focus:outline-2 focus:outline-blue-800"
                : "hover:text-blue-700 transition-colors focus:outline focus:outline-2 focus:outline-blue-800"
            }
          >
            Produits
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              (isActive
                ? "text-blue-700 font-semibold flex items-center focus:outline focus:outline-2 focus:outline-blue-800"
                : "hover:text-blue-700 transition-colors flex items-center focus:outline focus:outline-2 focus:outline-blue-800")
            }
            aria-label={`Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
          >
            Panier
            {cartCount > 0 && (
              <span
                aria-live="polite"
                className="ml-1 inline-block bg-red-600 text-white rounded-full px-2 text-xs font-bold"
              >
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold focus:outline focus:outline-2 focus:outline-blue-800"
                : "hover:text-blue-700 transition-colors focus:outline focus:outline-2 focus:outline-blue-800"
            }
          >
            À propos
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-700 font-semibold focus:outline focus:outline-2 focus:outline-blue-800"
                : "hover:text-blue-700 transition-colors focus:outline focus:outline-2 focus:outline-blue-800"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-blue-700 focus:outline focus:outline-2 focus:outline-blue-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          type="button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
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
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Menu mobile"
          className="md:hidden bg-white pb-4 px-4"
        >
          <nav className="flex flex-col space-y-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2 focus:outline focus:outline-2 focus:outline-blue-800"
                  : "hover:text-blue-700 transition-colors py-2 focus:outline focus:outline-2 focus:outline-blue-800"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </NavLink>

            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2 focus:outline focus:outline-2 focus:outline-blue-800"
                  : "hover:text-blue-700 transition-colors py-2 focus:outline focus:outline-2 focus:outline-blue-800"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Produits
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold flex items-center py-2 focus:outline focus:outline-2 focus:outline-blue-800"
                  : "hover:text-blue-700 transition-colors flex items-center py-2 focus:outline focus:outline-2 focus:outline-blue-800"
              }
              aria-label={`Panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Panier
              {cartCount > 0 && (
                <span
                  aria-live="polite"
                  className="ml-1 inline-block bg-red-600 text-white rounded-full px-2 text-xs font-bold"
                >
                  {cartCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2 focus:outline focus:outline-2 focus:outline-blue-800"
                  : "hover:text-blue-700 transition-colors py-2 focus:outline focus:outline-2 focus:outline-blue-800"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 font-semibold py-2 focus:outline focus:outline-2 focus:outline-blue-800"
                  : "hover:text-blue-700 transition-colors py-2 focus:outline focus:outline-2 focus:outline-blue-800"
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
