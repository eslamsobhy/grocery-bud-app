import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
