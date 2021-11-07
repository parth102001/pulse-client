import "./App.css";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import TaskState from "./context/TaskState";

function App() {
  return (
    <div className="App">
      <TaskState>
        <Navbar />
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </TaskState>
    </div>
  );
}

export default App;
