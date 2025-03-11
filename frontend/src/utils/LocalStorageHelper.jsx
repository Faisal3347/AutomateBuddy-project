export const saveOrder = (order) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ id: Date.now(), date: new Date().toLocaleString(), items: order });
    localStorage.setItem("orders", JSON.stringify(orders));
  };
  export const getOrders = () => JSON.parse(localStorage.getItem("orders")) || [];
  