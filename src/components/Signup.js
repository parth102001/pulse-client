import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./css/Signup.css";
import signupLogo from "../images/signupimg.svg";
import Alerts from "./Alerts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { display } from "@mui/system";
const Signup = () => {
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [showIcon, setShowIcon] = useState(false);
  const ShowAlert = (message, type) => {
    setAlert({
      type,
      message,
    });
    setTimeout(() => {
      setAlert("");
    }, 1500);
  };

  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = input;
    const res = await fetch("http://localhost:5000/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, work, password, cpassword }),
    });

    const data = await res.json();
    console.log(data);
    if (data.message) {
      // window.alert("sucessfull");
      ShowAlert(data.message, "success");
      localStorage.setItem("token", data.authtoken);
      history.push("/signin");
    } else {
      console.log(input);
      // window.alert(data.error);
      ShowAlert(data.error, "danger");
    }
  };
  const handlePass = () => {
    if (showIcon) setShowIcon(false);
    else if (!showIcon) {
      setShowIcon(true);
    }
  };

  return (
    <div className="signup">
      {
        <Alerts
          ShowAlert={ShowAlert}
          message={alert.message}
          type={alert.type}
        />
      }
      <div className="container">
        <div className="row justify-content-between">
          <div className=" col-12 col-md-6 col-lg-6 col-xlg-5 shadow pb-1 mb-1 bg-body rounded-3">
            <form method="POST" className="mx-4 ">
              <h1
                className="mt-1"
                style={{ textAlign: "center", fontSize: "2.1rem" }}
              >
                Signup
              </h1>
              <div className="mb-1">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={input.name}
                  id="name"
                  autoComplete="off"
                  placeholder="Enter Full Name"
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  placeholder="Enter Email Address"
                  autoComplete="off"
                  value={input.email}
                  id="email"
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Mobile no.
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone Number"
                  value={input.phone}
                  autoComplete="off"
                  className="form-control"
                  id="phone"
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  placeholder="Enter Work Eg. Student, Job, Business, Other"
                  value={input.work}
                  autoComplete="off"
                  className="form-control"
                  id="phone"
                  onChange={inputHandle}
                  required
                />
              </div>

              <div className="mb-1">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  className="form-control"
                  autoComplete="off"
                  placeholder="Enter Password"
                  id="password"
                  onChange={inputHandle}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Confirm password
                </label>
                <input
                  type={showIcon ? "text" : "password"}
                  name="cpassword"
                  value={input.cpassword}
                  autoComplete="off"
                  className="form-control"
                  placeholder="Enter Confirm Password"
                  id="cpassword"
                  onChange={inputHandle}
                  required
                />
                {showIcon ? (
                  <VisibilityIcon
                    onClick={handlePass}
                    color="success"
                    style={{ position: "relative", top: "-30", left: "89%" }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={handlePass}
                    color="success"
                    style={{ position: "relative", top: "-30", left: "89%" }}
                  />
                )}
              </div>

              <button
                type="submit"
                onClick={postData}
                className="btn btnSignup btn-block"
              >
                Signup
              </button>
            </form>
          </div>
          <div
            className="col-12 col-md-6 col-lg-6 col-xlg-7 my-auto"
            style={{ objectFit: "contain" }}
          >
            <img src={signupLogo} alt="signup" className="signup-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
