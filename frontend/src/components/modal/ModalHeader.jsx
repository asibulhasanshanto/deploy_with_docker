import React from "react";

function ModalHeader({ title, handleOnCancel }) {
  return (
    <div className="flex justify-between px-5 py-4 border-b border-gray-200">
      <p className="text-lg font-semibold">{title}</p>
      <div className="w-7 h-7 flex justify-center items-center p-1 hover:bg-gray-100 rounded-full">
        <div className="cursor-pointer" onClick={handleOnCancel}>
          X
        </div>
      </div>
    </div>
  );
}

export default ModalHeader;
