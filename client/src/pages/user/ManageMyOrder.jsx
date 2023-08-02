import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../config";

const ManageMyOrder = () => {
  const { orderId } = useParams();
  const [idOrder, setIdOrder] = useState("");
  const [totalMoney, setTotalMoney] = useState("");
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [currentstatus, setCurrentstatus] = useState("");
  const [email, setEmail] = useState("");
  const [payment, setPayment] = useState("");
  const [phone, setPhone] = useState("");
  const [createdAt, setCreateAt] = useState("");
  const [name, setName] = useState("");
  const [subtotal, setSubtotal] = useState("");

  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipping",
    "Finish",
  ]);

  const getOrderDetails = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/orderdetail/${orderId}`
      );
      console.log(data?.order);
      if (data?.success) {
        setTotalMoney(data?.order?.totalmoney);
        setIdOrder(data?.order?._id);
        setProducts(data?.order?.products);
        setCurrentstatus(data?.order?.status);
        setAddress(data?.order?.checkout?.checkoutAddress);
        setPayment(data?.order?.payment?.paymentName);
        setEmail(data?.order?.checkout?.checkoutEmail);
        setPhone(data?.order?.checkout?.checkoutPhone);
        setName(data?.order?.checkout?.checkoutName);
        setCreateAt(data?.order?.createdAt);
      }
    } catch (error) {
      console.log();
      toast.error(error);
    }
  };

  const formatDate = (timestamp) => {
    try {
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

  const getSubtotal = async () => {
    try {
      if (products.length != 0) {
        const total = products.reduce((initial, current) => {
          return initial + current.product.price * current.quantity;
        }, 0);
        setSubtotal(total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);
  useEffect(() => {
    getSubtotal();
  }, [products.length]);
  return (
    <>
      <Layout title={"Dashboard Manage Order"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <h1 className="dash__h1 u-s-m-b-30">Order Details</h1>
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <div className="dash-l-r">
                  <div>
                    <div className="manage-o__text-2 u-c-secondary">
                      Order {idOrder}
                    </div>
                    <div className="manage-o__text u-c-silver">
                      Placed on {formatDate(createdAt)}
                    </div>
                  </div>
                  <div>
                    <div className="manage-o__text-2 u-c-silver">
                      Total:
                      <span className="manage-o__text-2 u-c-secondary">
                        ${totalMoney}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <div className="manage-o">
                  <div className="manage-o__header u-s-m-b-30">
                    <div className="manage-o__icon">
                      <i className="fas fa-box u-s-m-r-5" />
                      <span className="manage-o__text">Package </span>
                    </div>
                  </div>
                  <div className="dash-l-r">
                    <div className="manage-o__text u-c-secondary">
                      {currentstatus}
                    </div>
                    <div className="manage-o__icon">
                      <i className="fas fa-truck u-s-m-r-5" />
                      <span className="manage-o__text">Standard</span>
                    </div>
                  </div>
                  <div className="manage-o__timeline">
                    <div className="timeline-row">
                      {status?.map((item, index) => (
                        <div className="col-lg-3 u-s-m-b-30" key={index}>
                          <div className="timeline-step">
                            <div
                              className={`timeline-l-i ${
                                status.indexOf(item) <=
                                  status.indexOf(currentstatus) &&
                                "timeline-l-i--finish"
                              }`}
                            >
                              <span className="timeline-circle" />
                            </div>
                            <span className="timeline-text">{item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {products.map((p, index) => (
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
                        <div className="description-title">{p.name}</div>
                      </div>
                      <div className="description__info-wrap">
                        <div>
                          <span className="manage-o__badge badge--processing">
                            {currentstatus}
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
                              ${parseInt(p.product.price)}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                  <div className="dash__pad-3">
                    <h2 className="dash__h2 u-s-m-b-8">Shipping Address</h2>
                    <h2 className="dash__h2 u-s-m-b-8">{name}</h2>
                    <span className="dash__text-2">{address}</span>
                    <span className="dash__text-2">{phone}</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="dash__box dash__box--bg-white dash__box--shadow u-h-100">
                  <div className="dash__pad-3">
                    <h2 className="dash__h2 u-s-m-b-8">Total Summary</h2>
                    <div className="dash-l-r u-s-m-b-8">
                      <div className="manage-o__text-2 u-c-secondary">
                        Subtotal
                      </div>
                      <div className="manage-o__text-2 u-c-secondary">
                        ${parseInt(subtotal).toFixed(2)}
                      </div>
                    </div>
                    <div className="dash-l-r u-s-m-b-8">
                      <div className="manage-o__text-2 u-c-secondary">
                        Shipping Fee
                      </div>
                      <div className="manage-o__text-2 u-c-secondary">
                        $5.00
                      </div>
                    </div>
                    <div className="dash-l-r u-s-m-b-8">
                      <div className="manage-o__text-2 u-c-secondary">
                        Total
                      </div>
                      <div className="manage-o__text-2 u-c-secondary">
                        ${parseInt(totalMoney).toFixed(2)}
                      </div>
                    </div>
                    <span className="dash__text-2">Paid by {payment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default ManageMyOrder;
