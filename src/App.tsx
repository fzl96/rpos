import { Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { OrderProvider } from "./context/OrderContext";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Menus from "./pages/Menus";
import MenusNew from "./pages/Menus-new";
import OrderNew from "./pages/Order-new";
import OrderSummary from "./pages/Order-summary";
import Orders from "./pages/Orders";

function App() {
  const location = useLocation();
  return (
    <>
      <AuthProvider>
        <MenuProvider>
          <OrderProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/menus" element={<Menus />} />
                <Route path="/menus/add" element={<MenusNew />} />
                <Route path="/orders/new" element={<OrderNew />} />
                <Route path="/orders/new/checkout" element={<OrderSummary />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </OrderProvider>
        </MenuProvider>
      </AuthProvider>
    </>
  );
}

export default App;
