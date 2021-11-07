import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alerts from "./Alerts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginimg from "../images/login1.jpg";
import Button from "@mui/material/Button";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const Signin = () => {
  const a = useContext(TaskContext);

  const [showIcon, setShowIcon] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const ShowAlert = (message, type) => {
    setAlert({
      type,
      message,
    });
    setTimeout(() => {
      setAlert("");
    }, 1500);
  };
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data.message);
    if (data.message === "Login successfully") {
      // window.alert(data.message);
      localStorage.setItem("token", data.authtoken);
      a.login();
      history.push("/");
    } else {
      console.log(data.error);
      ShowAlert(data.error, "danger");
      // window.alert(data.error);
    }
  };
  const handlePass = () => {
    if (showIcon) setShowIcon(false);
    else if (!showIcon) {
      setShowIcon(true);
    }
  };
  return (
    <div>
      <Alerts ShowAlert={ShowAlert} message={alert.message} type={alert.type} />
      <div className="container">
        <div
          style={{ margin: "auto" }}
          className="col-12 col-md-8 col-lg-6 col-xlg-6  "
        >
          <img
            className=""
            src={loginimg}
            style={{ width: "100%", height: "200px" }}
            alt="signin"
          />
          <form className=" shadow p-3 mb-5 bg-body " method="POST">
            <h1 style={{ color: "rgb(17, 97, 73) 0%", fontSize: "2.3rem" }}>
              SignIn
            </h1>
            <div className="">
              <label
                style={{ fontSize: "1.1rem" }}
                className="form-label "
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="form-control mb-2"
                type="text"
                name="email"
                onChange={inputHandle}
                id="email"
                value={user.email}
              />
            </div>
            <div className="">
              <label
                style={{ fontSize: "1.1rem" }}
                className="form-label "
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="form-control mb-2"
                type={showIcon ? "text" : "password"}
                name="password"
                onChange={inputHandle}
                value={user.password}
              />
              {showIcon ? (
                <VisibilityIcon
                  onClick={handlePass}
                  color="success"
                  style={{ position: "relative", top: "-37", left: "91%" }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={handlePass}
                  color="success"
                  style={{ position: "relative", top: "-37", left: "91%" }}
                />
              )}
            </div>
            <Button
              color="success"
              variant="contained"
              className=" btn-block "
              type="submit"
              onClick={postData}
            >
              Signin
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
