import React from "react";

function Modal({ show, children }) {
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 bg-[#b3b8bba1] w-full h-full`}
    >
      <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]">
        <div className="flex flex-col gap-4 bg-[#ffff] shadow-2xl rounded-md w-[280px] md:w-[380px] h-[100%]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
