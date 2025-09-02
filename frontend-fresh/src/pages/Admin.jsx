import React, { useState, useEffect } from "react";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", category: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);

  const saveProducts = updated => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const addProduct = e => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
    };
    saveProducts([...products, newProduct]);
    setForm({ name: "", price: "", category: "" });
  };

  const removeProduct = id => {
    saveProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={addProduct} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />
        <button className="bg-green-500 p-2 text-white rounded">Add Product</button>
      </form>
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="border p-2 flex justify-between items-center bg-white">
            <span>{p.name} - ₹{p.price.toFixed(2)} ({p.category})</span>
            <button onClick={() => removeProduct(p.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
