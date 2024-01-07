import React from "react";

const Modal = ({ imageUrl, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90">
            <div className="max-w-[90%] max-h-[90%] ">
                <img
                    src={imageUrl}
                    alt="Full Size"
                    className="h-auto lg:h-[95vh] w-auto mt-[-20px] object-center"
                />
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
