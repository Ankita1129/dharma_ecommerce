import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Total price calculation
  const totalPrice = () => {
    try {
      let total = 0;
      if (cart?.length > 0) {
        cart.forEach((item) => {
          total += item.price;
        });
      }
      return total.toLocaleString("en-US");
    } catch (error) {
      console.error(error);
    }
  };
  

  // Remove item from the cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      //console.log(error);
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.BACKEND_URL}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center bg-light p-2 mb-1">
              {auth?.user ? (
                `Hey ${auth?.user?.name} !`
              ) : (
                "Hey guest"
              )}
              <p className="text-center">
                {cart?.length > 0 ? (
                  `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : ", login to checkout !"
                  }`
                ) : (
                  "Your cart is empty, add some items!"
                )}
              </p>
            </h2>
          </div>
        </div>
        <div className="container my-0 pb-5 pt-3">
          <div className="row">
            <div className="col-md-8 pe-3 m-0">
              {cart?.map((p) => (
                <div className="row card p-2 my-3 me-2 flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.BACKEND_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-5">
                    <p className="title mt-3 mb-1">
                      <b>{p.name}</b>
                    </p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p className="title mt-2">
                      <b>Price : ₹ {p.price}</b>
                    </p>
                  </div>
                  <div className="col-md-3 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 my-3 p-3 cart-summary">
              <h3>CART SUMMARY</h3>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h5>Total : ₹{totalPrice()}</h5>
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h6>Current Address : {auth?.user?.address}</h6>
                  <button
                    className="btn btn-warning m-3"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning m-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning m-3"
                      onClick={() =>
                        navigate("https://dharma-1.onrender.com", {
                          state: "/cart",
                        })
                      }
                    >
                      Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {clientToken && auth?.token && cart?.length > 0 && (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-dark mt-3"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
