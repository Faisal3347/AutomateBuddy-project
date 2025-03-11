import React, { useState } from "react";
import CommonTable from "../components/Common/CommonTable";
import { getOrders } from "../utils/LocalStorageHelper";

export default function OrderHistoryPage() {
  const orders = getOrders() || [];
  const [searchId, setSearchId] = useState(""); // State for search input

  // Filter orders based on search ID
  const filteredOrders = orders.filter((order) =>
    order.id.toString().includes(searchId)
  );

  const tableData = filteredOrders.map((order) => {
    const orderDate = new Date(order.date);
console.log(order.items?.items,"faisal");

    return {
      "Order ID": order.id,
      Date: orderDate.toLocaleDateString(),
      Time: orderDate.toLocaleTimeString(),
      "Total Price": order?.items?.finalTotal|| "0",
      "Items": Array.isArray(order.items) 
        ? order.items?.items.map(item => `${item.name}` (x`${item.quantity}`)).join(", ") 
        : "No items", 
    };
    
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", width: "95vw" }}>
      <h1 style={{  marginBottom: "20px" }}>Order History</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Order ID..."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        style={{
          // marginBottom: "15px",
          padding: "8px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <CommonTable data={tableData} />
    </div>
  );
}
