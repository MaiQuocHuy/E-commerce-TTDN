import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import BASE_URL from "../../config";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState("");
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${BASE_URL}/api/e-commerce/auth/admin-auth`);
      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path="/admin/login-page" />;
}
