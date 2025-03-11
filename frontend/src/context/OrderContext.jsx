import { createContext, useState } from "react";
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addItem = (item) => {
    setOrder((prevOrder) => {
      const existing = prevOrder.find((i) => i.id === item.id);
      return existing
        ? prevOrder.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prevOrder, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => setOrder(order.filter((item) => item.id !== id));
  const updateQuantity = (id, qty) => setOrder(order.map((item) => item.id === id ? { ...item, quantity: qty } : item));

  const emptyOrders=()=>{
    setOrder([])
  }

  return (
    <OrderContext.Provider value={{ order, addItem, removeItem, updateQuantity,emptyOrders }}>
      {children}
    </OrderContext.Provider>
  );
};