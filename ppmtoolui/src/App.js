import "./App.css";
import DashBoard from "./components/DashBoard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/dashboard" component={DashBoard} exact />
      <Route path="/addProject" exact={true} component={AddProject} />
      <Route path="/updateProject/:id" exact={true} component={UpdateProject} />
      <Route path="/projectBoard/:id" exact={true} component={ProjectBoard} />
      <Route path="/addProject/:id" exact={true} component={AddProjectTask} />
      <Route
        path="/updateProjectTask/:backlog_id/:pt_id"
        exact={true}
        component={UpdateProjectTask}
      />
    </div>
  );
}

export default App;
