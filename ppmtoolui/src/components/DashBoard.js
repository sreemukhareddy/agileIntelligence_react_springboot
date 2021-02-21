import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { connect } from "react-redux";
import * as projectActions from "../actions/projectActions";
import * as actions from "../actions/types";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getProjectsAction();
  }

  render() {
    console.log("render DashBoard");
    console.log("render DashBoard props ", this.props);
    console.log(this.props.project);
    const { projects } = this.props.project;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
              <br />
              <hr />
              {projects &&
                projects.map((project) => {
                  return <ProjectItem project={project} key={project.id} />;
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.project,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectsAction: () => dispatch(projectActions.getProjects()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
