import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-hot-toast";

const ForgotpasswordPage = () => {
  const [visible, setVisible] = useState(false);
  const [visiblePass, setVisiblePass] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [numberRandom, setNumberRandom] = useState("");
  const [numberEmail, setNumberEmail] = useState("");
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (e.target.textContent == "SUBMIT") {
      // console.log("submit");
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/forgot-password`,
        {
          email,
        }
      );
      if (data?.success) {
        setNumberEmail(data?.numberRandom);
        e.target.textContent = "ENTER OTP";
        setVisible(true);
        setTimeout(() => {
          console.log("change");
          setNumberEmail(Math.floor(Math.random() * 999999) + 100000);
        }, 30000);
      } else {
        toast.error(data?.error);
      }
    } else if (e.target.textContent == "ENTER OTP") {
      if (numberRandom == numberEmail) {
        e.target.textContent = "Update PassWord";
        setVisiblePass(true);
      } else {
        toast.error("OTP not correct");
      }
    } else if (e.target.textContent == "Update PassWord") {
      if (password) {
        const { data } = await axios.post(
          `${BASE_URL}/api/e-commerce/auth/update-password`,
          {
            password,
            email,
          }
        );
        if (data?.success) {
          toast.success("Update Password Successfully");
          navigate("/signin-page");
        } else {
          toast.error("Update Password Not Successfully");
        }
      }
    }
  };

  return (
    <Layout title={"Forgot - Password"}>
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
                      <Link to="/forgotpassword-page">Reset</Link>
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
                      FORGOT PASSWORD?
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
                      <h1 className="gl-h1">PASSWORD RESET</h1>
                      <span className="gl-text u-s-m-b-30">
                        Enter your email or username below and we will send you
                        a link to reset your password.
                      </span>
                      <form className="l-f-o__form">
                        <div className="u-s-m-b-30">
                          <label className="gl-label" htmlFor="reset-email">
                            E-MAIL *
                          </label>
                          <input
                            className="input-text input-text--primary-style"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="reset-email"
                            placeholder="Enter E-mail"
                          />
                        </div>
                        {visible && (
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reset-email">
                              OTP *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="number"
                              value={numberRandom}
                              onChange={(e) => setNumberRandom(e.target.value)}
                              id="reset-password"
                              placeholder="Enter OTP"
                            />
                          </div>
                        )}
                        {visiblePass && (
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reset-email">
                              PASSWORD *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              id="reset-password"
                              placeholder="Enter PASSWORD"
                            />
                          </div>
                        )}
                        <div className="u-s-m-b-30">
                          <button
                            className="btn btn--e-transparent-brand-b-2"
                            type="submit"
                            onClick={handleUpdate}
                          >
                            {!visible ? "SUBMIT" : "ENTER OTP"}
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <Link className="gl-link" to="/signin-page">
                            Back to Login
                          </Link>
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
  );
};

export default ForgotpasswordPage;
