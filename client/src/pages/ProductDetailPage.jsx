/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import { Image } from "antd";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetailPage = () => {
  const [counter, setCounter] = useState(1);
  const [product, setProduct] = useState({});
  const [idProduct, setIdProduct] = useState("");
  const [user, setUser] = useState({});
  const [auth, setAuth] = useAuth();
  const [productInCart, setProductInCart] = useCart();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  useEffect(() => {
    if (auth?.token) getInfoAuth();
  }, [auth?.token]);

  const formatDate = (timestamp) => {
    try {
      // const timestamp = "2023-07-15T10:55:39.110Z";
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      const formattedDateTime = `${formattedDate} ${formattedTime}`;
      return formattedDateTime;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllComment = async (id) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/get-all-comment`,
        {
          idProduct: id,
        }
      );
      if (data?.success) {
        console.log(data?.comments?.comments, "Comments");
        setComments(data?.comments?.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleCounter = (e) => {
    if (e.target.classList.contains("input-counter__minus")) {
      counter !== 1 && setCounter(counter - 1);
    } else {
      setCounter(counter + 1);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
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
          setProductInCart(data?.cart?.products);
        } else toast.error(data?.error);
      } else navigate("/signin-page");
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-single-product/${params?.slug}`
      );
      console.log(data);
      if (data?.success) {
        setIdProduct(data?.product?._id);
        setProduct(data?.product);
        getAllComment(data?.product?._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getInfoAuth = async () => {
    try {
      if (auth?.token) {
        const { data } = await axios.post(
          `${BASE_URL}/api/e-commerce/auth/info-user`,
          {
            id: auth?.user?._id,
          }
        );

        if (data?.success) {
          console.log(data?.user, "USER");
          setUser(data?.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e, idProduct) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/save-comment`,
        {
          comment,
          id: auth?.user?._id,
          idProduct,
        }
      );
      console.log(data, "Comment");
      if (data?.success) {
        getAllComment(idProduct);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Layout title={"Product-Detail"}>
        <div>
          <div className="u-s-p-t-90">
            <div className="container">
              <div className="row">
                <div className="col-lg-5">
                  <div className="pd-breadcrumb u-s-m-b-30">
                    <ul className="pd-breadcrumb__list">
                      <li className="has-separator">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="has-separator">
                        <Link to={`/product-detail-page/${params?.slug}`}>
                          {product?.name}
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="pd u-s-m-b-30">
                    {product?.photo ? (
                      <Image
                        width={400}
                        src={`${BASE_URL}/api/e-commerce/product/product-photo/${product?._id}`}
                        fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                      />
                    ) : (
                      <Image
                        width={400}
                        fallback="data:image/png;base64,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"
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="pd-detail">
                    <div>
                      <span className="pd-detail__name">{product?.name}</span>
                    </div>
                    <div>
                      <div className="pd-detail__inline">
                        <span className="pd-detail__price">
                          ${product?.price}
                        </span>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <div className="pd-detail__rating gl-rating-style">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                        <span className="pd-detail__review u-s-m-l-4">
                          <a data-click-scroll="#view-review">
                            {comments?.length || 0} Reviews
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <div className="pd-detail__inline">
                        <span className="pd-detail__left">
                          Only {product?.inventory} left
                        </span>
                      </div>
                    </div>
                    <div className="u-s-m-b-15">
                      <span className="pd-detail__preview-desc">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book.
                      </span>
                    </div>
                    <div className="u-s-m-b-15" />
                    <div className="u-s-m-b-15">
                      <form className="pd-detail__form">
                        <div className="pd-detail-inline-2">
                          <div className="u-s-m-b-15">
                            <div className="input-counter">
                              <span
                                className="input-counter__minus fas fa-minus"
                                onClick={handleCounter}
                              />
                              <input
                                className="input-counter__text input-counter--text-primary-style"
                                type="text"
                                defaultValue={1}
                                value={counter}
                                data-min={1}
                                data-max={1000}
                              />
                              <span
                                className="input-counter__plus fas fa-plus"
                                onClick={handleCounter}
                              />
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <button
                              className="btn btn--e-brand-b-2"
                              type="submit"
                              onClick={handleAddToCart}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-y-90">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="pd-tab">
                    <div className="u-s-m-b-30">
                      <ul className="nav pd-tab__list">
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#pd-desc"
                          >
                            DESCRIPTION
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="view-review"
                            data-toggle="tab"
                            href="#pd-rev"
                          >
                            REVIEWS
                            <span>({comments?.length})</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="pd-desc">
                        <div className="pd-tab__desc">
                          <div className="u-s-m-b-15">
                            <p
                              dangerouslySetInnerHTML={{
                                __html: product?.description,
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="pd-tag">
                        <div className="pd-tab__tag">
                          <h2 className="u-s-m-b-15">ADD YOUR TAGS</h2>
                          <div className="u-s-m-b-15">
                            <form>
                              <input
                                className="input-text input-text--primary-style"
                                type="text"
                              />
                              <button
                                className="btn btn--e-brand-b-2"
                                type="submit"
                              >
                                ADD TAGS
                              </button>
                            </form>
                          </div>
                          <span className="gl-text">
                            Use spaces to separate tags. Use single quotes (')
                            for phrases.
                          </span>
                        </div>
                      </div>
                      <div className="tab-pane" id="pd-rev">
                        <div className="pd-tab__rev">
                          <div className="u-s-m-b-30">
                            <form className="pd-tab__rev-f1">
                              <div className="rev-f1__group">
                                <div className="u-s-m-b-15">
                                  <h2>
                                    {comments.length} Review(s) for{" "}
                                    {product?.name}
                                  </h2>
                                </div>
                              </div>
                              <div className="rev-f1__review">
                                {comments?.length != 0 &&
                                  comments?.map((item, index) => (
                                    <div
                                      className="review-o u-s-m-b-15"
                                      key={index}
                                    >
                                      <div className="review-o__info u-s-m-b-8">
                                        <span className="review-o__name">
                                          {item?.user?.name}
                                        </span>
                                        <span className="review-o__date">
                                          {formatDate(item?.createdAt)}
                                        </span>
                                      </div>
                                      <p className="review-o__text">
                                        {item?.comment}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            </form>
                          </div>
                          <div className="u-s-m-b-30">
                            <form className="pd-tab__rev-f2">
                              <h2 className="u-s-m-b-15">Add a Review</h2>
                              <span className="gl-text u-s-m-b-15">
                                Your email address will not be published.
                                Required fields are marked *
                              </span>

                              <div className="rev-f2__group">
                                <div className="u-s-m-b-15">
                                  <label
                                    className="gl-label"
                                    htmlFor="reviewer-text"
                                  >
                                    YOUR REVIEW *
                                  </label>
                                  <textarea
                                    className="text-area text-area--primary-style"
                                    id="reviewer-text"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                                <div>
                                  <p className="u-s-m-b-30">
                                    <label
                                      className="gl-label"
                                      htmlFor="reviewer-name"
                                    >
                                      NAME *
                                    </label>
                                    <input
                                      className="input-text input-text--primary-style"
                                      type="text"
                                      id="reviewer-name"
                                      disabled
                                      value={user?.name}
                                    />
                                  </p>
                                  <p className="u-s-m-b-30">
                                    <label
                                      className="gl-label"
                                      htmlFor="reviewer-email"
                                    >
                                      EMAIL *
                                    </label>
                                    <input
                                      className="input-text input-text--primary-style"
                                      type="text"
                                      id="reviewer-email"
                                      disabled
                                      value={user?.email}
                                    />
                                  </p>
                                </div>
                              </div>
                              <div>
                                <button
                                  className="btn btn--e-brand-shadow"
                                  type="submit"
                                  onClick={(e) =>
                                    handleComment(e, product?._id)
                                  }
                                >
                                  SUBMIT
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

export default ProductDetailPage;
