import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 flex items-center justify-center text-white mb-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <h1 className="text-4xl sm:text-5xl font-extrabold z-10 text-center px-4">
          Découvrez nos produits de beauté
        </h1>

        {/* Decorative SVG Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,256L80,250.7C160,245,320,235,480,213.3C640,192,800,160,960,149.3C1120,139,1280,149,1360,154.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Products Preview */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Nos Produits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map(product => (
            <article
              key={product.id}
              className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-contain p-4"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                  <p className="mt-2 text-blue-600 font-bold">${product.price}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Voir tous les produits
          </Link>
        </div>
      </section>
    </div>
  );
}
