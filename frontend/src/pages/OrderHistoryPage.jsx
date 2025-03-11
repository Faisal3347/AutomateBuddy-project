import React from "react";
import CommonTable from "../components/Common/CommonTable";
import { getOrders } from "../utils/LocalStorageHelper";

export default function OrderHistoryPage() {
  const orders = getOrders() || []; 

  const tableData = orders.map((order) => {
    const orderDate = new Date(order.date); 

    return {
      OrderID: order.id,
      Date: orderDate.toLocaleDateString(), 
      Time: orderDate.toLocaleTimeString(),
      "Total Items": order.items.length
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        marginTop: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Order History</h1>
      <CommonTable data={tableData} />
    </div>
  );
}
