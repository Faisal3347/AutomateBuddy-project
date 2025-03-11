import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { saveOrder } from "../utils/LocalStorageHelper";
import CommonTable from "./Common/CommonTable"; 
import CommonButton from "./Common/CommonButton"; 

export default function OrderSummary() {
  const { order, updateQuantity, removeItem } = useContext(OrderContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false); 

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (order.length === 0) {
      setSuccessMessage("⚠️ Your cart is empty! Add some items before checkout.");
      setIsError(true); 
      return;
    }

    saveOrder(order);
    setSuccessMessage("✅ Order placed successfully!");
    setIsError(false); 
  };

  const tableData = order.map((item) => ({
    "Item Name": item.name,
    Price: `$${item.price}`,
    Quantity: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <CommonButton 
          onClick={() => updateQuantity(item.id, item.quantity + 1)} 
          height="35px" 
          width="35px"
          borderRadius="50%"
        >
          +
        </CommonButton>
        <span>{item.quantity}</span>
        <CommonButton 
          onClick={() => updateQuantity(item.id, item.quantity - 1)} 
          height="35px" 
          width="35px"
          borderRadius="50%"
        >
          -
        </CommonButton>
      </div>
    ),
    Subtotal: `$${(item.price * item.quantity).toFixed(2)}`,
    Action: (
      <CommonButton 
        onClick={() => removeItem(item.id)} 
        color="error" 
        height="30px" 
        width="80px"
      >
        Remove
      </CommonButton>
    )
  }));

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Order Summary</h2>

      {order.length > 0 ? (
        <CommonTable data={tableData} />
      ) : (
        <p style={{ color: "red" }}>No items in the order.</p>
      )}

      <h3>Total: ${total.toFixed(2)}</h3>
      
      <CommonButton onClick={handleCheckout} color="success" height="40px" width="150px">
        Place Order
      </CommonButton>

      {/* Success or Error Message */}
      {successMessage && (
        <p style={{ 
          color: isError ? "red" : "green", 
          marginTop: "10px", 
          fontWeight: "bold" 
        }}>
          {successMessage}
        </p>
      )}
    </div>
  );
}
