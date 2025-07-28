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
      <section
        className="h-96 bg-cover bg-center flex items-center justify-center text-white mb-12"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')",
        }}
      >
        <h1 className="text-5xl font-extrabold bg-black/50 p-6 rounded">
          Découvrez nos produits de beauté
        </h1>
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
