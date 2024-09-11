/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import Tooltip from "@mui/material/Tooltip";

const LogoutBtn = () => {
  const navigate = useNavigate();

  const logout = () => {
    //clear user data from storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };
  return (
    <>
      <Tooltip title="Logout">
        <button className="logoutBtn" onClick={logout}>
          <LuLogOut />
        </button>
      </Tooltip>
    </>
  );
};

export default LogoutBtn;
