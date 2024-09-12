import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  let authState;
  try {
    console.log(localStorage.getItem('role'))
    authState = localStorage.getItem('role');
  } catch (error) {
    authState = null;
  }
  console.log(allowedRoles)
  if (!authState || !allowedRoles.includes(authState)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
