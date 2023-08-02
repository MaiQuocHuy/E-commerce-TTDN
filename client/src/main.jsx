import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { OrderProvider } from "./context/order.jsx";
import { WishProvider } from "./context/wish.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </WishProvider>
  </AuthProvider>
);
