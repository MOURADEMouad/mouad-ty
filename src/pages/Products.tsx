import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data));
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const filteredProducts =
    filteredCategory === "all"
      ? products
      : products.filter(p => p.category === filteredCategory);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Tous les produits</h1>


      <div className="mb-6">
        <select
          className="border rounded p-2"
          value={filteredCategory}
          onChange={e => setFilteredCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>
=
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
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
    </div>
  );
}
