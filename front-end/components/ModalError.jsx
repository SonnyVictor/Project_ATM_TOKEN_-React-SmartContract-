import React from "react";

const ModalError = ({ error, isError, setIsError }) => {
  console.log("isEroor", isError);
  return (
    isError && (
      <div className="w-full h-screen fixed top-0 left-0  flex flex-col justify-center items-center">
        <div className="modalContainer  ">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setIsError(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1>Are You Sure You Want to Continue?</h1>
          </div>
          <div className="body">
            <p>You are Reject MetaMask</p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setIsError(false);
              }}
              id="cancelBtn"
            >
              X
            </button>
            {/* <button onClick={() => handleCheckNetWork()}>Change network</button> */}
          </div>
        </div>
      </div>
    )
  );
};

export default ModalError;
