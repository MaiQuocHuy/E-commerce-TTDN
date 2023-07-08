import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
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
                  <div className="col-lg-4 u-s-m-b-30">
                    <div className="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100">
                      <div className="dash__pad-3">
                        <h2 className="dash__h2 u-s-m-b-8">PERSONAL PROFILE</h2>
                        <div className="dash__link dash__link--secondary u-s-m-b-8">
                          <a href="dash-edit-profile.html">Edit</a>
                        </div>
                        <span className="dash__text">John Doe</span>
                        <span className="dash__text">johndoe@domain.com</span>
                        <div className="dash__link dash__link--secondary u-s-m-t-8">
                          <a
                            data-modal="modal"
                            data-modal-id="#dash-newsletter"
                          >
                            Subscribe Newsletter
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 u-s-m-b-30">
                    <div className="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100">
                      <div className="dash__pad-3">
                        <h2 className="dash__h2 u-s-m-b-8">ADDRESS BOOK</h2>
                        <span className="dash__text-2 u-s-m-b-8">
                          Default Shipping Address
                        </span>
                        <div className="dash__link dash__link--secondary u-s-m-b-8">
                          <a href="dash-address-book.html">Edit</a>
                        </div>
                        <span className="dash__text">
                          4247 Ashford Drive Virginia - VA-20006 - USA
                        </span>
                        <span className="dash__text">(+0) 900901904</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 u-s-m-b-30">
                    <div className="dash__box dash__box--bg-grey dash__box--shadow-2 u-h-100">
                      <div className="dash__pad-3">
                        <h2 className="dash__h2 u-s-m-b-8">BILLING ADDRESS</h2>
                        <span className="dash__text-2 u-s-m-b-8">
                          Default Billing Address
                        </span>
                        <span className="dash__text">
                          4247 Ashford Drive Virginia - VA-20006 - USA
                        </span>
                        <span className="dash__text">(+0) 900901904</span>
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
                    <tr>
                      <td>3054231326</td>
                      <td>26/13/2016</td>
                      <td>
                        <div className="dash__table-img-wrap">
                          <img
                            className="u-img-fluid"
                            src="images/product/electronic/product3.jpg"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div className="dash__table-total">
                          <span>$126.00</span>
                          <div className="dash__link dash__link--brand">
                            <a href="dash-manage-order.html">MANAGE</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3054231326</td>
                      <td>26/13/2016</td>
                      <td>
                        <div className="dash__table-img-wrap">
                          <img
                            className="u-img-fluid"
                            src="images/product/electronic/product14.jpg"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div className="dash__table-total">
                          <span>$126.00</span>
                          <div className="dash__link dash__link--brand">
                            <a href="dash-manage-order.html">MANAGE</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3054231326</td>
                      <td>26/13/2016</td>
                      <td>
                        <div className="dash__table-img-wrap">
                          <img
                            className="u-img-fluid"
                            src="images/product/men/product8.jpg"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div className="dash__table-total">
                          <span>$126.00</span>
                          <div className="dash__link dash__link--brand">
                            <a href="dash-manage-order.html">MANAGE</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>3054231326</td>
                      <td>26/13/2016</td>
                      <td>
                        <div className="dash__table-img-wrap">
                          <img
                            className="u-img-fluid"
                            src="images/product/women/product10.jpg"
                            alt
                          />
                        </div>
                      </td>
                      <td>
                        <div className="dash__table-total">
                          <span>$126.00</span>
                          <div className="dash__link dash__link--brand">
                            <a href="dash-manage-order.html">MANAGE</a>
                          </div>
                        </div>
                      </td>
                    </tr>
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
