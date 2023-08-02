import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useWish } from "../../context/wish";
import BASE_URL from "../../config";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useState } from "react";

const WishlistPage = () => {
  const [wishes, setWishes] = useWish();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [productInCart, setProductInCart] = useCart();

  console.log(wishes, "Wish");
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
                    {wishes?.length != 0 &&
                      wishes?.map((item, index) => (
                        <div className="w-r u-s-m-b-30" key={index}>
                          <div className="w-r__container">
                            <div className="w-r__wrap-1">
                              <div className="w-r__img-wrap">
                                <img
                                  className="u-img-fluid"
                                  src={`${BASE_URL}/api/e-commerce/product/product-photo/${item.product._id}`}
                                  alt
                                />
                              </div>
                              <div className="w-r__info">
                                <span className="w-r__name">
                                  <Link
                                    to={`/product-detail-page/${item.product.slug}`}
                                  >
                                    {item.product.name}
                                  </Link>
                                </span>
                                <span className="w-r__category">
                                  <Link to="#">{item.product.branch.name}</Link>
                                </span>
                                <span className="w-r__price">
                                  $ {parseInt(item.product.price).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div
                              className="w-r__wrap-2"
                              style={{ flexShrink: 0 }}
                            >
                              <Link
                                className="w-r__link btn--e-brand-b-2"
                                data-modal="modal"
                                data-modal-id="#add-to-cart"
                                data-value={item._id}
                                onClick={(e) => handleAddToCart(e)}
                              >
                                ADD TO CART
                              </Link>
                              <Link     
                                className="w-r__link btn--e-transparent-platinum-b-2"
                                to={`/product-detail-page/${item.product.slug}`}
                              >
                                VIEW
                              </Link>
                              <Link
                                className="w-r__link btn--e-transparent-platinum-b-2"
                                to="#"
                                data-value={item.product._id}
                                onClick={(e) => handleWishProduct(e)}
                              >
                                REMOVE
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
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
