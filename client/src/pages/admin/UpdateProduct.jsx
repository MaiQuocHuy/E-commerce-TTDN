import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Select, Image, Radio } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import BASE_URL from "../../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // console.log(photo);
      const updateProduct = new Promise((resolve, reject) => {
        const productData = new FormData();
        productData.append("name", title);
        productData.append("description", content);
        productData.append("price", price);
        productData.append("gender", gender);
        productData.append("quantity", 0);
        photo && productData.append("photo", photo);
        productData.append("inventory", inventory);
        productData.append("branch", branch);
        console.log(productData);
        axios
          .put(
            `${BASE_URL}/api/e-commerce/product/update-product/${id}`,
            productData
          )
          .then((response) => {
            const responseData = response.data;
            if (responseData?.success) navigate("/admin/product-page");
            resolve(responseData);
          })
          .catch((error) => {
            reject(error);
          });
      });
      toast.promise(updateProduct, {
        loading: "Loading...",
        success: "Product Updated successfully!",
        error: "Failed to update product",
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

  const getAllBranch = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/branch/get-all-branch`
      );
      if (data?.success) {
        setBranches(data?.branch);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-single-product/${slug}`
      );
      console.log(data);
      if (!data?.success) return toast.error("Faild to Loading product");
      const product = data.product;
      if (product != null) {
        setId(product._id);
        setTitle(product.name);
        setGender(product.gender);
        setContent(product.description);
        setPrice(product.price);
        setInventory(product.inventory);
        setBranch(product.branch._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllBranch();
  }, []);

  return (
    <>
      <Layout title={"Update - Product"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Update Product</h1>
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
                              value={title}
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
                  <div className="card mb-3">
                    <div className="card-body">
                      <h2 className="h4 mb-3">Image</h2>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => {
                          setPhoto(e.target.files[0]);
                        }}
                        hidden
                      />
                      <div className="mb-3">
                        {
                          <div className="text-center">
                            <Image
                              width={200}
                              src={`${BASE_URL}/api/e-commerce/product/product-photo/${id}`}
                              className="img img-responsive"
                            />
                          </div>
                        }
                      </div>
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
                              value={price}
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
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                      >
                        <Radio value={"male"}>male</Radio>
                        <Radio value={"female"}>female</Radio>
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
                              value={inventory}
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
                      <h2 className="h4  mb-3">Product branch</h2>
                      <div className="mb-3" style={{ display: "grid" }}>
                        <label htmlFor="branch">Branch</label>
                        <Select
                          bordered={true}
                          placeholder="Select a branch"
                          size="large"
                          className="form-select mb-3"
                          showSearch
                          value={branch}
                          // defaultValue={category}
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update
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

export default UpdateProduct;
