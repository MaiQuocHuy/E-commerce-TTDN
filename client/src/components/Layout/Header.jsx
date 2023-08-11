import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { useAuth } from "../../context/auth";
import BASE_URL from "../../config";
import { useCart } from "../../context/cart";
import Searchinput from "../Searchinput";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [productInCart, setProductInCart] = useCart();
  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      navigate("/signin-page");
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const total = productInCart?.reduce(
        (intial, current) => intial + current.quantity * current.product.price,
        0
      );
      setSubTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      console.log(productInCart, "Product");
      getTotal();
    }
  }, [auth?.user, productInCart]);

  return (
    <header className="header--style-1">
      <nav className="primary-nav primary-nav-wrapper--border">
        <div
          className="container"
          style={{ paddingLeft: "50px", paddingRight: "50px" }}
        >
          <div className="primary-nav">
            <Link className="main-logo" to="/">
              <img src={logo} alt />
            </Link>
            <Searchinput />
            <div className="menu-init" id="navigation">
              <button
                className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs"
                type="button"
              />
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li
                    className="has-dropdown"
                    data-tooltip="tooltip"
                    data-placement="left"
                    title="Account"
                  >
                    <a>
                      <i className="far fa-user-circle" />
                    </a>
                    <span className="js-menu-toggle" />
                    <ul style={{ width: 120 }}>
                      <li>
                        <NavLink to="/user/dashboard-page">
                          <i className="fas fa-user-circle u-s-m-r-6" />
                          <span>Account</span>
                        </NavLink>
                      </li>
                      {!auth?.user ? (
                        <>
                          <li>
                            <NavLink to="/signup-page">
                              <i className="fas fa-user-plus u-s-m-r-6" />
                              <span>Signup</span>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/signin-page">
                              <i className="fas fa-lock u-s-m-r-6" />
                              <span>Signin</span>
                            </NavLink>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink onClick={handleSignout} to="#">
                              <i className="fas fa-lock-open u-s-m-r-6" />
                              <span>Signout</span>
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="secondary-nav-wrapper">
        <div className="container">
          <div className="secondary-nav">
            <div className="menu-init" id="navigation2">
              <button
                className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog"
                type="button"
              />
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                  <li>
                    <Link to="/shop-page">NEW ARRIVALS</Link>
                  </li>
                  <li className="has-dropdown">
                    <a href="#">
                      PAGES
                      <i className="fas fa-angle-down u-s-m-l-6" />
                    </a>
                    <span className="js-menu-toggle" />
                    <ul style={{ width: 170 }}>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <Link to={"/"}>
                          Home
                          {/* <i className="fas fa-angle-down i-state-right u-s-m-l-6" /> */}
                        </Link>
                      </li>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <Link to={"#"}>
                          Account
                          <i className="fas fa-angle-down i-state-right u-s-m-l-6" />
                        </Link>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{ width: 200 }}>
                          <li>
                            <Link to="/signin-page">
                              Signin / Already Registered
                            </Link>
                          </li>
                          <li>
                            <Link to="/signup-page">Signup / Register</Link>
                          </li>
                          <li>
                            <Link to="/forgotpassword-page">Lost Password</Link>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <Link to="/user/dashboard-page">
                          Dashboard
                          <i className="fas fa-angle-down i-state-right u-s-m-l-6" />
                        </Link>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{ width: 200 }}>
                          <li className="has-dropdown has-dropdown--ul-left-100">
                            <Link href="/user/dashboard-page">
                              Manage My Account
                              <i className="fas fa-angle-down i-state-right u-s-m-l-6" />
                            </Link>
                            {/*====== Dropdown ======*/}
                            <span className="js-menu-toggle" />
                            <ul style={{ width: 180 }}>
                              <li>
                                <Link to="dash-edit-profile.html">
                                  Edit Profile
                                </Link>
                              </li>
                              <li>
                                <Link to="dash-address-book.html">
                                  Edit Address Book
                                </Link>
                              </li>
                              <li>
                                <Link to="dash-manage-order.html">
                                  Manage Order
                                </Link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link href="/user/dashboardprofile-page">
                              My Profile
                            </Link>
                          </li>
                          <li className="has-dropdown has-dropdown--ul-left-100">
                            <a href="dash-address-book.html">
                              Address Book
                              <i className="fas fa-angle-down i-state-right u-s-m-l-6" />
                            </a>
                            {/*====== Dropdown ======*/}
                            <span className="js-menu-toggle" />
                            <ul style={{ width: 180 }}>
                              <li>
                                <a href="dash-address-make-default.html">
                                  Address Make Default
                                </a>
                              </li>
                              <li>
                                <a href="dash-address-add.html">
                                  Add New Address
                                </a>
                              </li>
                              <li>
                                <a href="dash-address-edit.html">
                                  Edit Address Book
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <Link to="/user/dashboardtrackorder-page">
                              Track Order
                            </Link>
                          </li>
                          <li>
                            <Link href="/user/dashboardmyorder-page">
                              My Orders
                            </Link>
                          </li>
                        </ul>
                      </li>

                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <Link to="/shop-page">Shop</Link>
                      </li>

                      <li>
                        <Link to="/cart-page">Cart</Link>
                      </li>
                      <li>
                        <Link to="/user/wishlist-page">Wishlist</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="menu-init" id="navigation3">
              <button
                className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop"
                type="button"
              />
              <span className="total-item-round">2</span>
              {/*====== Menu ======*/}
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li>
                    <NavLink to="/">
                      <i className="fas fa-home" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user/wishlist-page">
                      <i className="far fa-heart" />
                    </NavLink>
                  </li>
                  <li className="has-dropdown">
                    <a className="mini-cart-shop-link">
                      <i className="fas fa-shopping-bag" />
                      <span className="total-item-round">
                        {productInCart?.length || 0}
                      </span>
                    </a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <div className="mini-cart">
                      {/*====== Mini Product Container ======*/}
                      <div className="mini-product-container gl-scroll u-s-m-b-15">
                        {productInCart?.length != 0 ? (
                          productInCart?.map((item, index) => (
                            <div className="card-mini-product" key={index}>
                              <div className="mini-product">
                                <div className="mini-product__image-wrapper">
                                  <Link
                                    className="mini-product__link"
                                    to={`/product-detail-page/${item.product.slug}`}
                                  >
                                    <img
                                      className="u-img-fluid"
                                      src={`${BASE_URL}/api/e-commerce/product/product-photo/${item?.product?._id}`}
                                    />
                                  </Link>
                                </div>
                                <div className="mini-product__info-wrapper">
                                  <span className="mini-product__category">
                                    <Link to="#">
                                      {item.product.branch.name}
                                    </Link>
                                  </span>
                                  <span className="mini-product__name">
                                    <Link
                                      to={`/product-detail-page/${item.product.slug}`}
                                    >
                                      {item.product.name}
                                    </Link>
                                  </span>
                                  <span className="mini-product__quantity">
                                    {item.quantity} x
                                  </span>
                                  <span className="mini-product__price">
                                    ${item.product.price}
                                  </span>
                                </div>
                              </div>
                              <a className="mini-product__delete-link far fa-trash-alt" />
                            </div>
                          ))
                        ) : (
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            EMPTY
                          </h4>
                        )}
                      </div>
                      {/*====== End - Mini Product Container ======*/}
                      {/*====== Mini Product Statistics ======*/}
                      <div className="mini-product-stat">
                        <div className="mini-total">
                          <span className="subtotal-text">SUBTOTAL</span>
                          <span className="subtotal-value">${subTotal}</span>
                        </div>
                        <div className="mini-action">
                          <Link
                            className="mini-link btn--e-brand-b-2"
                            to="/user/checkout-page"
                          >
                            PROCEED TO CHECKOUT
                          </Link>
                          <Link
                            className="mini-link btn--e-transparent-secondary-b-2"
                            to="/cart-page"
                          >
                            VIEW CART
                          </Link>
                        </div>
                      </div>
                      {/*====== End - Mini Product Statistics ======*/}
                    </div>
                    {/*====== End - Dropdown ======*/}
                  </li>
                </ul>
                {/*====== End - List ======*/}
              </div>
              {/*====== End - Menu ======*/}
            </div>
            {/*====== End - Dropdown Main plugin ======*/}
          </div>
          {/*====== End - Secondary Nav ======*/}
        </div>
      </nav>
      {/*====== End - Nav 2 ======*/}
    </header>
  );
};

export default Header;
