import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Select, Radio } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");

  const getAllBranch = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/branch/get-all-branch`
      );
      if (data?.success) {
        setBranches(data?.branch);
        console.log(branch);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllBranch();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const fetchData = new Promise((resolve, reject) => {
        const productData = new FormData();
        productData.append("name", title);
        productData.append("description", content);
        productData.append("price", price);
        productData.append("gender", gender);
        productData.append("quantity", 0);
        productData.append("photo", photo);
        productData.append("inventory", inventory);
        productData.append("branch", branch);
        axios
          .post(
            `${BASE_URL}/api/e-commerce/product/create-product`,
            productData
          )
          .then((response) => {
            const responseData = response.data;
            // console.log(responseData);
            if (responseData.success) {
              navigate("/admin/product-page");
            }
            return responseData;
          })
          .then((responseData) => {
            console.log("Addtional data", responseData);
            axios
              .post(`${BASE_URL}/api/e-commerce/product/create-comment`, {
                idProduct: responseData.product._id,
              })
              .then(() => {
                resolve();
              });
          })
          .catch((error) => {
            reject(error);
          });
      });
      toast.promise(fetchData, {
        loading: "Loading...",
        success: "Product created successfully!",
        error: "Failed to create product",
        duration: 3000,
        position: "top-center",
        style: {
          background: "yellow",
          color: "black",
        },
      });
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in creating product");
    }
  };

  return (
    <>
      <Layout title={"Create - Product"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Create Product</h1>
                </div>
                <div className="col-sm-6 text-right">
                  <Link to="/admin/product-page" className="btn btn-primary">
                    Back
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
              <div className="row">
                <div className="col-md-8">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="form-control"
                              placeholder="Title"
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <ReactQuill
                              theme="snow"
                              value={content}
                              onChange={setContent}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card mb-3"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div className="card-body">
                      <h2 className="h4 mb-3">Image</h2>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h2 className="h4 mb-3">Pricing</h2>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <input
                              type="text"
                              name="price"
                              id="price"
                              className="form-control"
                              placeholder="Price"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h2 className="h4  mb-3">Gender</h2>
                      <Radio.Group
                        onChange={(e) => {
                          console.log(e.target.value);
                          setGender(e.target.value);
                        }}
                        value={gender}
                      >
                        <Radio
                          value={"male"}
                          style={{ color: "rgb(127, 127, 127)" }}
                        >
                          male
                        </Radio>
                        <Radio
                          value={"female"}
                          style={{ color: "rgb(127, 127, 127)" }}
                        >
                          female
                        </Radio>
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h2 className="h4 mb-3">Inventory</h2>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <input
                              type="number"
                              min={0}
                              name="qty"
                              id="qty"
                              className="form-control"
                              placeholder="Qty"
                              onChange={(e) => setInventory(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="h4  mb-3">Product Branch</h2>
                      <div className="mb-3" style={{ display: "grid" }}>
                        <label htmlFor="branch">Branch</label>
                        <Select
                          bordered={true}
                          placeholder="Select a branch"
                          size="large"
                          showSearch
                          className="form-select mb-3"
                          onChange={(value) => {
                            setBranch(value);
                          }}
                        >
                          {branches?.map((c) => (
                            <Option key={c._id} value={c._id}>
                              {c.name}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-5 pt-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create
                </button>
                <a href="products.html" className="btn btn-outline-dark ml-3">
                  Cancel
                </a>
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

export default CreateProduct;
