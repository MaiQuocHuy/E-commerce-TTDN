import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { useOrder } from "../../context/order";
import axios from "axios";
import BASE_URL from "../../config";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useOrder();
  const [user, setUser] = useState({});

  const getInfo = async () => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/auth/info-user`,
        {
          id: auth?.user?._id,
        }
      );
      if (data?.success) {
        setUser(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (timestamp) => {
    try {
      // const timestamp = "2023-07-15T10:55:39.110Z";
      const date = new Date(timestamp);
      const formattedDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      return formattedDate;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getInfo();
      console.log(orders);
    }
  }, [auth?.token]);

  return (
    <>
      <Layout title={"Dash Board"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <h1 className="dash__h1 u-s-m-b-14">Manage My Account</h1>
                <span className="dash__text u-s-m-b-30">
                  From your My Account Dashboard you have the ability to view a
                  snapshot of your recent account activity and update your
                  account information. Select a link below to view or edit
                  information.
                </span>
                <div className="row">
                  <div className="col-lg-12 u-s-m-b-30">
                    <div className="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100 text-center">
                      <div className="dash__pad-3">
                        <h2 className="dash__h2 u-s-m-b-8">PERSONAL PROFILE</h2>
                        <div className="dash__link dash__link--secondary u-s-m-b-8">
                          <Link to="/user/dashboardprofile-page">Edit</Link>
                        </div>
                        <span className="dash__text">{user?.name}</span>
                        <span className="dash__text">{user?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius">
              <h2 className="dash__h2 u-s-p-xy-20">RECENT ORDERS</h2>
              <div className="dash__table-wrap gl-scroll">
                <table className="dash__table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Placed On</th>
                      <th>Items</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length != 0 &&
                      orders?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?._id}</td>
                          <td>{formatDate(item?.createdAt)}</td>
                          <td>
                            <span>{item?.payment?.paymentName}</span>
                          </td>
                          <td>
                            <div className="dash__table-total">
                              <span>${item.totalmoney}</span>
                              <div className="dash__link dash__link--brand">
                                <Link
                                  to={`/user/managemyorder-page/${item._id}`}
                                >
                                  MANAGE
                                </Link>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default Dashboard;
