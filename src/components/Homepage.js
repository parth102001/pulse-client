import React from "react";
import AddTask from "./AddTask";
import Footer from "./Footer";
import Tasks from "./Tasks";

const Homepage = () => {
  // const authtoken = localStorage.getItem("token");
  return (
    <div>
      <AddTask />
      <Tasks />
      <Footer />
    </div>
  );
};

export default Homepage;
