import { useContext } from "react";
import { OrderContext } from "../context/OrderContext";
export default function MenuItem({ item }) {
  const { addItem } = useContext(OrderContext);
  return (
    <div className="p-4 border rounded">
      <h3>{item.name}</h3>
      <p>${item.price}</p>
      <button onClick={() => addItem(item)}>Add</button>
    </div>
  );
}