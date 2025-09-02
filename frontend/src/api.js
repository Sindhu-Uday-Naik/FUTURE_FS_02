// src/api.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchProducts(q='', category='') {
  const params = new URLSearchParams();
  if (q) params.append('q', q);
  if (category) params.append('category', category);
  const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}
