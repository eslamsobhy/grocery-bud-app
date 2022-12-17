import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [list]); //now the timeout function will also be invoked when the list changes!

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
