
import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const initialState = (() => {
  try {
    return JSON.parse(localStorage.getItem("cart_v1")) || [];
  } catch {
    return [];
  }
})();

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id
            ? { ...i, qty: i.qty + (action.qty || 1) }
            : i
        );
      }
      return [...state, { ...action.item, qty: action.qty || 1 }];
    }
    case "UPDATE_QTY":
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i
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
  const [cart, dispatch] = useReducer(reducer, initialState);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce(
    (sum, i) => sum + i.qty * Number(i.price || 0),
    0
  );

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
