import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../config";
import { useAuth } from "./auth";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/e-commerce/product/get-all-orders/${auth?.user?._id}`
        );
        console.log(data, "Da vao");
        if (data?.success) {
          console.log(data?.orders);
          setOrders(data?.orders);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) {
      console.log(auth?.user?._id);
      fetchData();
    }
  }, [auth?.token]);
  return (
    <OrderContext.Provider value={[orders, setOrders]}>
      {children}
    </OrderContext.Provider>
  );
};

const useOrder = () => useContext(OrderContext);

export { useOrder, OrderProvider };
