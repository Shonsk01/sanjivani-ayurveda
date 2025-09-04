import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      let { data } = await supabase.from("orders").select("*");
      setOrders(data || []);
    }
    loadOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl">📦 Orders</h1>
      {orders.map((o) => (
        <div key={o.id} className="p-4 border border-brandGold mt-2">
          <p><b>ID:</b> {o.id}</p>
          <p><b>Products:</b> {JSON.stringify(o.products)}</p>
          <p><b>Address:</b> {o.address}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
}
