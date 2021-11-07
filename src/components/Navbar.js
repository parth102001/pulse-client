import React, { useEffect, useState } from "react";
import "./css/Navbar.css";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import logoImg from "../images/Pulselogo.png";
import Button from "@mui/material/Button";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";
const Navbar = () => {
  const a = useContext(TaskContext);

  // setAuthToken(authtoken);
  const handleLogout = () => {
    a.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={logoImg} alt="pulse" className="logoImg" />
          <span
            style={{ color: "rgb(17, 97, 73)", fontSize: "1.5rem" }}
            className="mx-2 "
          >
            Pulse
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul
            style={{ fontSize: "1.1rem", fontWeight: "400" }}
            className="navbar-nav ml-auto "
          >
            <li className="nav-item mr-2">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            {a.authToken && (
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}

            {!a.authToken && (
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/signin">
                  Signin
                </NavLink>
              </li>
            )}
            {!a.authToken && (
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
            {a.authToken && (
              <li className="nav-item mr-2">
                <Button
                  style={{ textTransform: "capitalize" }}
                  variant="contained"
                  onClick={handleLogout}
                  className="mx-2"
                >
                  Logout
                </Button>
              </li>
            )}
            {a.authToken && (
              <Avatar
                src="/broken-image.jpg"
                sx={{ bgcolor: deepOrange[500] }}
              />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
