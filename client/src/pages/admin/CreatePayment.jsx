import { useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../config";
import toast from "react-hot-toast";

const CreatePayment = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/e-commerce/product/create-payment`,
        {
          name,
        }
      );

      if (data?.success) {
        navigate("/admin/payment-page");
      } else {
        toast.error("Faild to create");
      }
      console.log("Success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout title={"Create - Payment"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Create Payment</h1>
                </div>
                <div className="col-sm-6 text-right">
                  <Link to="/admin/payment-page" className="btn btn-primary">
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
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-5 pt-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create
                </button>
                <Link
                  to="/admin/branch-page"
                  className="btn btn-outline-dark ml-3"
                >
                  Cancel
                </Link>
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

export default CreatePayment;
