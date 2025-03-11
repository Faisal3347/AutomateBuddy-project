import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { saveOrder } from "../utils/LocalStorageHelper";

export default function OrderSummary() {
  const { order, updateQuantity, removeItem } = useContext(OrderContext);
  const [successMessage, setSuccessMessage] = useState(""); 

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (order.length === 0) {
      setSuccessMessage("⚠️ Your cart is empty! Add some items before checkout.");
      return;
    }

    saveOrder(order);
    setSuccessMessage("✅ Order placed successfully!");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Order Summary</h2>
      {order.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price} x {item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button onClick={handleCheckout}>Checkout</button>

      {/* Success Message */}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px", fontWeight: "bold" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
}
