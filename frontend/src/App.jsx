import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
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
                             <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/categories"
    element={
        <ProtectedRoute>
            <Categories />
        </ProtectedRoute>
    }
/>

<Route
    path="/suppliers"
    element={
        <ProtectedRoute>
            <Suppliers />
        </ProtectedRoute>
    }
/>
            </Routes>
              
        </BrowserRouter>
    );
}

export default App;