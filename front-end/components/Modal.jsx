import React, { useState } from "react";

const Modal = ({ isErrorModalOpen, setIsErrorModalOpen, txtError }) => {
  //   const [isModal, setIsModal] = useState(false);

  return (
    <div className="">
      {isErrorModalOpen && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl flex items-center justify-center my-3">
              Error
            </h2>
            <button
              className="bg-red-500  rounded-full text-sm w-6 h-6 mb-1 text-white font-bold "
              onClick={() => setIsErrorModalOpen(false)}
            >
              X
            </button>
          </div>

          <p className="text-xl">{txtError} </p>
        </>
      )}
    </div>
  );
};

export default Modal;
