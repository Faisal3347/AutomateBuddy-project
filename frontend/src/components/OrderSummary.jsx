import { useContext, useState } from "react";
import { OrderContext } from "../context/OrderContext";
import { saveOrder } from "../utils/LocalStorageHelper";
import CommonTable from "./Common/CommonTable"; 
import CommonButton from "./Common/CommonButton"; 

export default function OrderSummary() {
  const { order, updateQuantity, removeItem, setOrder } = useContext(OrderContext); 
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [discountType, setDiscountType] = useState(""); // "flat" or "percentage"

  // Generate unique Order ID
  const generateOrderID = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Calculate Subtotal
  const subtotal = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Apply Discount
  const flatDiscount = discountType === "flat" ? 5 : 0; // $5 off
  const percentageDiscount = discountType === "percentage" ? subtotal * 0.1 : 0; // 10% off
  const totalDiscount = flatDiscount + percentageDiscount;

  // Final Total after discount (NO TAX APPLIED)
  const finalTotal = subtotal - totalDiscount;

  const handleCheckout = () => {
    if (order.length === 0) {
      setSuccessMessage("⚠️ Your cart is empty! Add some items before checkout.");
      setIsError(true);
      return;
    }

    const orderID = generateOrderID();
    const newOrder = {
      id: orderID,
      date: new Date().toISOString(),
      items: order,
      subtotal,
      totalDiscount,
      finalTotal, // NO TAX INCLUDED
    };

    saveOrder(newOrder);

    // ✅ Clear cart
    setOrder([]);

    // ✅ Reset discount selection
    setDiscountType("");

    // ✅ Show success message
    setSuccessMessage(`✅ Order placed! Order ID: ${orderID}`);
    setIsError(false);
  };

  const tableData = order.map((item) => ({
    "Item Name": item.name,
    Price: `$${item.price}`,
    Quantity: (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <CommonButton onClick={() => updateQuantity(item.id, item.quantity + 1)} height="35px" width="35px" borderRadius="50%">
          +
        </CommonButton>
        <span>{item.quantity}</span>
        <CommonButton onClick={() => updateQuantity(item.id, item.quantity - 1)} height="35px" width="35px" borderRadius="50%">
          -
        </CommonButton>
      </div>
    ),
    Subtotal: `$${(item.price * item.quantity).toFixed(2)}`,
    Action: (
      <CommonButton onClick={() => removeItem(item.id)} color="error" height="30px" width="80px">
        Remove
      </CommonButton>
    ),
  }));

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Order Summary</h2>

      {order.length > 0 ? (
        <CommonTable data={tableData} />
      ) : (
        <p style={{ color: "red" }}>No items in the order.</p>
      )}

      {/* Discount Selection */}
      {order.length > 0 && (
        <div style={{ margin: "15px 0" }}>
          <label style={{ marginRight: "10px", fontWeight: "bold" }}>Select Discount:</label>
          <input type="radio" id="flat" name="discount" value="flat" checked={discountType === "flat"} onChange={() => setDiscountType("flat")} />
          <label htmlFor="flat" style={{ marginRight: "10px" }}>$5 Off</label>

          <input type="radio" id="percentage" name="discount" value="percentage" checked={discountType === "percentage"} onChange={() => setDiscountType("percentage")} />
          <label htmlFor="percentage">10% Off</label>
        </div>
      )}

      {/* Pricing Breakdown */}
      {order.length > 0 && (
        <>
          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
          <h4 style={{ color: "red" }}>Discount: -${totalDiscount.toFixed(2)}</h4>
          <h2 style={{ color: "green" }}>Final Total: ${finalTotal.toFixed(2)}</h2>
        </>
      )}

      <CommonButton onClick={handleCheckout} color="success" height="40px" width="150px">
        Place Order
      </CommonButton>

      {/* Success or Error Message */}
      {successMessage && (
        <p style={{ color: isError ? "red" : "green", marginTop: "10px", fontWeight: "bold" }}>
          {successMessage}
        </p>
      )}
    </div>
  );
}
