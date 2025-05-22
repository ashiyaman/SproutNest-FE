import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap'

import {
  deleteAddress,
  getUser,
  postAddress
} from "./userSlice.jsx";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.user);


  useEffect(() => {
    dispatch(getUser());
  }, []);

  const editDetailsHandler = (editAddress) => {
    navigate("/user/userForm", { state: { editAddress: editAddress } });
  };

  const setShippingAddress = (selectedAddress) => {
    const updatedAddress = user.addresses.map(address => {
        (address._id === selectedAddress._id) ? address.isShippingAddress(true) : address.isShippingAddress(false)
    })
    postAddress(updatedAddress)
  }

  return (
    <main className="container py-4" style={{ color: "#224d43" }}>
      {status === "loading" && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
          <span className="ms-2">Loading...</span>
        </div>
      )}
      {user && (
        <>
          <h3 className="my-3">Welcome, {user?.name}</h3>
          <hr />
          {user?.addresses && (
            <>
              <h5 className="py-2">Address:</h5>
              {user.addresses.map((address) => (
                <div
                  key={address._id}
                  className="card container py-4 my-3"
                  style={{ color: "#224d43" }}
                >
                  <p>{address.street}, </p>
                  <p>{address.city}, </p>
                  <p>{address.country}, {address.zip}.</p>
                  {user?.phoneNo && <p>Phone No: {user.phoneNo}</p>}
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-success fw-bold rounded-pill my-2"
                      onClick={() => editDetailsHandler(address)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger fw-bold rounded-pill my-2"
                      onClick={() =>
                      {
                        console.log('................in delete btn..........', address)
                        dispatch(deleteAddress({ user, addressData: address }))
                      }
                      }
                    >
                      Delete
                    </button>
                    {address.isShippingAddress ? (
                      ""
                    ) : (
                      <button
                        className="btn btn-success fw-bold rounded-pill my-2"
                        onClick={() => setShippingAddress(address)}
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          <div className="container text-center my-4">
            <Link
              className="btn btn-success fw-bold rounded-pill my-2"
              to="/user/userForm"
            >
              Add Address
            </Link>
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
