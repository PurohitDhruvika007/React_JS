// src/App.jsx
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import ProductList from "./components/ProductList/ProductList";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddProducts from "./components/AddProducts/AddProducts";
import UpdateProducts from "./components/UpdateProducts/UpdateProducts";

export default function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<SignIn />} />

      {/* Private Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        }
      />

      <Route
        path="/addproduct"
        element={
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        }
      />

      <Route
        path="/updateproduct/:id"
        element={
          <PrivateRoute>
            <UpdateProducts />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
