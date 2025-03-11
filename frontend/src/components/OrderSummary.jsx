import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
import { saveOrder } from "../utils/LocalStorageHelper";

export default function OrderSummary() {
  const { order, updateQuantity, removeItem } = useContext(OrderContext);
  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Order Summary</h2>
      {order.map((item) => (
        <div key={item.id}>
          <span>{item.name} - ${item.price} x {item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={() => { saveOrder(order); alert("Order saved!"); }}>Checkout</button>
    </div>
  );
}
