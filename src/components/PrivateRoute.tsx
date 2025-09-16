import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
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
