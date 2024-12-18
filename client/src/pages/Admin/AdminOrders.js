import React, { useState, useEffect } from "react";
import axios from "axios";
// import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  // const [status, setStatus] = useState([...]);
  const status = ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"];
  // const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // const [auth, setAuth] = useAuth();
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("BACKEND_URL/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`BACKEND_URL/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Layout title={"All Orders"}>
      <div className="row dashboard p-5 mt-4 btxt">
        <div className="col-md-3 px-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td className="btxt">
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container my-0">
                  {o?.products?.map((p, i) => (
                    <div className="row p-3 card flex-row m-2 my-3" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="80px"
                          height={"80px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p className="bld m-0 mt-2 py-1">{p.name}</p>
                        <p className="m-0 py-1">{p.description.substring(0, 30)}</p>
                        <p className="bld m-0 mt-2 py-1">Price : ₹ {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
