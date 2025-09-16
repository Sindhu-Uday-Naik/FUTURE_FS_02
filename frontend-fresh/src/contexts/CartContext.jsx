
// import React, { createContext, useContext, useEffect, useReducer } from "react";

// const CartContext = createContext();

// const initialState = (() => {
//   try {
//     return JSON.parse(localStorage.getItem("cart_v1")) || [];
//   } catch {
//     return [];
//   }
// })();

// function reducer(state, action) {
//   switch (action.type) {
//     case "ADD": {
//       const existing = state.find((i) => i.id === action.item.id);
//       if (existing) {
//         return state.map((i) =>
//           i.id === action.item.id
//             ? { ...i, qty: i.qty + (action.qty || 1) }
//             : i
//         );
//       }
//       return [...state, { ...action.item, qty: action.qty || 1 }];
//     }
//     case "UPDATE_QTY":
//       return state.map((i) =>
//         i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
//       );
//     case "REMOVE":
//       return state.filter((i) => i.id !== action.id);
//     case "CLEAR":
//       return [];
//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [cart, dispatch] = useReducer(reducer, initialState);
//   const count = cart.reduce((sum, i) => sum + i.qty, 0);
//   const subtotal = cart.reduce(
//     (sum, i) => sum + i.qty * Number(i.price || 0),
//     0
//   );

//   useEffect(() => {
//     localStorage.setItem("cart_v1", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, dispatch, count, subtotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);














// frontend-fresh/src/contexts/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useRef } from "react";
// NOTE: we intentionally import useAuth but also handle it being undefined/null gracefully
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const initialState = [];

/** reducer: same actions as before, plus SET to replace cart */
function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return Array.isArray(action.cart) ? action.cart : [];
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: Number(i.qty || 0) + (action.qty || 1) } : i
        );
      }
      // ensure qty exists as number and we do not strip fields like image, brand etc.
      const itemToAdd = { ...action.item, qty: action.qty || 1 };
      return [...state, itemToAdd];
    }
    case "UPDATE_QTY":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, Number(action.qty)) } : i
      );
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const auth = (() => {
    try {
      return useAuth();
    } catch (e) {
      // if useAuth throws because provider ordering is wrong or something else, we fallback
      return null;
    }
  })();

  // `user` may be undefined/null; try to read it consistently
  const user = auth && auth.user ? auth.user : null;

  // Create a stable user key; prefer email when available; falls back to "guest"
  const makeKey = (u) => {
    if (!u) return "cart_guest";
    // sanitize email to be a valid key (replace @ and dots)
    const email = typeof u.email === "string" ? u.email : (u.name || "user");
    const safe = String(email).replace(/[^a-z0-9_\-@.]/gi, "_");
    return `cart_${safe}`;
  };

  const userKey = makeKey(user);

  const [cart, dispatch] = useReducer(reducer, initialState);

  // keep a ref of last userKey so we can detect changes across mounts
  const lastUserKeyRef = useRef(userKey);

  // Load cart for the active user when component mounts and whenever userKey changes
  useEffect(() => {
    async function load() {
      try {
        const raw = localStorage.getItem(userKey);
        let parsed = raw ? JSON.parse(raw) : [];

        // ensure parsed is array and normalize qty & numeric fields
        if (!Array.isArray(parsed)) parsed = [];

        parsed = parsed.map((it) => ({
          ...it,
          qty: Number(it.qty) || 1,
          price: it.price !== undefined ? Number(it.price) : it.price,
        }));

        dispatch({ type: "SET", cart: parsed });
      } catch (err) {
        console.error("CartContext: failed to load cart from localStorage", err);
        dispatch({ type: "SET", cart: [] });
      }
    }

    // If userKey changed (user logged in/out), we load the new user's cart.
    if (lastUserKeyRef.current !== userKey) {
      lastUserKeyRef.current = userKey;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userKey]); // only depend on userKey

  // Persist cart whenever it changes for the current userKey
  useEffect(() => {
    try {
      // keep JSON compact but safe
      localStorage.setItem(userKey, JSON.stringify(cart));
    } catch (err) {
      console.error("CartContext: failed to save cart to localStorage", err);
    }
  }, [cart, userKey]);

  const count = cart.reduce((sum, i) => sum + Number(i.qty || 0), 0);
  const subtotal = cart.reduce((sum, i) => sum + Number(i.qty || 0) * Number(i.price || 0), 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
export default CartProvider;
