import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import "./css/Tasks.css";
import { useContext } from "react";
import TaskContext from "../context/TaskContext";

const Tasks = () => {
  const a = useContext(TaskContext);
  console.log(a.authtoken);
  var curr = new Date();
  curr.setDate(curr.getDate());
  var date = curr.toISOString().substr(0, 10);

  const [taskData, setTaskData] = useState([]);
  const [dateTask, setDateTask] = useState(date);

  const history = useHistory();

  let num = 0;
  // console.log(d);
  const inputHandle = (e) => {
    let value;
    value = e.target.value;
    setDateTask(value);
  };
  const fetchTask = async () => {
    const res = await fetch(
      "http://localhost:5000/api/v1/tasks/fetchalltasks",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": a.authToken,
        },
      }
    );

    const data = await res.json();
    setTaskData(data);
    // console.log(taskData);
  };
  const dateBtn = () => {
    setDateTask(dateTask);
  };
  const refreshBtn = () => {
    fetchTask();
  };
  useEffect(() => {
    if (a.authToken) {
      fetchTask();
    } else {
      history.push("/signin");
    }
  });
  // console.log(date);
  // console.log(dateTask);
  // console.log(taskData.date);
  // fetchTask();
  return (
    <div className="container-xl shadow-lg p-3 mb-5 bg-body rounded">
      <div className="tasks">
        <h2>Your Tasks</h2>
        <div>
          <input
            value={dateTask}
            onChange={inputHandle}
            onClick={dateBtn}
            type="date"
            className="date"
          />

          <Button className="" onClick={refreshBtn}>
            Refresh
          </Button>
        </div>
      </div>
      <table className="table shadow-sm p-3 mb-5 bg-body rounded-3">
        <thead className="table-warning">
          <tr>
            <th scope="col">Sno.</th>
            <th scope="col">Task</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((element, i) => {
            if (dateTask === element.date) {
              return (
                <tr
                  className={`${
                    0 == i % 2 ? "table-Warning" : "table-success"
                  } `}
                  key={i}
                >
                  <th scope="row">{(num = num + 1)}</th>
                  <td
                    style={{ textTransform: "capitalize", fontSize: "1.1rem" }}
                  >
                    {element.title}
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {`${element.hour} `}
                    <span style={{ fontWeight: "300" }}>hour</span>
                  </td>
                  <td>
                    <Button
                      color={`${element.status ? "success" : "error"}`}
                      variant="contained"
                      className=""
                      style={{ textTransform: "capitalize" }}
                      onClick={async () => {
                        const { status } = element;
                        console.log(status);
                        const res = await fetch(
                          `http://localhost:5000/api/v1/tasks/updatenote/${element._id}`,
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              "auth-token": a.authToken,
                            },
                            body: JSON.stringify({ status }),
                          }
                        );
                        const json = await res.json();
                        console.log(json);
                        refreshBtn();
                      }}
                    >
                      {element.status ? "Done" : "Pending"}
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;
