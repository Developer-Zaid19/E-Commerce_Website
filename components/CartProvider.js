"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("aurevia-cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        setProducts([]);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem("aurevia-cart", JSON.stringify(items));
    }
  }, [items, ready]);

  const enrichedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...product, quantity: item.quantity } : null;
        })
        .filter(Boolean),
    [items, products],
  );

  const totals = useMemo(() => {
    const subtotal = enrichedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const shipping = subtotal > 0 && subtotal < 120 ? 9 : 0;
    const tax = Math.round(subtotal * 0.08);
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      count: enrichedItems.reduce((sum, item) => sum + item.quantity, 0),
    };
  }, [enrichedItems]);

  function addItem(id) {
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { id, quantity: 1 }];
    });
  }

  function updateQuantity(id, quantity) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    items: enrichedItems,
    totals,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
