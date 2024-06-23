import PropTypes from 'prop-types';

const ModalContent = ({title, message, messageStyle, image, buttonLabel, onButtonClick, buttonStyles}) => {
  return(
    <div onClick={(e) => e.stopPropagation()}>
      <p className='font-bold pb-2 text-text-primary text-2xl text-center'>{title}</p>
      <img src={image} className='h-44 mx-auto' />
      <div className='text-center pt-2'>
        <p className={messageStyle}>{message}</p>
      </div>
      <div className="flex justify-center">
        <button className={buttonStyles} onClick={onButtonClick}>{buttonLabel}</button>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  messageStyle: PropTypes.string,
  image: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  buttonStyles: PropTypes.string.isRequired
};

export default ModalContent;