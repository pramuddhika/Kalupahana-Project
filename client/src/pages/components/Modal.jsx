import PropTypes from 'prop-types';

const Modal = ({ open, children }) => {
    return (
        <div className={`
            fixed inset-0 flex justify-center items-center 
            transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
        `}>
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow p-6 transition-all
                    ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}>
                {children}
            </div>
        </div>
    );
}

export default Modal;

Modal.propTypes = {
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
};
