import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as projectActions from "../../actions/projectActions";

class ProjectItem extends Component {
  render() {
    console.log("rendering projectitem");
    console.log("the props in render of projectitem.js ", this.props);
    const { project } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{project.projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{project.projectName}</h3>
              <p>{project.description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/projectBoard/${project.projectIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Project Board </i>
                  </li>
                </Link>
                <Link to={`updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={(event) =>
                    this.props.deleteProjectAction(
                      project.projectIdentifier,
                      this.props.history
                    )
                  }
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProjectAction: (id, history) =>
      dispatch(projectActions.deleteProject(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(ProjectItem);
