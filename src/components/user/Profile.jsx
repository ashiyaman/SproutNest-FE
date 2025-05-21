import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap'

import {
  deleteAddress,
  getAddresses,
  getUser,
  setShippingAddress,
} from "./userSlice.jsx";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userAddresses, status } = useSelector((state) => state.user);

  console.log("...profile.....................", user, userAddresses);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAddresses())
  }, []);

  const editDetailsHandler = (editAddress) => {
    console.log("....edit addr...", editAddress);
    navigate("/user/userForm", { state: { editAddress: editAddress } });
  };

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
                  className="card container py-4"
                  style={{ color: "#224d43" }}
                >
                  <p className="fw-semibold">{user.name}</p>
                  <p>
                    {address.street}, {address.city}, {address.country},{" "}
                    {address.zip}.
                  </p>
                  {user.phoneNo && <p>Phone No: {user.phoneNo}</p>}
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
                        dispatch(
                          deleteAddress({
                            userId: user._id,
                            addressId: address._id,
                          })
                        )
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
