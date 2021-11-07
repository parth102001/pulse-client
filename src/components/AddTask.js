import React, { useState } from "react";
import Alerts from "./Alerts";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const AddTask = () => {
  const authtoken = localStorage.getItem("token");
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    message: "",
    type: "",
  });
  const [task, setTask] = useState({
    date: "",
    title: "",
    hour: "",
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
  const showForm = () => {
    if (authtoken) {
      setOpen(true);
    } else {
      history.push("/signin");
    }
  };

  // input handle
  let name, value;
  const inputHandle = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTask({ ...task, [name]: value });
  };
  // add task button function
  const addTask = async (e) => {
    e.preventDefault();
    const authtoken = localStorage.getItem("token");
    console.log(authtoken);
    const { date, title, hour } = task;
    const res = await fetch("http://localhost:5000/api/v1/tasks/addtask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify({ date, title, hour }),
    });

    const data = await res.json();
    console.log(data);
    if (data.message === "successfull") {
      // window.alert("sucessfull");
      ShowAlert("Task Added Successfully", "success");
      // history.push("/signin");
    } else {
      // console.log(input);
      // window.alert(data.error);
      ShowAlert(data.error, "danger");
    }
    setOpen(false);
    setTask({ date: "", title: "", hour: "" });
  };
  return (
    <div>
      <Alerts ShowAlert={ShowAlert} message={alert.message} type={alert.type} />

      <div className="container my-4" style={{ marginBottom: "360px" }}>
        <div className="row">
          <div
            className="col-12  col-md-8 col-lg-6 shadow p-3 mb-5 bg-body rounded-3"
            style={{ margin: "auto" }}
          >
            <form autoComplete="off">
              {open && (
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={task.date}
                    onChange={inputHandle}
                    required
                  />
                </div>
              )}
              <div className="mb-3">
                {open && (
                  <label htmlFor="title" className="form-label">
                    Task
                  </label>
                )}
                <input
                  onClick={showForm}
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={task.title}
                  placeholder="Add Task"
                  onChange={inputHandle}
                  required
                />
              </div>
              {open && (
                <div className="mb-3">
                  <label htmlFor="hour" className="form-label">
                    Hour
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="hour"
                    name="hour"
                    value={task.hour}
                    placeholder="Add hour"
                    onChange={inputHandle}
                    required
                  />
                </div>
              )}
              <Button
                style={{
                  fontSize: "1.6rem",
                  padding: "0",
                  margin: "0",
                  backgroundColor: "#28a745",
                }}
                className=" btn-block"
                size="small"
                variant="contained"
                onClick={addTask}
              >
                +
              </Button>

              {/* <button
                type="submit"
                onClick={addTask}
                className="btn btn-success btn-block"
              >
                ➕
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddTask;
