import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../config";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/login`,
        {
          email,
          password,
        }
      );
      if (data?.success) {
        setAuth({
          ...auth,
          user: data?.user,
          token: data?.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(location.state || "/");
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Layout title={"Sign-In"}>
        <div>
          <div className="u-s-p-y-60">
            {/*====== Section Content ======*/}
            <div className="section__content">
              <div className="container">
                <div className="breadcrumb wrap-info">
                  <div className="breadcrumb__wrap wrap-info">
                    <ul className="breadcrumb__list wrap-info">
                      <li className="has-separator">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="is-marked">
                        <Link to="/signup-page">Signin</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section 1 ======*/}
          {/*====== Section 2 ======*/}
          <div className="u-s-p-b-60">
            {/*====== Section Intro ======*/}
            <div className="section__intro u-s-m-b-60">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section__text-wrap">
                      <h1 className="section__heading u-c-secondary">
                        ALREADY REGISTERED?
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*====== End - Section Intro ======*/}
            {/*====== Section Content ======*/}
            <div className="section__content">
              <div className="container">
                <div className="row row--center">
                  <div className="col-lg-6 col-md-8 u-s-m-b-30">
                    <div className="l-f-o">
                      <div className="l-f-o__pad-box">
                        <h1 className="gl-h1">I'M NEW CUSTOMER</h1>
                        <span className="gl-text u-s-m-b-30">
                          By creating an account with our store, you will be
                          able to move through the checkout process faster,
                          store shipping addresses, view and track your orders
                          in your account and more.
                        </span>
                        <div className="u-s-m-b-15">
                          <Link
                            className="l-f-o__create-link btn--e-transparent-brand-b-2"
                            to="/signup-page"
                          >
                            CREATE AN ACCOUNT
                          </Link>
                        </div>
                        <h1 className="gl-h1">SIGNIN</h1>
                        <span className="gl-text u-s-m-b-30">
                          If you have an account with us, please log in.
                        </span>
                        <form className="l-f-o__form">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="login-email">
                              E-MAIL *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="email"
                              id="login-email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter E-mail"
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label
                              className="gl-label"
                              htmlFor="login-password"
                            >
                              PASSWORD *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="password"
                              id="login-password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              <button
                                className="btn btn--e-transparent-brand-b-2"
                                type="submit"
                                onClick={handleLogin}
                              >
                                LOGIN
                              </button>
                            </div>
                            <div className="u-s-m-b-30">
                              <Link
                                className="gl-link"
                                to="/forgotpassword-page"
                              >
                                Lost Your Password?
                              </Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*====== End - Section Content ======*/}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SigninPage;
