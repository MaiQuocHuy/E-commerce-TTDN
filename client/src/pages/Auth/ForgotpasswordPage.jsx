import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const ForgotpasswordPage = () => {
  return (
    <Layout title={"Forgot - Password"}>
      <div>
        <div className="u-s-p-y-60">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="breadcrumb">
                <div className="breadcrumb__wrap">
                  <ul className="breadcrumb__list">
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
                            id="reset-email"
                            placeholder="Enter E-mail"
                          />
                        </div>
                        <div className="u-s-m-b-30">
                          <button
                            className="btn btn--e-transparent-brand-b-2"
                            type="submit"
                          >
                            SUBMIT
                          </button>
                        </div>
                        <div className="u-s-m-b-30">
                          <a className="gl-link" href="signin.html">
                            Back to Login
                          </a>
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
