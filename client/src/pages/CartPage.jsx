import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import BASE_URL from "../config";
import axios from "axios";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CartPage = () => {
  const [productInCart, setProductInCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [subTotal, setSubTotal] = useState(0);
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const shipFree = 5;
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/delete-cart/${auth?.user?._id}/${id}`
      );
      if (data?.success) {
        toast.success("Delete item in cart successfully");
        setProductInCart(data?.cart?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleClearCart = async () => {
    try {
      toast.promise(
        axios
          .post(`${BASE_URL}/api/e-commerce/product/clear-cart`, {
            idUs: auth?.user?._id,
          })
          .then((reponse) => {
            const responseData = reponse?.data;
            console.log(responseData?.cart?.products);
            setOk(true);
            setProductInCart(responseData?.cart?.products);
          })
          .catch((err) => {
            toast.err(err);
          }),
        {
          loading: "Clearing Cart...",
          success: "Clear cart successfully!",
          error: "Failed to clear cart",
          duration: 3000,
          position: "top-center",
          style: {
            background: "yellow",
            color: "black",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (e) => {
    try {
      let instance = null;
      let quantity = 0;
      let idPro = null;
      if (e.target.className == "input-counter__minus fas fa-minus") {
        instance = e.target.nextSibling;
        instance.value = parseInt(instance.value) - 1;
        idPro = instance.getAttribute("data-value");
        quantity = instance.value;
      } else if (e.target.className == "input-counter__plus fas fa-plus") {
        instance = e.target.previousSibling;
        instance.value = parseInt(instance.value) + 1;
        idPro = instance.getAttribute("data-value");
        quantity = instance.value;
      }

      toast.promise(
        axios
          .post(
            `${BASE_URL}/api/e-commerce/product/update-quantity-product-cart`,
            {
              quantity,
              idPro,
              idUs: auth?.user?._id,
            }
          )
          .then((reponse) => {
            const reponseData = reponse.data;
            setProductInCart(reponseData?.cart?.products);
          })
          .catch((err) => {
            console.log(err);
          }),
        {
          loading: "Updating quantity...",
          success: "Update quantity success!",
          error: "An error occurred while updating quantity.",
          duration: 3000,
          position: "top-center",
          style: {
            background: "yellow",
            color: "black",
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    if (productInCart?.length != 0) {
      setOk(false);
      console.log(productInCart);
      const total = productInCart?.reduce((accumulator, currentValue) => {
        const productTotal = currentValue.product.price * currentValue.quantity;
        return accumulator + productTotal;
      }, 0);
      setSubTotal(total);
    } else {
      setOk(true);
    }
  }, [productInCart?.length, productInCart]);

  return (
    <>
      <Layout title={"Cart-Shop"}>
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
                        <a href="/cart-page">Cart</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-b-60">
            <div className="section__intro u-s-m-b-60">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section__text-wrap">
                      <h1 className="section__heading u-c-secondary">
                        SHOPPING CART
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section__content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                    <div className="table-responsive">
                      <table className="table-p">
                        <tbody>
                          {productInCart?.length != 0
                            ? productInCart?.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="table-p__box">
                                      <div className="table-p__img-wrap">
                                        <img
                                          className="u-img-fluid"
                                          src={`${BASE_URL}/api/e-commerce/product/product-photo/${item?.product?._id}`}
                                          // fallback="data:image/png;base64,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"
                                        />
                                      </div>
                                      <div className="table-p__info">
                                        <span className="table-p__name">
                                          <Link
                                            to={`/product-detail-page/${item?.product?.slug}`}
                                          >
                                            {item?.product?.name}
                                          </Link>
                                        </span>
                                        <span className="table-p__category">
                                          <Link to="/shop-page">
                                            {item?.product?.branch?.name}
                                          </Link>
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="table-p__price">
                                      ${item?.product?.price}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="table-p__input-counter-wrap">
                                      <div className="input-counter">
                                        <span
                                          className="input-counter__minus fas fa-minus"
                                          onClick={(e) => {
                                            handleUpdateQuantity(e);
                                          }}
                                        />
                                        <input
                                          className="input-counter__text input-counter--text-primary-style"
                                          type="text"
                                          defaultValue={1}
                                          data-min={1}
                                          data-value={item?.product?._id}
                                          data-max={1000}
                                          value={item?.quantity}
                                        />
                                        <span
                                          className="input-counter__plus fas fa-plus"
                                          onClick={(e) => {
                                            handleUpdateQuantity(e);
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="table-p__del-wrap">
                                      <Link
                                        className="far fa-trash-alt table-p__delete-link"
                                        to="#"
                                        onClick={() => handleDelete(item?._id)}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ok == false && (
                                <tr>
                                  <td colSpan={4}>
                                    <Spin
                                      indicator={antIcon}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    />
                                  </td>
                                </tr>
                              )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="route-box">
                      <div className="route-box__g1">
                        <a
                          className="route-box__link"
                          href="shop-side-version-2.html"
                        >
                          <i className="fas fa-long-arrow-alt-left" />
                          <span>CONTINUE SHOPPING</span>
                        </a>
                      </div>
                      <div className="route-box__g2">
                        <Link
                          className="route-box__link"
                          to="#"
                          onClick={() => handleClearCart()}
                        >
                          <i className="fas fa-trash" />
                          <span>CLEAR CART</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-b-60">
            <div className="section__content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                    <form className="f-cart">
                      <div
                        className="row"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <div className="col-lg-4 col-md-6 u-s-m-b-30">
                          <div className="f-cart__pad-box">
                            <div className="u-s-m-b-30">
                              <table className="f-cart__table">
                                <tbody>
                                  <tr>
                                    <td>SHIPPING</td>
                                    <td>${shipFree}.00</td>
                                  </tr>
                                  <tr>
                                    <td>SUBTOTAL</td>
                                    <td>${subTotal}.00</td>
                                  </tr>
                                  <tr>
                                    <td>GRAND TOTAL</td>
                                    <td>${subTotal + shipFree}.00</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div style={{ margin: "5px 0 5px 0" }}>
                              <button
                                className="btn btn--e-brand-b-2"
                                type="submit"
                                onClick={() => navigate("/user/checkout-page")}
                              >
                                PROCEED TO CHECKOUT
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default CartPage;
