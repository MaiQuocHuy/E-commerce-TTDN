import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import BASE_URL from "../../config";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { useOrder } from "../../context/order";

const DashboardMyOrder = () => {
  const [orders, setOrders] = useOrder();
  const [auth, setAuth] = useAuth();
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

  return (
    <>
      <Layout title={"Dashboard My Order"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>
                <span className="dash__text u-s-m-b-30">
                  Here you can see all products that have been delivered.
                </span>
                <form
                  className="m-order u-s-m-b-30"
                  style={{ display: "none" }}
                >
                  <div className="m-order__select-wrapper">
                    <label className="u-s-m-r-8" htmlFor="my-order-sort">
                      Show:
                    </label>
                    <select
                      className="select-box select-box--primary-style"
                      id="my-order-sort"
                    >
                      <option selected>Last 5 orders</option>
                      <option>Last 15 days</option>
                      <option>Last 30 days</option>
                      <option>Last 6 months</option>
                      <option>Orders placed in 2018</option>
                      <option>All Orders</option>
                    </select>
                  </div>
                </form>
                <div className="m-order__list">
                  {orders.length != 0 &&
                    orders?.map((item, index) => (
                      <div className="m-order__get" key={index}>
                        <div className="manage-o__header u-s-m-b-30">
                          <div className="dash-l-r">
                            <div>
                              <div className="manage-o__text-2 u-c-secondary">
                                Order # {item._id}
                              </div>
                              <div className="manage-o__text u-c-silver">
                                {formatDate(item.createdAt)}
                              </div>
                            </div>
                            <div>
                              <div className="dash__link dash__link--brand">
                                <Link
                                  to={`/user/managemyorder-page/${item._id}`}
                                >
                                  MANAGE
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        {item.products.map((p, index) => (
                          <div
                            className="manage-o__description"
                            style={{ padding: "5px" }}
                            key={index}
                          >
                            <div className="description__container">
                              <div className="description__img-wrap">
                                <img
                                  className="u-img-fluid"
                                  src={`${BASE_URL}/api/e-commerce/product/product-photo/${p.product._id}`}
                                  alt
                                />
                              </div>
                              <div className="description-title">
                                {p.product.name}
                              </div>
                            </div>
                            <div className="description__info-wrap">
                              <div>
                                <span className="manage-o__badge badge--processing">
                                  {item.status}
                                </span>
                              </div>
                              <div>
                                <span className="manage-o__text-2 u-c-silver">
                                  Quantity:
                                  <span className="manage-o__text-2 u-c-secondary">
                                    {p.quantity}
                                  </span>
                                </span>
                              </div>
                              <div>
                                <span className="manage-o__text-2 u-c-silver">
                                  Price:
                                  <span className="manage-o__text-2 u-c-secondary">
                                    ${parseInt(parseInt(p.product.price))}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default DashboardMyOrder;
