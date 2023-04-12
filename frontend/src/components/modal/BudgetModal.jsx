import React, { useState } from "react";
import Modal from "./";
import ModalHeader from "./ModalHeader";

function SettingsModal({ show, handleOnCancel, handleOnSubmit, modalTitle }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAdd = (e) => {
    e.preventDefault();
    handleOnSubmit(title, amount);
    setTitle("");
    setAmount(0);
  };

  return (
    <Modal show={show}>
      <ModalHeader title={modalTitle} handleOnCancel={handleOnCancel} />
      <div className="px-6 py-1 pb-8 flex flex-col gap-2">
        <form className="space-y-3" onSubmit={handleAdd}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                placeholder="e.g. Rent, Food, etc."
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <input
                id="amount"
                name="amount"
                type="number"
                required
                value={amount}
                placeholder="e.g. 1000"
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default SettingsModal;
