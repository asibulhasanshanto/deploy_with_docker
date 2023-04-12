import React from "react";
import { Link } from "react-router-dom";
import { useAccountDispatch } from "../../context/AccountContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavButtons = () => {
  const dispatch = useAccountDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "SET_ACCOUNT", payload: null });
    toast.success("Log out successful");
    navigate("/login");
  };
  return (
    <>
      <Link
        to="/"
        className="inline-flex  items-center border-b-2  px-1 pt-1 text-sm font-medium text-gray-900"
      >
        Personal Finance Manager
      </Link>

      <div className="button_holder float-right flex items-center">
        <div onClick={handleLogout} className=" items-center border-b-2 border-transparent px-3 py-2  text-sm font-medium text-white bg-gray-800 cursor-pointer rounded-md hover:bg-gray-900 ">
          Log Out
        </div>
      </div>
    </>
  );
};

export default NavButtons;
