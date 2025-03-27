import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "./loadingAlertSlice";

const AlertMessage = () => {
  const { alert } = useSelector((state) => state.loadingAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  return (
    alert && (
      <Alert variant="success" className="text-center top-50 position-sticky z-2 w-50 mx-auto bg-success text-light">
        {alert}
      </Alert>
    )
  );
};

export default AlertMessage;
