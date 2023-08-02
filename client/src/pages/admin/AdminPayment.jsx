import { Link } from "react-router-dom";
import Layout from "../../components/LayoutAdmin/Layout";
import { Button } from "antd";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../config";

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);

  const getAllPayment = async () => {
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
    getAllPayment();
  }, []);

  return (
    <>
      <Layout title={"Payment - Dashboard"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Payment</h1>
                </div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/admin/createpayment-page"
                    className="btn btn-primary"
                  >
                    New Payment
                  </Link>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            {/* Default box */}
            <div className="container-fluid">
              <div className="card">
                <div className="card-header">
                  <div className="card-tools">
                    <div
                      className="input-group input-group"
                      style={{ width: 250 }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control float-right"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body table-responsive p-0">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th width={100}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments?.length != 0 &&
                        payments?.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.paymentName}</td>
                            <td>
                              <Link
                                to={`/admin/updatepayment-page/${item._id}`}
                              >
                                <svg
                                  className="filament-link-icon w-4 h-4 mr-1 width-items"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* /.card */}
          </section>
          {/* /.content */}
        </div>
      </Layout>
    </>
  );
};

export default AdminPayment;
