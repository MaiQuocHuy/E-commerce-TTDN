import { Link, useParams } from "react-router-dom";
import Layout from "../../components/LayoutAdmin/Layout";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import BASE_URL from "../../config";

const OrderDetail = () => {
  const { id } = useParams();
  const [idOrder, setIdOrder] = useState("");
  const [totalMoney, setTotalMoney] = useState("");
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const getSingleOrder = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/e-commerce/product/orderdetail/${id}`
      );
      console.log(data?.order);
      if (data?.success) {
        setTotalMoney(data?.order?.totalmoney);
        setIdOrder(data?.order?._id);
        setProducts(data?.order?.products);
        setStatus(data?.order?.status);
        setAddress(data?.order?.checkout?.checkoutAddress);
        setEmail(data?.order?.checkout?.checkoutEmail);
        setPhone(data?.order?.checkout?.checkoutPhone);
        setName(data?.order?.checkout?.checkoutName);
      }
    } catch (error) {
      console.log();
      toast.error(error);
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, []);

  return (
    <Layout title={"Order Details"}>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid my-2">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Order: # {idOrder}</h1>
              </div>
              <div className="col-sm-6 text-right">
                <Link to="/admin/order-page" className="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header pt-3">
                    <div className="row invoice-info">
                      <div className="col-sm-4 invoice-col">
                        <h1 className="h5 mb-3">Shipping Address</h1>
                        <address>
                          <strong>{name}</strong>
                          <br />
                          {address}
                          <br />
                          Phone: {phone}
                          <br />
                          Email: {email}
                        </address>
                      </div>
                      <div className="col-sm-4 invoice-col">
                        <b>OrderID: {idOrder} </b>
                        <br />
                        <br />
                        <b></b>
                        <br />
                        <b>Total:</b> ${parseInt(totalMoney).toFixed(2)}
                        <br />
                        <b>Status:</b>{" "}
                        <span className="text-success">{status}</span>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-3">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th width={100}>Price</th>
                          <th width={100}>Qty</th>
                          <th width={100}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {console.log(products)} */}
                        {products.length != 0 &&
                          products?.map((item, index) => (
                            <tr key={index}>
                              <td>{item.product.name}</td>
                              <td>${item.product.price}</td>
                              <td>{item.quantity}</td>
                              <td>
                                $
                                {parseInt(
                                  parseInt(item.quantity) *
                                    parseInt(item.product.price)
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}

                        <tr>
                          <th colSpan={3} className="text-right">
                            Subtotal:
                          </th>
                          <td>$5.00</td>
                        </tr>

                        <tr>
                          <th colSpan={3} className="text-right">
                            Grand Total:
                          </th>
                          <td>${parseInt(totalMoney).toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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

export default OrderDetail;
