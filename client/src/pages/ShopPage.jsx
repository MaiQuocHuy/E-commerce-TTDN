/* eslint-disable react/no-unescaped-entities */
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import BASE_URL from "../config";
import axios from "axios";
import { toast } from "react-hot-toast";
// import ReactPaginate from "react-paginate";
import { Pagination } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const ShopPage = () => {
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [ok, setOk] = useState(false);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handleClickGender = async (e) => {
    e.preventDefault();
    try {
      toast.success(e.target.value);
      //do something
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handlePageClick = (page, pageSize) => {
    try {
      console.log(page, pageSize);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Error");
    }
  };

  const handlePriceClick = async (e) => {
    e.preventDefault();
    try {
      toast.success(`${price.min} - ${price.max}`);
      if (price.min >= price.max) {
        toast.error(`Error due to ${price.min} >= ${price.max}`);
      } else {
        //do some thing
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

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-all-product`
      );
      if (data?.success) {
        setOk(true);
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPaginatedProduct = async () => {
    try {
      // const fetchData =  {
      //   axios
      //     .get(
      //       `${BASE_URL}/api/e-commerce/product/paginatedproduct?page=${currentPage}&limit=${limit}`
      //     )
      //     .then((reponse) => {
      //       const reponseData = reponse.data;
      //       console.log(reponseData);
      //       if (reponseData?.results?.result?.length !== 0) {
      //         setPageCount(reponseData?.results?.pageCount);
      //         setProducts(reponseData?.results?.result);
      //       } else {
      //         setOk(true);
      //       }
      //       resolve();
      //     })
      //     .catch((err) => {
      //       reject(err);
      //     });
      // });
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

  useEffect(() => {
    getAllBranch();
    // getAllProducts();
  }, []);

  useEffect(() => {
    // const fetchProduct = async () => {
    //   await getPaginatedProduct();
    // };
    const fetchProduct = new Promise((resolve, reject) => {
      getPaginatedProduct()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    // fetchProduct();
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
                                  value={price.min}
                                  onChange={(e) =>
                                    setPrice({
                                      ...price,
                                      min: e.target.value,
                                    })
                                  }
                                  placeholder="Min"
                                />
                              </div>
                              <div>
                                <label htmlFor="price-max" />
                                <input
                                  className="input-text input-text--primary-style"
                                  type="number"
                                  id="price-max"
                                  value={price.max}
                                  onChange={(e) =>
                                    setPrice({
                                      ...price,
                                      max: e.target.value,
                                    })
                                  }
                                  placeholder="Max"
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
                      <form>
                        <div className="tool-style__form-wrap">
                          <div className="u-s-m-b-8">
                            <select className="select-box select-box--transparent-b-2">
                              <option selected>Sort By: Newest Items</option>
                              <option>Sort By: Latest Items</option>
                              <option>Sort By: Best Selling</option>
                              <option>Sort By: Best Rating</option>
                              <option>Sort By: Lowest Price</option>
                              <option>Sort By: Highest Price</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="shop-p__collection">
                    {products.length === 0 ? (
                      ok === false && (
                        <Spin
                          indicator={antIcon}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        />
                      )
                    ) : (
                      <div className="row is-grid-active">
                        {products.map((item) => (
                          <div
                            className="col-lg-4 col-md-6 col-sm-6"
                            key={item._id}
                          >
                            <div className="product-m">
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

                                <div className="product-m__add-cart">
                                  <a
                                    className="btn--e-brand"
                                    data-modal="modal"
                                    data-modal-id="#add-to-cart"
                                  >
                                    Add to Cart
                                  </a>
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
                                <div className="product-m__price">$125.00</div>
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
                                      to="/user/wishlist-page"
                                      data-tooltip="tooltip"
                                      data-placement="top"
                                      title="Add to Wishlist"
                                    />
                                  </div>
                                </div>
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
