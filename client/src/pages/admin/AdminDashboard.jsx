import { useEffect, useState } from "react";
import Layout from "../../components/LayoutAdmin/Layout";
import { useOrder } from "../../context/order";
import "../../styles/adminlte.min.css";
import "../../styles/vendor.css";
import BASE_URL from "../../config";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/get-all-orders`
      );
      console.log(data, "Da vao");
      if (data?.success) {
        console.log(data?.totalOrder);
        setTotalMoney(data?.totalOrder);
      }
    };
    const fetchDataUser = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/auth/get-all-user`
      );
      if (data?.success) {
        console.log(data?.users);
        setTotalUser(data?.users?.length);
      }
    };
    fetchData();
    fetchDataUser();
  }, []);
  return (
    <>
      <Layout title={"Admin - Dashboard"}>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Dashboard</h1>
                </div>
                <div className="col-sm-6" />
              </div>
            </div>
          </section>
          <section className="content">
            {/* Default box */}
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-6 text-center">
                  <div className="small-box card">
                    <div className="inner">
                      <h3>{totalMoney}</h3>
                      <p>Total Orders</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-bag" />
                    </div>
                    <Link
                      to="/admin/order-page"
                      className="small-box-footer text-dark"
                    >
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6 col-6 text-center">
                  <div className="small-box card">
                    <div className="inner">
                      <h3>{totalUser}</h3>
                      <p>Total Users</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-stats-bars" />
                    </div>
                    <Link
                      to="/admin/user-page"
                      className="small-box-footer text-dark"
                    >
                      More info <i className="fas fa-arrow-circle-right" />
                    </Link>
                  </div>
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

export default AdminDashboard;
