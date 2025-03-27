import React from "react";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const user = useSelector((state) => state.user);
  const {cartProducts} = useSelector((state) => state.productCard);

  console.log(user.addresses)
  const shippingAddress = user?.addresses?.find(address => address.isDefault === true)
  console.log(shippingAddress)
  console.log(cartProducts)

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Order Summary</h2>

      {/* Shipping Address */}
      <div className="border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold">Shipping Address:</h3>
        <p>{user.name}</p>
        <p>{user.address}</p>
      </div>

      {/* Items Ordered */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Items Ordered:</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <p>{item.name} {item.variant ? `(${item.variant})` : ""}</p>
              <p className="font-semibold">₹{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
