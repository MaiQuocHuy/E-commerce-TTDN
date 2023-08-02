import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import { toast } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Button } from "antd";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AdminBranch = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(new Map());
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
    const fetchBranch = async () => {
      await toast.promise(getPaginatedBranch(), {
        loading: "Loading...",
        success: "Loading product successfully!",
        error: "Failed to loading product",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      });
      setStartIndex((currentPage - 1) * limit + 1);
    };
    fetchBranch();
  }, [currentPage]);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      console.log(id);
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/branch/delete-branch/${id}`
      );
      if (data?.success) {
        toast.success(data.message);
        await getPaginatedBranch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(search);
    try {
      if (search !== "") {
        const resultMap = new Map();
        Array.from(products.entries()).map(([key, value]) => {
          if (key.name.includes(search) || key.slug.includes(search)) {
            resultMap.set(key, value);
          }
        });
        console.log(resultMap, "Result");
        setProducts(resultMap);
      } else {
        // getPaginatedBranch();
        toast.promise(getPaginatedBranch(), {
          loading: "Loading...",
          success: "Loading product successfully!",
          error: "Failed to loading product",
          duration: 3000,
          position: "top-center",
          style: {
            background: "yellow",
            color: "black",
          },
        });
      }
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  const getPaginatedBranch = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/branch/paginatedbranch?page=${currentPage}&limit=${limit}`
      );
      // console.log(data?.results?.result, "Branch");
      const productsNew = data?.results?.result;
      if (productsNew.length !== 0) {
        let results;
        let newData = new Map();
        for (const item of productsNew) {
          results = await axios.get(
            `${BASE_URL}/api/e-commerce/product/get-product-by-branch/${item._id}`
          );
          newData.set(item, results?.data?.products);
        }
        Array.from(newData.entries()).map(([key, value]) => {
          console.log(`${key.name} = ${value.length}`);
        });
        setProducts(newData);
      }
      setPageCount(data?.results?.pageCount);
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  const handlePageClick = async (e) => {
    try {
      console.log(e);
      setCurrentPage(e.selected + 1);
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Branch - Dashboard"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Branches</h1>
                </div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/admin/createbranch-page"
                    className="btn btn-primary"
                  >
                    New Branch
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
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button
                          type="submit"
                          className="btn btn-default"
                          onClick={handleSearch}
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
                        <th width={60}>STT</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th width={100}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.size === 0 ? (
                        <tr>
                          <td colSpan={4}>
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
                        Array.from(products.entries()).map(
                          ([item, value], index) => (
                            <tr key={item._id}>
                              <td>{startIndex + index}</td>
                              <td>{item.name}</td>
                              <td>{item.slug}</td>
                              <td>
                                <Link
                                  to={`/admin/updatebranch-page/${item._id}`}
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
                                <Button
                                  className="text-danger w-4 h-4 mr-1"
                                  // value={item.slug}
                                  // disabled={}
                                  style={{
                                    background: "transparent",
                                    borderColor: "transparent",
                                  }}
                                  disabled={value.length !== 0 ? true : false}
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
                                </Button>
                              </td>
                            </tr>
                          )
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  className="card-footer clearfix"
                  style={{ backgroundColor: "white" }}
                >
                  {products.size !== 0 && (
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
    </>
  );
};

export default AdminBranch;
