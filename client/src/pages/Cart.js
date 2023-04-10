import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "./Redux/product/productActions";
import "../styles/CartStyles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useAuth } from "../context/auth";

//
const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  // const [order, setOrder] = useState();
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();

  const cart = useSelector((state) => state.productState.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
   
  };

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString();
    } catch (error) {
      console.log(error);
    }
  };

  //  const handleOrder = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("http://localhost:2020/product/make-orders", {
  //       order
  //     });
  //     // setOrder([]);
  //     navigate("/orders");
  //     // alert("Order Placed Successfully ");
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:2020/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:2020/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      // localStorage.removeItem("cart");
      // cart([]);
      // console.log(data);
      alert("Payment Completed Successfully ");
      navigate("/user/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" cart-page" style={{ marginTop: "50px" }}>
        {/* <div className="row">
          <div className="col-md-12"></div>
        </div> */}
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4 col-sm-3">
                    <img
                      //   src={`/product/${p._id}`}
                      src={`/images/banner.jpg`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4 col-sm-3">
                    <p>{p.name}</p>
                    <p>{p.description}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  {/* {cart.some(el => el.p.id === p.id)
                  
                            && */}
                  {/* <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => handleRemoveFromCart(p.id)}
                  >
                    Remove from cart
                  </Button> */}
                  <div className="col-md-4 col-sm-3 cart-remove-btn d-flex align-items-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                  {/* } */}
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Order</p>
              <hr />
              <h4>Total : {totalPrice()}.00 ₹ </h4>

              {/* <div className="mt-2">
                <>
                  <button className="btn btn-primary my-3" onClick={handlePayment}>Order Now</button>
                </>
              </div> */}

              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
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
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={!instance}
                    >
                      Make Payment
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
