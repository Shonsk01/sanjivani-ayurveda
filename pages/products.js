import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// ✅ Supabase client setup (no separate file needed)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Our Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> - {p.category}
          </li>
        ))}
      </ul>
    </div>
  );
}
