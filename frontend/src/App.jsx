import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";
import Home from "./pages/Home";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import Header from './components/Header';


function App() {
  return (
    <OrderProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<OrderHistoryPage />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}
export default App;