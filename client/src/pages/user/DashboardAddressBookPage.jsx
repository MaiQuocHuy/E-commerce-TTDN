import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const DashboardAddressBookPage = () => {
  return (
    <>
      <Layout title={"Dashboard Address Book"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
              <div className="dash__pad-2">
                <div className="dash__address-header">
                  <h1 className="dash__h1">Address Book</h1>
                  <div>
                    <span className="dash__link dash__link--black u-s-m-r-8">
                      <a href="dash-address-make-default.html">
                        Make default shipping address
                      </a>
                    </span>
                    <span className="dash__link dash__link--black">
                      <a href="dash-address-make-default.html">
                        Make default shipping address
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
              <div className="dash__table-2-wrap gl-scroll">
                <table className="dash__table-2">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Full Name</th>
                      <th>Address</th>
                      <th>Region</th>
                      <th>Phone Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <a
                          className="address-book-edit btn--e-transparent-platinum-b-2"
                          href="dash-address-edit.html"
                        >
                          Edit
                        </a>
                      </td>
                      <td>John Doe</td>
                      <td>4247 Ashford Drive Virginia VA-20006 USA</td>
                      <td>Virginia VA-20006 USA</td>
                      <td>(+0) 900901904</td>
                      <td>
                        <div className="gl-text">Default Shipping Address</div>
                        <div className="gl-text">Default Billing Address</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a
                          className="address-book-edit btn--e-transparent-platinum-b-2"
                          href="dash-address-edit.html"
                        >
                          Edit
                        </a>
                      </td>
                      <td>Doe John</td>
                      <td>1484 Abner Road</td>
                      <td>Eau Claire WI - Wisconsin</td>
                      <td>(+0) 7154419563</td>
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <a
                className="dash__custom-link btn--e-brand-b-2"
                href="dash-address-add.html"
              >
                <i className="fas fa-plus u-s-m-r-8" />
                <span>Add New Address</span>
              </a>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default DashboardAddressBookPage;
