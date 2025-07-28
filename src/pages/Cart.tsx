import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const cartStr = localStorage.getItem("cart");
    if (cartStr) {
      setCart(JSON.parse(cartStr));
    }
  }, []);

  function updateQuantity(id: number, qty: number) {
    if (qty < 1) return;
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  }

  function removeItem(id: number) {
    const filtered = cart.filter(item => item.id !== id);
    setCart(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return <p>Votre panier est vide. <Link to="/products" className="text-blue-600 underline">Voir les produits</Link></p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>
      <div className="space-y-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 border rounded p-4">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-contain" loading="lazy" />
            <div className="flex-grow">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-blue-600 font-bold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-2 rounded hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                onChange={e => updateQuantity(item.id, Number(e.target.value))}
                className="w-12 text-center border rounded"
                min={1}
              />
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-2 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 hover:underline ml-4"
              aria-label={`Supprimer ${item.title} du panier`}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <p className="text-xl font-semibold">
          Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </p>
        <button
          className="mt-4 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
          onClick={() => alert("Merci pour votre commande ! (fonctionnalité à implémenter)")}
        >
          Passer la commande
        </button>
      </div>
    </div>
  );
}
