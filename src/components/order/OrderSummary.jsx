import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../notifications/loadingAlertSlice";

const OrderSummary = () => {
  const dispatch = useDispatch()
  const { user, status } = useSelector((state) => state.user);
  const { cartProducts, totalCartAmount, cartDiscount, deliveryCharge } =
    useSelector((state) => state.productCard);

  console.log("cart pro.........", cartProducts);
  const shippingAddress = user?.addresses?.find(
    (address) => address.isShippingAddress === true
  );
  const totalItems = cartProducts.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <main className="container py-5" style={{ color: "#224d43" }}>
      <h2 className="text-center fw-bold mb-4">Order Summary</h2>
      {status === "success" && (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card p-4 shadow-sm border-0">
              <h5 className="fw-bold mb-3">Shipping Address</h5>
              <p className="mb-1">
                <strong>{user?.name}</strong>
              </p>
              <p className="mb-1">
                {shippingAddress?.street}, {shippingAddress?.city},{" "}
                {shippingAddress?.zip}
              </p>
              <p className="mb-1">{shippingAddress?.country}</p>
              <p className="mb-0">Phone: {shippingAddress?.phoneNo}</p>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card p-4 shadow-sm border-0">
              <h5 className="fw-bold mb-3">Price Details</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>
                  Price ({totalItems} item{totalItems === 1 ? "" : "s"})
                </span>
                <span>₹{totalCartAmount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span>₹{cartDiscount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount</span>
                <span>₹{totalCartAmount + deliveryCharge - cartDiscount}</span>
              </div>
              <p className="text-success mt-2">
                You will save ₹{cartDiscount} on this order.
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className="card p-4 shadow-sm border-0">
              <h5 className="fw-bold mb-3">Items Ordered</h5>
              {cartProducts.map((item, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between py-2 border-bottom"
                >
                  <div>
                    <p className="mb-0">
                      {item.name} {item?.variant && `(${item.variant})`}
                    </p>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <p className="fw-semibold mb-0">₹{item.totalPrice}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 text-center mt-4">
            <button
              className="btn rounded-pill fw-bold px-4 py-2 text-light"
              style={{ backgroundColor: "#8b5e3c" }}
              onClick={() => {
                dispatch(setAlert(`Order placed successfully!`))
              }}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default OrderSummary;
