import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../config";
import Layout from "../../components/LayoutAdmin/Layout";
import { toast } from "react-hot-toast";

const UpdatePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updated, setUpdated] = useState("");
  const getSinglePage = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-single-payment/${id}`
      );
      setUpdated(data?.payment?.paymentName);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("Success");
      console.log(updated);
      const { data } = await axios.put(
        `${BASE_URL}/api/e-commerce/product/update-payment/${id}`,
        {
          name: updated,
        }
      );
      if (data?.success) {
        toast.success("Updated successfully");
        navigate("/admin/payment-page");
      } else toast.error(data?.error);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSinglePage();
  }, []);
  return (
    <>
      <Layout title={"Update - Payment"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid my-2">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Update Payment</h1>
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
                          value={updated}
                          onChange={(e) => setUpdated(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-5 pt-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
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

export default UpdatePayment;
