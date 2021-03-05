import "./App.css";
import DashBoard from "./components/DashBoard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import LandingPage from "./components/Layout/LandingPage";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import { connect } from "react-redux";
import * as userManagementActions from "./actions/usermangementActions";
import { Component, useEffect } from "react";
import Logout from "./components/UserManagement/Logout";

class App extends Component {
  componentDidMount() {
    console.log("app.js component did mount, printing this.props");
    console.log(this.props);
    console.log(this.props.history);
    this.props.autoSignInaction(this.props.history);
  }

  render() {
    let content = (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <Redirect to="/" />
      </Switch>
    );
    const token = localStorage.getItem("jwtToken");
    let redirectcontent;
    if (token) {
      redirectcontent = <Redirect to="/dashboard" />;
      content = (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/logout" component={Logout} />

          <Route path="/dashboard" component={DashBoard} exact />
          <Route path="/addProject" exact={true} component={AddProject} />
          <Route
            path="/updateProject/:id"
            exact={true}
            component={UpdateProject}
          />
          <Route
            path="/projectBoard/:id"
            exact={true}
            component={ProjectBoard}
          />
          <Route
            path="/addProject/:id"
            exact={true}
            component={AddProjectTask}
          />
          <Route
            path="/updateProjectTask/:backlog_id/:pt_id"
            exact={true}
            component={UpdateProjectTask}
          />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Header />
        {redirectcontent}
        {content}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    autoSignInaction: (history) =>
      dispatch(userManagementActions.autoSignIn(history)),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.security,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
