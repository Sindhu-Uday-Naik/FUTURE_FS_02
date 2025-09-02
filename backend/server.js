// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve dress images from backend/public/dresses
const publicDir = path.join(__dirname, 'public');
app.use('/dresses', express.static(path.join(publicDir, 'dresses')));


const PORT = process.env.PORT || 5000;

// Load products from products.json
const productsPath = path.join(__dirname, 'products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// --- DB fallback logic: if MONGO_URI provided use mongoose, else use lowdb-like local file
let useMongo = false;
let OrderModel = null;

if (process.env.MONGO_URI) {
  useMongo = true;
  const mongoose = require('mongoose');
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error', err));

  const orderSchema = new mongoose.Schema({
    items: [{ productId: Number, qty: Number, price: Number, title: String }],
    total: Number,
    name: String,
    email: String,
    address: String,
    createdAt: { type: Date, default: Date.now }
  });

  OrderModel = mongoose.model('Order', orderSchema);
} else {
  // local JSON db file path (db.json)
  const lowdbPath = path.join(__dirname, 'db.json');
  if (!fs.existsSync(lowdbPath)) {
    fs.writeFileSync(lowdbPath, JSON.stringify({ orders: [] }, null, 2));
  }
}

// Routes
app.get('/api/products', (req, res) => {
  // simple search / filter support
  const q = (req.query.q || '').toLowerCase();
  const category = (req.query.category || '').toLowerCase();

  let filtered = products.slice();

  if (q) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category);
  }
  res.json(filtered);
});

// app.get('/api/products/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const p = products.find(x => x.id === id);
//   if (!p) return res.status(404).json({ message: 'Product not found' });
//   res.json(p);
// });

// server.js
app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (product) res.json(product);
  else res.status(404).json({ error: "Product not found" });
});


// Create order
app.post('/api/orders', async (req, res) => {
  const { items, total, name, email, address } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  if (useMongo) {
    try {
      const order = new OrderModel({ items, total, name, email, address });
      const saved = await order.save();
      return res.json({ id: saved._id, message: 'Order placed', order: saved });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    // save to db.json
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    const newOrder = {
      id: Date.now(),
      items,
      total,
      name,
      email,
      address,
      createdAt: new Date().toISOString()
    };
    db.orders.push(newOrder);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    return res.json({ id: newOrder.id, message: 'Order placed', order: newOrder });
  }
});

// Get orders (for admin / history)
app.get('/api/orders', async (req, res) => {
  if (useMongo) {
    try {
      const orders = await OrderModel.find().sort({ createdAt: -1 }).limit(50).lean();
      return res.json(orders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    const dbPath = path.join(__dirname, 'db.json');
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    return res.json(db.orders || []);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
