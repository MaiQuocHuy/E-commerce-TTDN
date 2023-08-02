/* eslint-disable react/no-unescaped-entities */
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import BASE_URL from "../config";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useWish } from "../context/wish";

const ShopPage = () => {
  const [gender, setGender] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [productInCart, setProductInCart] = useCart();
  const [wishes, setWishes] = useWish();

  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [counter, setCounter] = useState(1);
  const [auth, setAuth] = useAuth();
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

  const handleClickGender = async (e) => {
    e.preventDefault();
    try {
      setGender(e.target.value);
    } catch (error) {
      console.log(error);
      toast.error(error);
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

  const handlePriceClick = async (e) => {
    e.preventDefault();
    try {
      if (parseInt(minPrice) >= parseInt(maxPrice)) {
        toast.error(`Error due to ${minPrice} >= ${maxPrice}`);
      } else {
        setPrice({
          min: minPrice,
          max: maxPrice,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
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

  const getPaginatedProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/paginatedproduct?page=${currentPage}&limit=${limit}`
      );
      console.log(data);
      if (data?.results?.result?.length !== 0) {
        setPageCount(data?.results?.pageCount);
        setProducts(data?.results?.result);
        setOk(true);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/product-filters`,
        {
          gender,
          price,
        }
      );
      console.log(data);
      if (data?.success && data?.products?.length !== 0) {
        setProducts(data?.products);
        setPageCount(Math.ceil(data?.products?.length / 6));
      } else if (data?.success && data?.products?.length === 0) {
        setProducts([]);
      } else if (!data?.success) {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetFilter = async (e) => {
    e.preventDefault();
    try {
      setPrice({
        min: "",
        max: "",
      });
      setGender("");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getAllBranch();
  }, []);
  useEffect(() => {
    if (wishes?.length != 0) console.log(wishes, "Wish");
  }, [wishes, wishes?.length]);

  useEffect(() => {
    if (gender || (price.min && price.max)) {
      console.log("Filter");
      toast.promise(filterProduct(), {
        loading: "Loading Filter Product...",
        success: "Loading filter product successfully!",
        error: "Failed to filter product",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      });
    } else if (!gender && !price.min && !price.max) {
      console.log("Loading");
      getPaginatedProduct();
    }
  }, [gender, price.min, price.max]);

  useEffect(() => {
    const fetchProduct = new Promise((resolve, reject) => {
      getPaginatedProduct()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
    toast.promise(fetchProduct, {
      loading: "Loading...",
      success: "Product Loading successfully!",
      error: "Failed to loading product",
      duration: 3000,
      position: "top-center",
      style: {
        background: "yellow",
        color: "black",
      },
    });
  }, [currentPage]);

  return (
    <>
      <Layout title={"Shop - Page"}>
        <div className="u-s-p-y-90">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="shop-w-master">
                  <h1 className="shop-w-master__heading u-s-m-b-30">
                    <i className="fas fa-filter u-s-m-r-8" />
                    <span>FILTERS</span>
                  </h1>
                  <div className="shop-w-master__sidebar">
                    <div className="u-s-m-b-30">
                      <div className="shop-w shop-w--style">
                        <div className="shop-w__intro-wrap">
                          <h1 className="shop-w__h">BRANCH</h1>
                        </div>
                        <div
                          className="shop-w__wrap collapse show"
                          id="s-category"
                        >
                          <ul className="shop-w__category-list gl-scroll">
                            <li className="has-list">
                              <a href="#">Hand Bag</a>
                              <span className="category-list__text u-s-m-l-6">
                                ({branches.length})
                              </span>
                              <ul style={{ display: "block" }}>
                                {branches?.map((item) => (
                                  <li className="has-list" key={item._id}>
                                    <Link
                                      to="#"
                                      style={{ color: "rgb(127, 127, 127)" }}
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="u-s-m-b-30">
                      <div className="shop-w shop-w--style">
                        <div className="shop-w__intro-wrap">
                          <h1 className="shop-w__h">PRICE</h1>
                        </div>
                        <div
                          className="shop-w__wrap collapse show"
                          id="s-price"
                        >
                          <form className="shop-w__form-p">
                            <div className="shop-w__form-p-wrap">
                              <div>
                                <label htmlFor="price-min" />
                                <input
                                  className="input-text input-text--primary-style"
                                  type="number"
                                  id="price-min"
                                  placeholder="Min"
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                />
                              </div>
                              <div>
                                <label htmlFor="price-max" />
                                <input
                                  className="input-text input-text--primary-style"
                                  type="number"
                                  id="price-max"
                                  placeholder="Max"
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(e.target.value)}
                                />
                              </div>
                              <div>
                                <button
                                  className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2"
                                  type="submit"
                                  onClick={handlePriceClick}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="u-s-m-b-30">
                      <div className="shop-w shop-w--style">
                        <div className="shop-w__intro-wrap">
                          <h1 className="shop-w__h">Gender</h1>
                        </div>
                        <div
                          className="shop-w__wrap collapse show"
                          id="s-price"
                        >
                          <Radio.Group
                            onChange={handleClickGender}
                            value={gender}
                          >
                            <Radio
                              value={"male"}
                              style={{ color: "rgb(127, 127, 127)" }}
                            >
                              Male
                            </Radio>
                            <Radio
                              value={"female"}
                              style={{ color: "rgb(127, 127, 127)" }}
                            >
                              Female
                            </Radio>
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                    <div className="u-s-m-b-30">
                      <div className="shop-w shop-w--style">
                        <div
                          className="shop-w__intro-wrap reset-filter"
                          style={{ display: "flex", justifyContent: "center" }}
                          onClick={(e) => {
                            toast.promise(handleResetFilter(e), {
                              loading: "Loading...",
                              success: "Reset Filter successfully!",
                              error: "Failed to reset filter product",
                              duration: 3000,
                              position: "top-center",
                              style: {
                                background: "yellow",
                                color: "black",
                              },
                            });
                          }}
                        >
                          <h1 className="shop-w__h">Reset Filter</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-12">
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
                        {products.map((item) => (
                          <div
                            className="col-lg-4 col-md-6 col-sm-6"
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
                    {products.length !== 0 && (
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

export default ShopPage;
