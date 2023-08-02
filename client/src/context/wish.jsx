import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import BASE_URL from "../config";
import { useAuth } from "./auth";

const WishContext = createContext();
const WishProvider = ({ children }) => {
  const [wishes, setWishes] = useState([]);
  const [auth, setAuth] = useAuth();
  console.log(auth);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/auth/get-all-wishes`
      );
      if (data?.success) {
        console.log(data?.wishes?.products, "Product");
        setWishes(data?.wishes?.products);
      }
    };
    if (auth?.token) {
      fetchData();
    }
  }, [auth?.token]);
  return (
    <WishContext.Provider value={[wishes, setWishes]}>
      {children}
    </WishContext.Provider>
  );
};

const useWish = () => useContext(WishContext);

export { useWish, WishProvider };
