import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      let { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
    loadProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">🌿 संजीवनी आयुर्वेद</h1>
      <Link href="/cart" className="text-brandGold underline">🛒 Cart</Link>
      <div className="grid grid-cols-1 gap-4 mt-6">
        {products.map((p) => (
          <div key={p.id} className="p-4 border border-brandGold rounded-xl">
            <h2 className="text-xl">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-brandGold">₹{p.price}</p>
            <button
              className="mt-2 px-4 py-2 bg-brandGold text-black rounded-lg"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
