import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const Profile = () => {
  const [edit, setEdit] = useState("false");
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
  });

  // input handle
  const inputHandle = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const authtoken = localStorage.getItem("token");
  const fetchTask = async (e) => {
    // e.preventDefault();
    const res = await fetch("http://localhost:5000/api/v1/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    });
    const data = await res.json();
    const { name, email, phone, work } = data;
    setInput({ name, email, phone, work });
    console.log(data);
  };
  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <>
      <div className="col-12 col-md-8 col-lg-6 container shadow p-3 mt-5 bg-body rounded">
        <h2 style={{ textAlign: "center" }}>Profile</h2>
        <form>
          <div className="mb-3">
            <label
              style={{ fontSize: "1.1rem" }}
              htmlFor="fullname"
              className="form-label"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              style={{ fontSize: "1.1rem", fontWeight: "500" }}
              value={input.name}
              onChange={inputHandle}
              className="form-control"
              id="fullname"
              disabled={edit}
            />
          </div>
          <div className="mb-3">
            <label
              style={{ fontSize: "1.1rem" }}
              htmlFor="email"
              className="form-label"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              style={{ fontSize: "1.1rem" }}
              id="email"
              name="email"
              value={input.email}
              onChange={inputHandle}
              disabled={edit}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ fontSize: "1.1rem" }}
              htmlFor="phone"
              className="form-label"
            >
              Mobile no.
            </label>
            <input
              type="text"
              name="phone"
              style={{ fontSize: "1.1rem" }}
              value={input.phone}
              onChange={inputHandle}
              className="form-control"
              disabled={edit}
              id="phone"
            />
          </div>
          <div className="mb-3">
            <label
              style={{ fontSize: "1.1rem" }}
              htmlFor="work"
              className="form-label"
            >
              Work
            </label>
            <input
              type="text"
              name="work"
              style={{ fontSize: "1.1rem" }}
              value={input.work}
              onChange={inputHandle}
              className="form-control"
              disabled={edit}
              id="work"
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="submit"
              onClick={fetchTask}
              variant="contained"
              color="success"
              style={`{ textTransform: "capitalize"}`}
            >
              update
            </Button>
            <div>
              <Button
                variant="contained"
                style={{ textTransform: "capitalize" }}
                className="mx-3"
              >
                Save
              </Button>
              <Button
                color="error"
                variant="contained"
                style={{ textTransform: "capitalize" }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
