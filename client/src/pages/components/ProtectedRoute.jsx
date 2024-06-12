import { Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !allowedRoles.includes(user?.type)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
