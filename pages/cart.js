import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    let c = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(c);
  }, []);

  const placeOrder = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in!");
      return;
    }
    await supabase.from("orders").insert({
      user_id: user.id,
      products: cart,
      address: address
    });
    localStorage.removeItem("cart");
    setCart([]);
    alert("Order placed!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">🛒 Cart</h1>
      {cart.map((c, i) => (
        <div key={i} className="p-2 border-b border-brandGold">
          {c.name} - ₹{c.price}
        </div>
      ))}
      <textarea
        className="block p-2 mt-4 text-black"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-brandGold text-black"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}
