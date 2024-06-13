import PropTypes from 'prop-types';

function Notification({ message }) {
  console.log('Notification message:', message);
  return (
    <div className="notification">
    
      <p>{message}</p>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
