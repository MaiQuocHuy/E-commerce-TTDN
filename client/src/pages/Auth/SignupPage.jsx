import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <>
      <Layout title={"Sign-Up"}>
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
                              placeholder="Last Name"
                            />
                          </div>

                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-email">
                              E-MAIL *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="reg-email"
                              placeholder="Enter E-mail"
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reg-password">
                              PASSWORD *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="reg-password"
                              placeholder="Enter Password"
                            />
                          </div>
                          <div className="u-s-m-b-15">
                            <button
                              className="btn btn--e-transparent-brand-b-2"
                              type="submit"
                            >
                              CREATE
                            </button>
                          </div>
                          <a className="gl-link" href="#">
                            Return to Store
                          </a>
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
