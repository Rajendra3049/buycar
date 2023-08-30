import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import MyInventory from "./pages/my_inventory";
import OEM_Details from "./pages/oemDetails";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-inventory" element={<MyInventory />} />
      <Route path="/oem-details" element={<OEM_Details />} />
    </Routes>
  );
};
