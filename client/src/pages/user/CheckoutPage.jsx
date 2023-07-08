/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

const CheckoutPage = () => {
  return (
    <>
      <Layout title={"CheckOut-Page"}>
        <div>
          <div className="u-s-p-y-60">
            <div className="section__content">
              <div className="container">
                <div className="breadcrumb wrap-info">
                  <div className="breadcrumb__wrap wrap-info">
                    <ul className="breadcrumb__list wrap-info">
                      <li className="has-separator">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="is-marked">
                        <Link href="/checkout-page">Checkout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-b-60">
            <div className="section__content">
              <div className="container">
                <div className="checkout-f">
                  <div className="row">
                    <div className="col-lg-6">
                      <h1 className="checkout-f__h1">DELIVERY INFORMATION</h1>
                      <form className="checkout-f__delivery">
                        <div className="u-s-m-b-30">
                          <div className="u-s-m-b-15">
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="get-address" />
                              <div className="check-box__state check-box__state--primary">
                                <label
                                  className="check-box__label"
                                  htmlFor="get-address"
                                >
                                  Use default shipping and billing address from
                                  account
                                </label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </div>
                          {/*====== First Name, Last Name ======*/}
                          <div className="gl-inline">
                            <div className="u-s-m-b-15">
                              <label
                                className="gl-label"
                                htmlFor="billing-fname"
                              >
                                FIRST NAME *
                              </label>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                                id="billing-fname"
                                data-bill
                              />
                            </div>
                            <div className="u-s-m-b-15">
                              <label
                                className="gl-label"
                                htmlFor="billing-lname"
                              >
                                LAST NAME *
                              </label>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                                id="billing-lname"
                                data-bill
                              />
                            </div>
                          </div>
                          {/*====== End - First Name, Last Name ======*/}
                          {/*====== E-MAIL ======*/}
                          <div className="u-s-m-b-15">
                            <label className="gl-label" htmlFor="billing-email">
                              E-MAIL *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-email"
                              data-bill
                            />
                          </div>
                          {/*====== End - E-MAIL ======*/}
                          {/*====== PHONE ======*/}
                          <div className="u-s-m-b-15">
                            <label className="gl-label" htmlFor="billing-phone">
                              PHONE *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-phone"
                              data-bill
                            />
                          </div>
                          {/*====== End - PHONE ======*/}
                          {/*====== Street Address ======*/}
                          <div className="u-s-m-b-15">
                            <label
                              className="gl-label"
                              htmlFor="billing-street"
                            >
                              STREET ADDRESS *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-street"
                              placeholder="House name and street name"
                              data-bill
                            />
                          </div>
                          <div className="u-s-m-b-15">
                            <label htmlFor="billing-street-optional" />
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-street-optional"
                              placeholder="Apartment, suite unit etc. (optional)"
                              data-bill
                            />
                          </div>
                          {/*====== End - Street Address ======*/}
                          {/*====== Country ======*/}
                          <div className="u-s-m-b-15">
                            {/*====== Select Box ======*/}
                            <label
                              className="gl-label"
                              htmlFor="billing-country"
                            >
                              COUNTRY *
                            </label>
                            <select
                              className="select-box select-box--primary-style"
                              id="billing-country"
                              data-bill
                            >
                              <option selected value>
                                Choose Country
                              </option>
                              <option value="uae">
                                United Arab Emirate (UAE)
                              </option>
                              <option value="uk">United Kingdom (UK)</option>
                              <option value="us">United States (US)</option>
                            </select>
                            {/*====== End - Select Box ======*/}
                          </div>
                          {/*====== End - Country ======*/}
                          {/*====== Town / City ======*/}
                          <div className="u-s-m-b-15">
                            <label
                              className="gl-label"
                              htmlFor="billing-town-city"
                            >
                              TOWN/CITY *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-town-city"
                              data-bill
                            />
                          </div>
                          {/*====== End - Town / City ======*/}
                          {/*====== STATE/PROVINCE ======*/}
                          <div className="u-s-m-b-15">
                            {/*====== Select Box ======*/}
                            <label className="gl-label" htmlFor="billing-state">
                              STATE/PROVINCE *
                            </label>
                            <select
                              className="select-box select-box--primary-style"
                              id="billing-state"
                              data-bill
                            >
                              <option selected value>
                                Choose State/Province
                              </option>
                              <option value="al">Alabama</option>
                              <option value="al">Alaska</option>
                              <option value="ny">New York</option>
                            </select>
                            {/*====== End - Select Box ======*/}
                          </div>
                          {/*====== End - STATE/PROVINCE ======*/}
                          {/*====== ZIP/POSTAL ======*/}
                          <div className="u-s-m-b-15">
                            <label className="gl-label" htmlFor="billing-zip">
                              ZIP/POSTAL CODE *
                            </label>
                            <input
                              className="input-text input-text--primary-style"
                              type="text"
                              id="billing-zip"
                              placeholder="Zip/Postal Code"
                              data-bill
                            />
                          </div>
                          {/*====== End - ZIP/POSTAL ======*/}
                          <div className="u-s-m-b-10">
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input
                                type="checkbox"
                                id="make-default-address"
                                data-bill
                              />
                              <div className="check-box__state check-box__state--primary">
                                <label
                                  className="check-box__label"
                                  htmlFor="make-default-address"
                                >
                                  Make default shipping and billing address
                                </label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </div>
                          <div className="u-s-m-b-10">
                            <a
                              className="gl-link"
                              href="#create-account"
                              data-toggle="collapse"
                            >
                              Want to create a new account?
                            </a>
                          </div>
                          <div
                            className="collapse u-s-m-b-15"
                            id="create-account"
                          >
                            <span className="gl-text u-s-m-b-15">
                              Create an account by entering the information
                              below. If you are a returning customer please
                              login at the top of the page.
                            </span>
                            <div>
                              <label
                                className="gl-label"
                                htmlFor="reg-password"
                              >
                                Account Password *
                              </label>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                                data-bill
                                id="reg-password"
                              />
                            </div>
                          </div>
                          <div className="u-s-m-b-10">
                            <label className="gl-label" htmlFor="order-note">
                              ORDER NOTE
                            </label>
                            <textarea
                              className="text-area text-area--primary-style"
                              id="order-note"
                              defaultValue={""}
                            />
                          </div>
                          <div>
                            <button
                              className="btn btn--e-transparent-brand-b-2"
                              type="submit"
                            >
                              SAVE
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6">
                      <h1 className="checkout-f__h1">ORDER SUMMARY</h1>
                      <div className="o-summary">
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__item-wrap gl-scroll">
                            <div className="o-card">
                              <div className="o-card__flex">
                                <div className="o-card__img-wrap">
                                  <img
                                    className="u-img-fluid"
                                    src="images/product/electronic/product3.jpg"
                                    alt
                                  />
                                </div>
                                <div className="o-card__info-wrap">
                                  <span className="o-card__name">
                                    <a href="product-detail.html">
                                      Yellow Wireless Headphone
                                    </a>
                                  </span>
                                  <span className="o-card__quantity">
                                    Quantity x 1
                                  </span>
                                  <span className="o-card__price">$150.00</span>
                                </div>
                              </div>
                              <a className="o-card__del far fa-trash-alt" />
                            </div>
                            <div className="o-card">
                              <div className="o-card__flex">
                                <div className="o-card__img-wrap">
                                  <img
                                    className="u-img-fluid"
                                    src="images/product/electronic/product18.jpg"
                                    alt
                                  />
                                </div>
                                <div className="o-card__info-wrap">
                                  <span className="o-card__name">
                                    <a href="product-detail.html">
                                      Nikon DSLR Camera 4k
                                    </a>
                                  </span>
                                  <span className="o-card__quantity">
                                    Quantity x 1
                                  </span>
                                  <span className="o-card__price">$150.00</span>
                                </div>
                              </div>
                              <a className="o-card__del far fa-trash-alt" />
                            </div>
                            <div className="o-card">
                              <div className="o-card__flex">
                                <div className="o-card__img-wrap">
                                  <img
                                    className="u-img-fluid"
                                    src="images/product/women/product8.jpg"
                                    alt
                                  />
                                </div>
                                <div className="o-card__info-wrap">
                                  <span className="o-card__name">
                                    <a href="product-detail.html">
                                      New Dress D Nice Elegant
                                    </a>
                                  </span>
                                  <span className="o-card__quantity">
                                    Quantity x 1
                                  </span>
                                  <span className="o-card__price">$150.00</span>
                                </div>
                              </div>
                              <a className="o-card__del far fa-trash-alt" />
                            </div>
                            <div className="o-card">
                              <div className="o-card__flex">
                                <div className="o-card__img-wrap">
                                  <img
                                    className="u-img-fluid"
                                    src="images/product/men/product8.jpg"
                                    alt
                                  />
                                </div>
                                <div className="o-card__info-wrap">
                                  <span className="o-card__name">
                                    <a href="product-detail.html">
                                      New Fashion D Nice Elegant
                                    </a>
                                  </span>
                                  <span className="o-card__quantity">
                                    Quantity x 1
                                  </span>
                                  <span className="o-card__price">$150.00</span>
                                </div>
                              </div>
                              <a className="o-card__del far fa-trash-alt" />
                            </div>
                          </div>
                        </div>
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__box">
                            <h1 className="checkout-f__h1">
                              SHIPPING &amp; BILLING
                            </h1>
                            <div className="ship-b">
                              <span className="ship-b__text">Ship to:</span>
                              <div className="ship-b__box u-s-m-b-10">
                                <p className="ship-b__p">
                                  4247 Ashford Drive Virginia VA-20006 USA (+0)
                                  900901904
                                </p>
                                <a
                                  className="ship-b__edit btn--e-transparent-platinum-b-2"
                                  data-modal="modal"
                                  data-modal-id="#edit-ship-address"
                                >
                                  Edit
                                </a>
                              </div>
                              <div className="ship-b__box">
                                <span className="ship-b__text">
                                  Bill to default billing address
                                </span>
                                <a
                                  className="ship-b__edit btn--e-transparent-platinum-b-2"
                                  data-modal="modal"
                                  data-modal-id="#edit-ship-address"
                                >
                                  Edit
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__box">
                            <table className="o-summary__table">
                              <tbody>
                                <tr>
                                  <td>SHIPPING</td>
                                  <td>$4.00</td>
                                </tr>
                                <tr>
                                  <td>TAX</td>
                                  <td>$0.00</td>
                                </tr>
                                <tr>
                                  <td>SUBTOTAL</td>
                                  <td>$379.00</td>
                                </tr>
                                <tr>
                                  <td>GRAND TOTAL</td>
                                  <td>$379.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__box">
                            <h1 className="checkout-f__h1">
                              PAYMENT INFORMATION
                            </h1>
                            <form className="checkout-f__payment">
                              <div className="u-s-m-b-10">
                                <div className="radio-box">
                                  <input
                                    type="radio"
                                    id="cash-on-delivery"
                                    name="payment"
                                  />
                                  <div className="radio-box__state radio-box__state--primary">
                                    <label
                                      className="radio-box__label"
                                      htmlFor="cash-on-delivery"
                                    >
                                      Cash on Delivery
                                    </label>
                                  </div>
                                </div>
                                <span className="gl-text u-s-m-t-6">
                                  Pay Upon Cash on delivery. (This service is
                                  only available for some countries)
                                </span>
                              </div>

                              <div className="u-s-m-b-10">
                                <div className="radio-box">
                                  <input
                                    type="radio"
                                    id="pay-pal"
                                    name="payment"
                                  />
                                  <div className="radio-box__state radio-box__state--primary">
                                    <label
                                      className="radio-box__label"
                                      htmlFor="pay-pal"
                                    >
                                      Pay Pal
                                    </label>
                                  </div>
                                </div>
                                <span className="gl-text u-s-m-t-6">
                                  When you click "Place Order" below we'll take
                                  you to Paypal's site to set up your billing
                                  information.
                                </span>
                              </div>

                              <div>
                                <button
                                  className="btn btn--e-brand-b-2"
                                  type="submit"
                                >
                                  PLACE ORDER
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CheckoutPage;
