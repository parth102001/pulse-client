import React, { useState } from "react";
import TaskContext from "./TaskContext";
const TaskState = (props) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
  };
  const login = () => {
    setAuthToken(localStorage.getItem("token"));
  };
  return (
    <TaskContext.Provider value={{ logout, authToken, login }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
