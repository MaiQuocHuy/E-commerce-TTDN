import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../config";
import { useAuth } from "./auth";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [productInCart, setProductInCart] = useState([]);
  const [auth, setAuth] = useAuth();
  console.log(auth);
  useEffect(() => {
    const fetchData = async () => {
      console.log(auth?.user?._id, "ID");
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/get-all-product-cart`,
        {
          id: auth?.user?._id,
        }
      );
      console.log(data);
      if (data?.success) {
        setProductInCart(data?.existCart?.products);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  return (
    <CartContext.Provider value={[productInCart, setProductInCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
