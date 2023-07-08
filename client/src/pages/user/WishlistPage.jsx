import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  return (
    <>
      <Layout title={"Wish-List"}>
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
                        <Link to="/user/wishlist-page">Wishlist</Link>
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
                        Wishlist
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
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    {/*====== Wishlist Product ======*/}
                    <div className="w-r u-s-m-b-30">
                      <div className="w-r__container">
                        <div className="w-r__wrap-1">
                          <div className="w-r__img-wrap">
                            <img
                              className="u-img-fluid"
                              src="images/product/electronic/product3.jpg"
                              alt
                            />
                          </div>
                          <div className="w-r__info">
                            <span className="w-r__name">
                              <a href="product-detail.html">
                                Yellow Wireless Headphone
                              </a>
                            </span>
                            <span className="w-r__category">
                              <a href="shop-side-version-2.html">Electronics</a>
                            </span>
                            <span className="w-r__price">
                              $125.00
                              <span className="w-r__discount">$160.00</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-r__wrap-2">
                          <a
                            className="w-r__link btn--e-brand-b-2"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            ADD TO CART
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="product-detail.html"
                          >
                            VIEW
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="#"
                          >
                            REMOVE
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*====== End - Wishlist Product ======*/}
                    {/*====== Wishlist Product ======*/}
                    <div className="w-r u-s-m-b-30">
                      <div className="w-r__container">
                        <div className="w-r__wrap-1">
                          <div className="w-r__img-wrap">
                            <img
                              className="u-img-fluid"
                              src="images/product/women/product8.jpg"
                              alt
                            />
                          </div>
                          <div className="w-r__info">
                            <span className="w-r__name">
                              <a href="product-detail.html">
                                New Dress D Nice Elegant
                              </a>
                            </span>
                            <span className="w-r__category">
                              <a href="shop-side-version-2.html">
                                Women Clothing
                              </a>
                            </span>
                            <span className="w-r__price">
                              $125.00
                              <span className="w-r__discount">$160.00</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-r__wrap-2">
                          <a
                            className="w-r__link btn--e-brand-b-2"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            ADD TO CART
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="product-detail.html"
                          >
                            VIEW
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="#"
                          >
                            REMOVE
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*====== End - Wishlist Product ======*/}
                    {/*====== Wishlist Product ======*/}
                    <div className="w-r u-s-m-b-30">
                      <div className="w-r__container">
                        <div className="w-r__wrap-1">
                          <div className="w-r__img-wrap">
                            <img
                              className="u-img-fluid"
                              src="images/product/men/product8.jpg"
                              alt
                            />
                          </div>
                          <div className="w-r__info">
                            <span className="w-r__name">
                              <a href="product-detail.html">
                                New Fashion D Nice Elegant
                              </a>
                            </span>
                            <span className="w-r__category">
                              <a href="shop-side-version-2.html">
                                Men Clothing
                              </a>
                            </span>
                            <span className="w-r__price">
                              $125.00
                              <span className="w-r__discount">$160.00</span>
                            </span>
                          </div>
                        </div>
                        <div className="w-r__wrap-2">
                          <a
                            className="w-r__link btn--e-brand-b-2"
                            data-modal="modal"
                            data-modal-id="#add-to-cart"
                          >
                            ADD TO CART
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="product-detail.html"
                          >
                            VIEW
                          </a>
                          <a
                            className="w-r__link btn--e-transparent-platinum-b-2"
                            href="#"
                          >
                            REMOVE
                          </a>
                        </div>
                      </div>
                    </div>
                    {/*====== End - Wishlist Product ======*/}
                  </div>
                  <div className="col-lg-12">
                    <div className="route-box">
                      <div className="route-box__g">
                        <Link className="route-box__link" to="/shop-page">
                          <i className="fas fa-long-arrow-alt-left" />
                          <span>CONTINUE SHOPPING</span>
                        </Link>
                      </div>
                      <div className="route-box__g">
                        <a className="route-box__link" href="wishlist.html">
                          <i className="fas fa-trash" />
                          <span>CLEAR WISHLIST</span>
                        </a>
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

export default WishlistPage;
