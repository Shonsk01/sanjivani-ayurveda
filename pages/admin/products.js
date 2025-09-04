import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0 });

  useEffect(() => {
    async function loadProducts() {
      let { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
    loadProducts();
  }, []);

  const addProduct = async () => {
    await supabase.from("products").insert(newProduct);
    alert("Product added!");
    location.reload();
  };

  const deleteProduct = async (id) => {
    await supabase.from("products").delete().eq("id", id);
    alert("Deleted!");
    location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">🛠 Manage Products</h1>
      <input
        className="block p-2 mt-2 text-black"
        placeholder="Name"
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        className="block p-2 mt-2 text-black"
        placeholder="Description"
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        className="block p-2 mt-2 text-black"
        placeholder="Price"
        type="number"
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button
        className="mt-2 px-4 py-2 bg-brandGold text-black"
        onClick={addProduct}
      >
        Add Product
      </button>
      <div className="mt-6">
        {products.map((p) => (
          <div key={p.id} className="p-2 border-b border-brandGold">
            {p.name} - ₹{p.price}
            <button
              className="ml-4 text-red-400"
              onClick={() => deleteProduct(p.id)}
            >
              ❌ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
