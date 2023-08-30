import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import MyInventory from "./pages/my_inventory";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-inventory" element={<MyInventory />} />
    </Routes>
  );
};
