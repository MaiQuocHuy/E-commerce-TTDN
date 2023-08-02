import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../config";

const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const name = `${firstName}${lastName}`;
      const res = await axios.post(`${BASE_URL}/api/e-commerce/auth/register`, {
        name,
        email,
        password,
      });
      console.log(res?.data);
      if (res && res.data.success) {
        toast.success(res.data.message);
        const { data } = await axios.post(
          `${BASE_URL}/api/e-commerce/product/create-cart`,
          {
            id: res?.data?.user?._id,
          }
        );
        const resData = await axios.post(
          `${BASE_URL}/api/e-commerce/auth/create-wish`,
          {
            id: res?.data?.user?._id,
          }
        );
        if (data?.success && resData?.data?.success) {
          navigate("/signin-page");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Layout title={"Sign-Up"}>
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
                        <Link to="/signup-page">Signup</Link>
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
                        CREATE AN ACCOUNT
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
                        <h1 className="gl-h1">PERSONAL INFORMATION</h1>
                        <form className="l-f-o__form">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-fname">
                              FIRST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="reg-fname"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="First Name"
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-lname">
                              LAST NAME *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="reg-lname"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Last Name"
                            />
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-email">
                              E-MAIL *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="email"
                              id="reg-email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter E-mail"
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-password">
                              PASSWORD *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="password"
                              id="reg-password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="u-s-m-b-15">
                            <button
                              className="btn btn--e-transparent-brand-b-2"
                              type="submit"
                              onClick={handleCreate}
                            >
                              CREATE
                            </button>
                          </div>
                          <Link className="gl-link" to="/shop-page">
                            Return to Store
                          </Link>
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

export default SignupPage;
