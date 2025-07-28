import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";




interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const mainRef = useRef<HTMLDivElement>(null);
  const [mainHeight, setMainHeight] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(prod => {
          setProduct(prod);

          fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(prod.category)}`)
            .then(res => res.json())
            .then((products: Product[]) => {
              const relatedProducts = products.filter(p => p.id !== prod.id);
              setRelated(relatedProducts);
            });
        });
    }
  }, [id]);

  useEffect(() => {
    if (mainRef.current) {
      setMainHeight(mainRef.current.clientHeight);
    }
  }, [product]);

  // Add to cart handler
  function addToCart() {
    if (!product) return;

    const cartStr = localStorage.getItem("cart");
    let cart: { id: number; title: string; price: number; image: string; quantity: number }[] = cartStr
      ? JSON.parse(cartStr)
      : [];

    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`"${product.title}" ajouté au panier !`);
  }

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Link to="/products" className="text-blue-600 underline mb-4 inline-block">
        ← Retour à la liste des produits
      </Link>

      <div ref={mainRef} className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
            loading="lazy"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-blue-600 text-2xl font-semibold mb-6">${product.price}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <button
            onClick={addToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Related Products with Swiper */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Produits similaires</h2>
        {related.length === 0 ? (
          <p>Aucun produit similaire trouvé.</p>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {related.map((rel) => (
              <SwiperSlide key={rel.id}>
                <Link
                  to={`/products/${rel.id}`}
                  className={`
                    border rounded-lg shadow
                    hover:shadow-xl hover:scale-[1.03] transition-transform duration-300
                    block p-4 flex flex-col h-full bg-white
                  `}
                  style={{ minHeight: mainHeight ? `${mainHeight}px` : undefined }}
                >
                  <div className="flex-grow flex items-center justify-center mb-4">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-48 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-semibold line-clamp-2">{rel.title}</h3>
                  <p className="mt-2 text-blue-600 font-bold">${rel.price}</p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </div>
  );
}
