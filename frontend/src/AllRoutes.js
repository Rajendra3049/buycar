import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
