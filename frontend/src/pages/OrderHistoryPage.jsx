import React from "react";
import CommonTable from "../components/Common/CommonTable";
import { getOrders } from "../utils/LocalStorageHelper";

export default function OrderHistoryPage() {
  const orders = getOrders() || []; // Ensure it's not undefined

  const tableData = orders.map((order) => ({
    OrderID: order.id,
    Date: order.date,
    "Total Items": order.items.length
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
       marginLeft:"25rem",
        padding:"1rem"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Order History</h1>
      <CommonTable data={tableData} />
    </div>
  );
}
