import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useSearch } from "../../context/search";
import { LoadingOutlined } from "@ant-design/icons";
import { Pagination, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useCart } from "../../context/cart";
import { useWish } from "../../context/wish";
import { useAuth } from "../../context/auth";

const SearchPage = () => {
  const [startIndex, setStartIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [values, setValues] = useSearch();
  const [ok, setOk] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productInCart, setProductInCart] = useCart();
  const [wishes, setWishes] = useWish();
  const [auth, setAuth] = useAuth();
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const idProduct = e.target.getAttribute("data-value");
    try {
      if (auth?.user != null) {
        const { data } = await axios.post(
          `${BASE_URL}/api/e-commerce/product/add-to-cart`,
          {
            idProduct: idProduct,
            id: auth?.user?._id,
            quantity: counter,
          }
        );
        if (data?.success) {
          toast.success("Added successfully");
          console.log(data?.cart);
          setProductInCart(data?.cart?.products);
        } else toast.error(data?.error);
      } else navigate("/signin-page");
    } catch (error) {
      console.log(error);
    }
  };

  const findWishProduct = (id) => {
    try {
      if (wishes?.length != 0) {
        for (const item of wishes) {
          console.log(item.product._id);
          if (item.product._id == id) return true;
        }
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishProduct = async (e) => {
    e.preventDefault();
    try {
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

  const handlePageClick = (page, pageSize) => {
    try {
      console.log(page, pageSize, "Page");
      setCurrentPage(page);
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (wishes?.length != 0) console.log(wishes, "Wish");
  }, [wishes, wishes?.length]);
  return (
    <>
      <Layout title={"Shop - Page"}>
        <div className="u-s-p-y-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="shop-p">
                  <div className="shop-p__toolbar u-s-m-b-30">
                    <div className="shop-p__tool-style">
                      <div className="tool-style__group u-s-m-b-8">
                        <span className="js-shop-grid-target is-active">
                          Grid
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="shop-p__collection">
                    {values?.result?.length === 0 ? (
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
                        <h3
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Empty
                        </h3>
                      )
                    ) : (
                      <div className="row is-grid-active">
                        {values?.result?.map((item) => (
                          <div
                            className="col-lg-3 col-md-6 col-sm-6"
                            key={item._id}
                          >
                            <div
                              className="product-m"
                              style={{ position: "relative" }}
                            >
                              <div className="product-m__thumb">
                                <Link
                                  className="aspect aspect--bg-grey aspect--square u-d-block"
                                  to={`/product-detail-page/${item.slug}`}
                                >
                                  <img
                                    className="aspect__img"
                                    src={`${BASE_URL}/api/e-commerce/product/product-photo/${item._id}`}
                                    alt
                                  />
                                </Link>

                                <div
                                  className={`product-m__add-cart ${
                                    item.inventory <= 0 && "disabled"
                                  }`}
                                >
                                  <Link
                                    className="btn--e-brand"
                                    data-modal="modal"
                                    data-modal-id="#add-to-cart"
                                    data-value={item._id}
                                    to="#"
                                    onClick={handleAddToCart}
                                  >
                                    Add to Cart
                                  </Link>
                                </div>
                              </div>
                              <div className="product-m__content">
                                <div className="product-m__category">
                                  <Link href="shop-side-version-2.html">
                                    {item.gender === "female"
                                      ? "Women Clothing"
                                      : "Men Clothing"}
                                  </Link>
                                </div>
                                <div className="product-m__name">
                                  <Link
                                    to={`/product-detail-page/${item.slug}`}
                                  >
                                    {item.name}
                                  </Link>
                                </div>
                                <div className="product-m__rating gl-rating-style">
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star" />
                                  <i className="fas fa-star-half-alt" />
                                  <i className="far fa-star" />
                                  <i className="far fa-star" />
                                  <span className="product-m__review">
                                    (23)
                                  </span>
                                </div>
                                <div className="product-m__price">
                                  ${item.price}
                                </div>
                                <div className="product-m__hover">
                                  <div className="product-m__preview-description">
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: item.description,
                                      }}
                                    ></span>
                                  </div>
                                  <div className="product-m__wishlist">
                                    <Link
                                      className="far fa-heart"
                                      to="#"
                                      data-tooltip="tooltip"
                                      data-value={item._id}
                                      data-placement="top"
                                      title="Add to Wishlist"
                                      data-boolean={findWishProduct(item._id)}
                                      style={{
                                        color:
                                          findWishProduct(item._id) == true
                                            ? "#ff4500"
                                            : "initial",
                                      }}
                                      onClick={handleWishProduct}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div
                                className="banner"
                                style={{
                                  backgroundColor:
                                    item.inventory > 0 ? "#4caf50" : "#fa4400",
                                }}
                              >
                                <span className="status">
                                  {item.inventory > 0 ? "Stocking" : "Sold out"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className="u-s-p-y-60"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {console.log(pageCount)}
                    {values?.result?.length !== 0 && (
                      <Pagination
                        defaultCurrent={currentPage}
                        total={pageCount * 10}
                        onChange={handlePageClick}
                        responsive
                      />
                    )}
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

export default SearchPage;
