import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import Home from "./pages/Home";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import Header from './components/Header';
import OrderSummary from "./components/OrderSummary";


function App() {
  return (
    <OrderProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<OrderHistoryPage />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}
export default App;