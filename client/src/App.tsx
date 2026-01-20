import { Routes, Route } from "react-router-dom";
import MainLayout from "./pages/main-layout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/products/ProductDetails";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  return (
    <Routes>
      {/* Define your routes here */}

      <Route path="/" element={<MainLayout />}>
        <Route element={<PersistLogin />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
