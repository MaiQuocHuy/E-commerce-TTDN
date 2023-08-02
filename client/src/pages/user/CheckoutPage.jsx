/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../config";
import { LoadingOutlined } from "@ant-design/icons";
import { useCart } from "../../context/cart";
import { Select, Spin, Checkbox, Radio, Space } from "antd";
const { Option } = Select;

const CheckoutPage = () => {
  const [auth, setAuth] = useAuth();
  const HOST = "https://provinces.open-api.vn/api/";
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();
  const [productInCart, setProductInCart] = useCart();
  const [payment, setPayment] = useState(0);
  const [streetAddress, setStreetAddress] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const shipFree = 5;
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState({});
  const [ok, setOk] = useState(false);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const getInfoUser = async () => {
    toast.promise(
      axios
        .post(`${BASE_URL}/api/e-commerce/auth/info-user`, {
          id: auth?.user?._id,
        })
        .then((response) => {
          const responseData = response.data;
          if (responseData?.success) {
            console.log(responseData?.user, "LoadingUser");
            setOk(true);
            setUser(responseData?.user);
            setPhone(responseData?.user?.phone);
            setName(responseData?.user?.name);
            setEmail(responseData?.user?.email);
            setAddress(responseData?.user?.address);
          }
        })
        .catch((error) => {
          toast.error(error);
        }),
      {
        loading: "Loading User...",
        success: "Loading User successfully!",
        error: "Failed to load user",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      }
    );
  };

  const feeProductInCart = async () => {
    if (productInCart?.length != 0) {
      const total = productInCart?.reduce((accumulator, currentValue) => {
        const productTotal = currentValue.product.price * currentValue.quantity;
        return accumulator + productTotal;
      }, 0);
      setSubTotal(total);
    }
  };

  const callDataProvince = async () => {
    try {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      //Array Province
      const arrayData = await response.json();
      setProvinces(arrayData);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const callDataDistrict = async (key, option) => {
    try {
      console.log(key);
      console.log(option.children);
      setStreetAddress(option.children);
      const apiDistrict = `${HOST}p/${key}?depth=2`;
      console.log(apiDistrict);
      const response = await fetch(apiDistrict);
      //Array Province
      const arrayDataDistrict = await response.json();
      setDistricts(arrayDataDistrict.districts);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const callDataWards = async (key, option) => {
    try {
      console.log(key);
      console.log(option.children);
      setStreetAddress(`${streetAddress},${option.children}`);
      const apiWard = `${HOST}d/${key}?depth=2`;
      console.log(apiWard);
      const response = await fetch(apiWard);
      const arrayDataWards = await response.json();
      setWards(arrayDataWards.wards);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const getWardText = async (key, option) => {
    try {
      console.log(key);
      console.log(option.children);
      setStreetAddress(`${streetAddress},${option.children}`);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("streetAddress", streetAddress);
      formData.append("orderNote", orderNote);
      formData.append("shipFree", shipFree);
      formData.append("subTotal", subTotal);
      formData.append("payment", payment);
      formData.append("id", auth?.user?._id);
      formData.append("product", JSON.stringify(productInCart));
      toast.promise(
        axios
          .post(
            `${BASE_URL}/api/e-commerce/product/add-checkout-order-payment`,
            formData
          )
          .then((res) => {
            if (res.data.success) {
              if (res.data.forwardLink) {
                window.open(res.data.forwardLink);
                navigate("/user/dashboardmyorder-page");
              } else {
                setProductInCart(res?.data?.cart?.products);
                toast.success("Reload Page My Order");
                navigate("/user/dashboardmyorder-page");
              }
            }
          })
          .catch((error) => toast.error(error?.data?.error)),
        {
          loading: "Placing An Order...",
          success: "Placed an Order successfully!",
          error: "Failed to place an order",
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

  const getPayment = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-all-payment`
      );
      if (data?.success) setPayments(data?.payment);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      getInfoUser();
      feeProductInCart();
      callDataProvince();
      getPayment();
    };
    if (productInCart?.length != 0) fetchData();
  }, [productInCart?.length, productInCart]);

  useEffect(() => {
    if (isChecked) {
      setStreetAddress(user?.address || "");
    }
  }, [isChecked]);

  return (
    <>
      <Layout title={"CheckOut-Page"}>
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
                        <Link href="/checkout-page">Checkout</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="u-s-p-b-60">
            <div className="section__content">
              <div className="container">
                <div className="checkout-f">
                  <div className="row">
                    <div className="col-lg-6">
                      {Object.keys(user).length != 0 ? (
                        <>
                          <h1 className="checkout-f__h1">
                            DELIVERY INFORMATION
                          </h1>
                          <form className="checkout-f__delivery">
                            <div className="u-s-m-b-30">
                              <div className="u-s-m-b-15">
                                <div className="check-box">
                                  <Checkbox
                                    type="checkbox"
                                    id="get-address"
                                    onChange={(e) => {
                                      setIsChecked(e.target.checked);
                                    }}
                                  >
                                    Use address from account
                                  </Checkbox>
                                </div>
                              </div>

                              <div className="u-s-m-b-15">
                                <label
                                  className="gl-label"
                                  htmlFor="billing-fname"
                                >
                                  FULL NAME *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="text"
                                  id="billing-fname"
                                  data-bill
                                  value={name}
                                  onChange={(e) => setName(e.target.name)}
                                />
                              </div>

                              {/*====== End - First Name, Last Name ======*/}
                              {/*====== E-MAIL ======*/}
                              <div className="u-s-m-b-15">
                                <label
                                  className="gl-label"
                                  htmlFor="billing-email"
                                >
                                  E-MAIL *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="email"
                                  id="billing-email"
                                  data-bill
                                  value={email}
                                  onChange={(e) => setEmail(e.target.email)}
                                />
                              </div>
                              {/*====== End - E-MAIL ======*/}
                              {/*====== PHONE ======*/}

                              <div className="u-s-m-b-15">
                                <label
                                  className="gl-label"
                                  htmlFor="billing-phone"
                                >
                                  PHONE *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="text"
                                  id="billing-phone"
                                  data-bill
                                  value={phone}
                                  onChange={(e) => {
                                    setPhone(e.target.value);
                                  }}
                                />
                              </div>

                              <div className="u-s-m-b-15">
                                {/*====== Select Box ======*/}
                                <label
                                  className="gl-label"
                                  htmlFor="billing-country"
                                >
                                  PROVINCE *
                                </label>
                                <Select
                                  className="select-box select-box--primary-style"
                                  id="billing-state"
                                  data-bill
                                  placeholder="Select a province"
                                  size="small"
                                  disabled={isChecked == true && true}
                                  bordered={false}
                                  defaultValue={"Choose Province"}
                                  showSearch
                                  onChange={(key, option) => {
                                    callDataDistrict(key, option);
                                  }}
                                >
                                  {provinces.length != 0 &&
                                    provinces.map((item) => (
                                      <Option key={item.code} value={item.code}>
                                        {item.name}
                                      </Option>
                                    ))}
                                </Select>
                                {/*====== End - Select Box ======*/}
                              </div>
                              <div className="u-s-m-b-15">
                                {/*====== Select Box ======*/}
                                <label
                                  className="gl-label"
                                  htmlFor="billing-state"
                                >
                                  CITY *
                                </label>
                                <Select
                                  className="select-box select-box--primary-style"
                                  id="billing-state"
                                  data-bill
                                  placeholder="Select a district"
                                  size="small"
                                  bordered={false}
                                  disabled={isChecked == true && true}
                                  defaultValue={"Choose District"}
                                  showSearch
                                  onChange={(key, option) => {
                                    callDataWards(key, option);
                                  }}
                                >
                                  {districts?.map((item) => (
                                    <Option key={item.code} value={item.code}>
                                      {item.name}
                                    </Option>
                                  ))}
                                </Select>
                                {/*====== End - Select Box ======*/}
                              </div>

                              <div className="u-s-m-b-15">
                                <label
                                  className="gl-label"
                                  htmlFor="billing-street"
                                >
                                  WARD *
                                </label>
                                <Select
                                  className="select-box select-box--primary-style"
                                  id="billing-state"
                                  data-bill
                                  placeholder="Select a wards"
                                  size="small"
                                  bordered={false}
                                  disabled={isChecked == true && true}
                                  defaultValue={"Choose wards"}
                                  showSearch
                                  onChange={(key, option) => {
                                    getWardText(key, option);
                                  }}
                                >
                                  {wards?.map((item) => (
                                    <Option key={item.code} value={item.code}>
                                      {item.name}
                                    </Option>
                                  ))}
                                </Select>
                              </div>

                              <div className="u-s-m-b-15">
                                <label
                                  className="gl-label"
                                  htmlFor="billing-email"
                                >
                                  Street Address *
                                </label>
                                <input
                                  className="input-text input-text--primary-style"
                                  type="text"
                                  id="billing-email"
                                  data-bill
                                  disabled={isChecked == true && true}
                                  style={{ fontSize: "14px" }}
                                  onBlur={(e) => {
                                    console.log(e.target.value);
                                    setStreetAddress(
                                      `${streetAddress},${e.target.value}`
                                    );
                                  }}
                                />
                              </div>

                              <div
                                className="collapse u-s-m-b-15"
                                id="create-account"
                              >
                                <span className="gl-text u-s-m-b-15">
                                  Create an account by entering the information
                                  below. If you are a returning customer please
                                  login at the top of the page.
                                </span>
                                <div>
                                  <label
                                    className="gl-label"
                                    htmlFor="reg-password"
                                  >
                                    Account Password *
                                  </label>
                                  <input
                                    className="input-text input-text--primary-style"
                                    type="text"
                                    data-bill
                                    id="reg-password"
                                  />
                                </div>
                              </div>
                              <div className="u-s-m-b-10">
                                <label
                                  className="gl-label"
                                  htmlFor="order-note"
                                >
                                  ORDER NOTE
                                </label>
                                <textarea
                                  className="text-area text-area--primary-style"
                                  id="order-note"
                                  defaultValue={""}
                                  value={orderNote}
                                  onChange={(e) => setOrderNote(e.target.value)}
                                />
                              </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        ok == false && (
                          <Spin
                            indicator={antIcon}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          />
                        )
                      )}
                    </div>

                    <div className="col-lg-6">
                      <h1 className="checkout-f__h1">ORDER SUMMARY</h1>
                      <div className="o-summary">
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__item-wrap gl-scroll">
                            {productInCart?.length != 0 &&
                              productInCart?.map((item, index) => (
                                <div className="o-card" key={index}>
                                  <div className="o-card__flex">
                                    <div className="o-card__img-wrap">
                                      <img
                                        className="u-img-fluid"
                                        src={`${BASE_URL}/api/e-commerce/product/product-photo/${item?.product?._id}`}
                                        alt
                                      />
                                    </div>
                                    <div className="o-card__info-wrap">
                                      <span className="o-card__name">
                                        <Link
                                          to={`/product-detail-page/${item?.product?.slug}`}
                                        >
                                          {item?.product?.name}
                                        </Link>
                                      </span>
                                      <span className="o-card__quantity">
                                        Quantity x {item?.quantity}
                                      </span>
                                      <span className="o-card__price">
                                        ${item?.product?.price}
                                      </span>
                                    </div>
                                  </div>
                                  <a className="o-card__del far fa-trash-alt" />
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__box">
                            <table className="o-summary__table">
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
                        </div>
                        <div className="o-summary__section u-s-m-b-30">
                          <div className="o-summary__box">
                            <h1 className="checkout-f__h1">
                              PAYMENT INFORMATION
                            </h1>
                            <form className="checkout-f__payment">
                              <div className="u-s-m-b-10">
                                <Radio.Group
                                  onChange={(e) => setPayment(e.target.value)}
                                  defaultValue={payment}
                                >
                                  <Space direction="vertical">
                                    {payment?.length != 0 &&
                                      payments?.map((item, index) => (
                                        <Radio
                                          key={index}
                                          value={item._id}
                                          style={{ color: "#7D7463" }}
                                        >
                                          {item.paymentName}
                                        </Radio>
                                      ))}
                                  </Space>
                                </Radio.Group>
                              </div>

                              <div>
                                <button
                                  className="btn btn--e-brand-b-2"
                                  type="submit"
                                  onClick={handleSubmitForm}
                                >
                                  PLACE ORDER
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

export default CheckoutPage;
