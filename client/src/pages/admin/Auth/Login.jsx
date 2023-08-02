import { useState } from "react";
import BASE_URL from "../../../config";
import "../../../styles/adminlte.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      if (password && email) {
        const { data } = await axios.post(
          `${BASE_URL}/api/e-commerce/auth/login`,
          {
            email,
            password,
          }
        );
        console.log(data);
        if (data && data.success) {
          setAuth({
            ...auth,
            user: data.user,
            token: data.token,
          });
          localStorage.setItem("auth", JSON.stringify(data));
          navigate(location.state || "/admin/dashboard-page");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-page">
        <div className="login-box">
          {/* /.login-logo */}
          <div className="card card-outline card-primary">
            <div className="card-header text-center">
              <a href="#" className="h3">
                Administrative Panel
              </a>
            </div>
            <div className="card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <form action="dashboard.html" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
            </div>
            {/* /.card-body */}
          </div>
          {/* /.card */}
        </div>
      </div>
    </>
  );
};

export default Login;
