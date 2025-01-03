import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ show, onClose, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop" style={backdropStyle}>
            <div className="modal" style={modalStyle}>
                <div className="modal-header" style={headerStyle}>
                    <h2>{title}</h2>
                    <button onClick={onClose} style={closeButtonStyle}>×</button>
                </div>
                <div className="modal-content" style={contentStyle}>
                    {children}
                </div>
                <div className="modal-footer" style={footerStyle}>
                    <button onClick={onClose} style={buttonStyle}>Close</button>
                </div>
            </div>
        </div>
    );
};

const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    animation: 'fadeIn 0.3s ease-in-out',
};

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    padding: '10px 20px',
};

const closeButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
};

const contentStyle = {
    padding: '20px',
};

const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #ddd',
    padding: '10px 20px',
};

const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;