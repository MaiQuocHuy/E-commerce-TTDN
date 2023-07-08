/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const DashboardTrackOrder = () => {
  return (
    <>
      <Layout title={"Dashboard-Track-Order"}>
        <UserMenu>
          <div className="col-lg-9 col-md-12">
            <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
              <div className="dash__pad-2">
                <h1 className="dash__h1 u-s-m-b-14">Track your Order</h1>
                <span className="dash__text u-s-m-b-30">
                  To track your order please enter your Order ID in the box
                  below and press the "Track" button. This was given to you on
                  your receipt and in the confirmation email you should have
                  received.
                </span>
                <form className="dash-track-order">
                  <div className="gl-inline">
                    <div className="u-s-m-b-30">
                      <label className="gl-label" htmlFor="order-id">
                        Order ID *
                      </label>
                      <input
                        className="input-text input-text--primary-style"
                        type="text"
                        id="order-id"
                        placeholder="Found in your confirmation email"
                      />
                    </div>
                    <div className="u-s-m-b-30">
                      <label className="gl-label" htmlFor="track-email">
                        Email *
                      </label>
                      <input
                        className="input-text input-text--primary-style"
                        type="text"
                        id="track-email"
                        placeholder="Email you used during checkout"
                      />
                    </div>
                  </div>
                  <button className="btn btn--e-brand-b-2" type="submit">
                    TRACK
                  </button>
                </form>
              </div>
            </div>
          </div>
        </UserMenu>
      </Layout>
    </>
  );
};

export default DashboardTrackOrder;
