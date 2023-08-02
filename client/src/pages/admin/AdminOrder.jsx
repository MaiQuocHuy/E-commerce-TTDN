import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import BASE_URL from "../../config";
import ReactPaginate from "react-paginate";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";

const { Option } = Select;

const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipping",
    "Finish",
  ]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  // const [startIndex, setStartIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [ok, setOk] = useState(false);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const handlePageClick = async (e) => {
    try {
      setCurrentPage(e.selected + 1);
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await getPaginatedOrder();
    };
    fetchProduct();
  }, [currentPage]);

  const handleChangeStt = async (value, id) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/change-status-order`,
        {
          value,
          id,
        }
      );
      console.log(data?.order);
      if (data?.success) {
        getPaginatedOrder();
        toast.success("Change Status Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    } catch (error) {
      console.log(error);
    }
  };

  const getPaginatedOrder = async () => {
    try {
      const fetchData = new Promise((resolve, reject) => {
        axios
          .get(
            `${BASE_URL}/api/e-commerce/product/paginatedorder?page=${currentPage}&limit=${limit}`
          )
          .then((reponse) => {
            const reponseData = reponse.data;
            console.log(reponseData);
            if (reponseData?.results?.result?.length !== 0) {
              setPageCount(reponseData?.results?.pageCount);
              setOrders(reponseData?.results?.result);
            } else {
              setOk(true);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      toast.promise(fetchData, {
        loading: "Loading Orders...",
        success: "Loading Order successfully!",
        error: "Failed to loading product",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      });
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Layout title={"Order - Dashboard"}>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid my-2">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Orders</h1>
              </div>
              <div className="col-sm-6 text-right"></div>
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
                      <th>Orders #</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Total</th>
                      <th>Date Purchased</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.length === 0 ? (
                      <tr>
                        <td colSpan={7}>
                          {ok === false ? (
                            <Spin
                              indicator={antIcon}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            />
                          ) : (
                            <h4
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              Nothing
                            </h4>
                          )}
                        </td>
                      </tr>
                    ) : (
                      orders?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Link to={`/admin/orderdetail-page/${item._id}`}>
                              {item._id}
                            </Link>
                          </td>
                          <td>{item.user.name}</td>
                          <td>{item.user.email}</td>
                          <td>{item.payment.paymentName}</td>
                          <td>
                            <Select
                              bordered={true}
                              defaultValue={item?.status}
                              onChange={(value) =>
                                handleChangeStt(value, item._id)
                              }
                            >
                              {status.map((s, i) => (
                                <Option
                                  key={i}
                                  value={s}
                                  disabled={
                                    status.indexOf(s) <=
                                      status.indexOf(item.status) ||
                                    (status.indexOf(s) >
                                      status.indexOf(item.status) &&
                                      parseInt(status.indexOf(s) - 1) !=
                                        parseInt(status.indexOf(item.status)))
                                  }
                                >
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </td>
                          <td>{item.totalmoney}</td>
                          <td>{formatDate(item.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div
                className="card-footer clearfix"
                style={{ backgroundColor: "white" }}
              >
                {orders.length !== 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={2}
                    containerClassName="pagination justify-content-end mb-0"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                )}
              </div>
            </div>
          </div>
          {/* /.card */}
        </section>
        {/* /.content */}
      </div>
    </Layout>
  );
};

export default AdminOrder;
