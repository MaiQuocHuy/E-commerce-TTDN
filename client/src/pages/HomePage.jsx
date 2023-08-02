/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import BASE_URL from "../config";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-hot-toast";
import { useWish } from "../context/wish";

const HomePage = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [products, setProducts] = useState([]);
  const [arriveproducts, setArriveproducts] = useState([]);
  const [ok, setOk] = useState(false);
  const [wishes, setWishes] = useWish();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const getAllBranch = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/branch/get-all-branch`
      );
      if (data?.success) {
        setBranches(data?.branch);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getArriveProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-arrive-product`
      );
      console.log(data);
      if (data?.products.length !== 0) {
        setArriveproducts(data.products);
      } else {
        setOk(true);
        setArriveproducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductByBranch = async (e, bid) => {
    e.preventDefault();
    console.log(bid);
    try {
      if (bid) {
        const { data } = await axios.get(
          `${BASE_URL}/api/e-commerce/product/get-product-by-branch/${bid}`
        );
        if (data?.products.length !== 0) {
          setProducts(data.products);
        } else {
          setOk(true);
          setProducts([]);
        }
      } else {
        await getAllProducts();
        setSelectedBranch(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (e, id) => {
    setSelectedBranch(id);
    getProductByBranch(e, id);
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-all-product`
      );
      if (data?.success) {
        setProducts(data.products);
      } else {
        setOk(true);
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishProduct = async (e) => {
    e.preventDefault();
    try {
      console.log(e.target.getAttribute("data-value"));
      const idProduct = e.target.getAttribute("data-value");
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/auth/wishproduct/${idProduct}`
      );
      if (data?.success) {
        toast.success(data?.message);
        console.log(data?.handleWish?.products, "Wish");
        setWishes(data?.handleWish?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBranch();
    getAllProducts();
    getArriveProduct();
  }, []);

  return (
    <Layout title={"Home-Page"}>
      {/*====== Primary Slider ======*/}
      <div className="s-skeleton s-skeleton--h-600 s-skeleton--bg-grey">
        <div className="owl-carousel primary-style-1" id="hero-slider">
          <div className="hero-slide hero-slide--1">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-1 u-c-secondary">
                      Latest Update Stock
                    </span>
                    <span className="content-span-2 u-c-secondary">
                      30% Off On Hand bag
                    </span>
                    <span className="content-span-3 u-c-secondary">
                      Find Hand bag on best prices, Also Discover most selling
                      products of Hand bag
                    </span>

                    <Link
                      className="shop-now-link btn--e-brand"
                      to="/shop-page"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Primary Slider ======*/}
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">
                    SHOP BY DEALS
                  </h1>
                  <span className="section__span u-c-silver">
                    BROWSE FAVOURITE DEALS
                  </span>
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
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img
                      className="aspect__img collection__img"
                      src="https://d2r00w08fz6ft0.cloudfront.net/ludus-demo/images/collection/coll-1.e2a1ae3280a159d25dbb4c6632512cad.jpg"
                      alt="Loading"
                    />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img
                      className="aspect__img collection__img"
                      src="https://d2r00w08fz6ft0.cloudfront.net/ludus-demo/images/collection/coll-2.b43db891b12712e5278d6fc1902c5a89.jpg"
                      alt="Loading"
                    />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img
                      className="aspect__img collection__img"
                      src="https://d2r00w08fz6ft0.cloudfront.net/ludus-demo/images/collection/coll-3.59cf0d5ad1a42583810bbc6ed14166cf.jpg"
                      alt="Loading"
                    />
                  </div>
                </a>
              </div>
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img
                      className="aspect__img collection__img"
                      src="https://d2r00w08fz6ft0.cloudfront.net/ludus-demo/images/collection/coll-4.58434c1995f2884afe06b5f835f41b1c.jpg"
                      alt="Loading"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*====== Section Content ======*/}
      </div>
      {/*====== End - Section 1 ======*/}
      {/*====== Section 2 ======*/}
      <div className="u-s-b-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-16">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">
                    TOP TRENDING
                  </h1>
                  <span className="section__span u-c-silver">
                    CHOOSE BRANCH
                  </span>
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
              <div className="col-lg-12">
                <div className="filter-category-container">
                  <div className="filter__category-wrapper">
                    <button
                      className={`btn filter__btn filter__btn--style-1 ${
                        selectedBranch === null ? "js-checked" : ""
                      }`}
                      type="button"
                      data-filter="*"
                      data-value={""}
                      onClick={(e) => {
                        let id = e.target.getAttribute("data-value");
                        handleButtonClick(e, id);
                      }}
                    >
                      ALL
                    </button>
                  </div>
                  {branches?.map((item) => (
                    <div className="filter__category-wrapper" key={item._id}>
                      <button
                        className={`btn filter__btn filter__btn--style-1 ${
                          selectedBranch === item._id ? "js-checked" : ""
                        }`}
                        type="button"
                        data-filter=".headphone"
                        data-value={item._id}
                        onClick={(e) => {
                          let id = e.target.getAttribute("data-value");
                          handleButtonClick(e, id);
                        }}
                      >
                        {item.name}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="filter__grid-wrapper u-s-m-t-30">
                  {products.length === 0 ? (
                    ok === false ? (
                      <Spin
                        indicator={antIcon}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ) : (
                      <div
                        className="loading"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0px 0px 10px 0px",
                        }}
                      >
                        <h3>Nothing</h3>
                      </div>
                    )
                  ) : (
                    <div className="row">
                      {products?.map((item) => (
                        <div
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item headphone"
                          key={item._id}
                        >
                          <div className="product-o product-o--hover-on product-o--radius">
                            <div className="product-o__wrap">
                              <Link
                                className="aspect aspect--bg-grey aspect--square u-d-block"
                                to={`/product-detail-page/${item.slug}`}
                              >
                                <img
                                  className="aspect__img"
                                  src={`${BASE_URL}/api/e-commerce/product/product-photo/${item._id}`}
                                />
                              </Link>
                            </div>
                            <span className="product-o__category">
                              <Link to="/shop-page">{item.branch.name}</Link>
                            </span>
                            <span className="product-o__name">
                              <Link to={`/product-detail-page/${item.slug}`}>
                                {item.name}
                              </Link>
                            </span>
                            <div className="product-o__rating gl-rating-style">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star-half-alt" />
                              <span className="product-o__review">(23)</span>
                            </div>
                            <span className="product-o__price">
                              {
                                <NumericFormat
                                  value={item.price.toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== End - Section 2 ======*/}
      {/*====== Section 4 ======*/}
      <div className="u-s-b-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">
                    NEW ARRIVALS
                  </h1>
                  <span className="section__span u-c-silver">
                    GET UP FOR NEW ARRIVALS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 4 ======*/}
      {/*====== Section 9 ======*/}
      <div className="u-s-p-b-60">
        {/*====== Section Content ======*/}
        <div className="section__content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="filter__grid-wrapper u-s-m">
                  {arriveproducts.length === 0 ? (
                    ok === false ? (
                      <Spin
                        indicator={antIcon}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    ) : (
                      <div
                        className="loading"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "0px 0px 10px 0px",
                        }}
                      >
                        <h3>Nothing</h3>
                      </div>
                    )
                  ) : (
                    <div className="row">
                      {arriveproducts?.map((item) => (
                        <div
                          className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item headphone"
                          key={item._id}
                        >
                          <div className="product-o product-o--hover-on product-o--radius">
                            <div className="product-o__wrap">
                              <Link
                                className="aspect aspect--bg-grey aspect--square u-d-block"
                                to={`/product-detail-page/${item.slug}`}
                              >
                                <img
                                  className="aspect__img"
                                  src={`${BASE_URL}/api/e-commerce/product/product-photo/${item._id}`}
                                />
                              </Link>
                              <div className="product-o__action-wrap">
                                <ul className="product-o__action-list">
                                  <li>
                                    <Link
                                      to="#"
                                      data-tooltip="tooltip"
                                      data-placement="top"
                                      data-value={item._id}
                                      title="Add to Wishlist"
                                      onClick={handleWishProduct}
                                    >
                                      <i className="fas fa-heart" />
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <span className="product-o__category">
                              <Link to="/shop-page">{item.branch.name}</Link>
                            </span>
                            <span className="product-o__name">
                              <Link to={`/product-detail-page/${item.slug}`}>
                                {item.name}
                              </Link>
                            </span>
                            <div className="product-o__rating gl-rating-style">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star-half-alt" />
                              <span className="product-o__review">(23)</span>
                            </div>
                            <span className="product-o__price">
                              {
                                <NumericFormat
                                  value={item.price.toFixed(2)}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                />
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== End - Section 9 ======*/}
      {/*====== Section 11 ======*/}
      <div className="u-s-p-b-90 u-s-m-b-30">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">
                    CLIENTS FEEDBACK
                  </h1>
                  <span className="section__span u-c-silver">
                    WHAT OUR CLIENTS SAY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
