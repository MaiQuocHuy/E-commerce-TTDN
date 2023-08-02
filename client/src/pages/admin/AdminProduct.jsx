import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState(3);
  const [ok, setOk] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const [startIndex, setStartIndex] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  useEffect(() => {
    const fetchProduct = async () => {
      await getPaginatedProduct();
    };
    fetchProduct();
  }, [currentPage]);

  const getPaginatedProduct = async () => {
    try {
      const fetchData = new Promise((resolve, reject) => {
        axios
          .get(
            `${BASE_URL}/api/e-commerce/product/paginatedproduct?page=${currentPage}&limit=${limit}`
          )
          .then((reponse) => {
            const reponseData = reponse.data;
            console.log(reponseData);
            if (reponseData?.results?.result?.length !== 0) {
              setPageCount(reponseData?.results?.pageCount);
              setProducts(reponseData?.results?.result);
            } else {
              setOk(true);
            }
            setStartIndex((currentPage - 1) * limit + 1);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      toast.promise(fetchData, {
        loading: "Loading products...",
        success: "Loading product successfully!",
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

  const handlePageClick = async (e) => {
    try {
      if (search) {
        setCurrentPage(e.selected + 1);
      } else {
        setCurrentPage(e.selected + 1);
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      const deleteProduct = new Promise((resolve, reject) => {
        axios
          .get(`${BASE_URL}/api/e-commerce/product/delete-product/${id}`)
          .then((result) => {
            const responseData = result.data;
            if (responseData.success) {
              return getPaginatedProduct();
            } else {
              throw new Error("Failed to delete product");
            }
          })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
      toast.promise(deleteProduct, {
        loading: "Loading...",
        success: "Deleted product successfully!",
        error: "Failed to delete product",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      console.log(search);
      if (search) {
        const { data } = await axios.get(
          `${BASE_URL}/api/e-commerce/product/search/${search}?page=${currentPage}&limit=${limit}`
        );
        console.log(data);
        if (data?.result?.length !== 0) {
          toast.success("Searched");
          setPageCount(data?.pageCount);
          setProducts(data?.result);
          setStartIndex((currentPage - 1) * limit + 1);
        }
      } else {
        getPaginatedProduct();
      }
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Product - Dashboard"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Products</h1>
                </div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/admin/createproduct-page"
                    className="btn btn-primary"
                  >
                    New Product
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
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button
                          type="submit"
                          className="btn btn-default"
                          onClick={(e) => {
                            setCurrentPage(1);
                            handleSearch(e);
                          }}
                        >
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
                        <th width={60}>ID</th>
                        <th width={80} />
                        <th>Title</th>
                        <th>Price</th>
                        <th>Gender</th>
                        <th>Inventory</th>
                        <th>Branch</th>
                        <th width={100}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
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
                        products?.map((item, index) => (
                          <tr key={item._id}>
                            <td>{startIndex + index}</td>
                            <td>
                              <img
                                src={`${BASE_URL}/api/e-commerce/product/product-photo/${item._id}`}
                                alt="Loading"
                                width={80}
                              />
                            </td>
                            <td>
                              <a href="#">{item.name}</a>
                            </td>
                            <td>${item.price}</td>
                            <td>{item.gender}</td>
                            <td>{item.inventory} left in Stock</td>
                            <td>{item.branch.name}</td>
                            <td>
                              <Link
                                to={`/admin/updateproduct-page/${item.slug}`}
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
                              <Link
                                to="#"
                                className="text-danger w-4 h-4 mr-1"
                                onClick={(e) => handleDelete(item._id, e)}
                              >
                                <svg
                                  className="filament-link-icon w-4 h-4 mr-1 width-items"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </Link>
                            </td>
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
                  {products.length !== 0 && (
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
          </section>
        </div>
      </Layout>
    </>
  );
};

export default AdminProduct;
