import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useOrder } from "../../context/order";
import { useWish } from "../../context/wish";

const UserMenu = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");
  const [wishes, setWishes] = useWish();
  const [orders, setOrders] = useOrder();
  const handleTabClick = (tabName) => {
    console.log(tabName);
    setActiveTab(tabName);
  };

  return (
    <>
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
                      <Link to="/dashboard">My Account</Link>
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
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="dash">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    {/*====== Dashboard Features ======*/}
                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                      <div className="dash__pad-1">
                        <span className="dash__text u-s-m-b-16">
                          Hello, John Doe
                        </span>
                        <ul className="dash__f-list">
                          <li>
                            <NavLink
                              to="/user/dashboard-page"
                              onClick={() => handleTabClick("dashboard")}
                            >
                              Manage My Account
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/user/dashboardprofile-page"
                              onClick={() => handleTabClick("dashboardprofile")}
                            >
                              My Profile
                            </NavLink>
                          </li>

                          <li>
                            <NavLink
                              to="/user/dashboardmyorder-page"
                              onClick={() => handleTabClick("dashboardmyorder")}
                            >
                              My Orders
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/user/dashboardmypassword-page"
                              onClick={() =>
                                handleTabClick("dashboardmypassword")
                              }
                            >
                              My Password
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                      <div className="dash__pad-1">
                        <ul className="dash__w-list">
                          <li>
                            <div className="dash__w-wrap">
                              <span className="dash__w-icon dash__w-icon-style-1">
                                <i className="fas fa-cart-arrow-down" />
                              </span>
                              <span className="dash__w-text">
                                {orders.length || 0}
                              </span>
                              <span className="dash__w-name">
                                Orders Placed
                              </span>
                            </div>
                          </li>

                          <li>
                            <div className="dash__w-wrap">
                              <span className="dash__w-icon dash__w-icon-style-3">
                                <i className="far fa-heart" />
                              </span>
                              <span className="dash__w-text">
                                {wishes?.length}
                              </span>
                              <span className="dash__w-name">Wishlist</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/*====== End - Dashboard Features ======*/}
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
      </div>
    </>
  );
};

export default UserMenu;
