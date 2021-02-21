import "./App.css";
import DashBoard from "./components/DashBoard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";

function App() {
  return (
    <div className="App">
      <Header />
      <Route path="/dashboard" component={DashBoard} exact />
      <Route path="/addProject" exact={true} component={AddProject} />
      <Route path="/updateProject/:id" exact={true} component={UpdateProject} />
    </div>
  );
}

export default App;
