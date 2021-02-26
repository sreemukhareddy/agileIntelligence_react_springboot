import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import * as backlogActions from "../../actions/backlogActions";
import * as projectActions from "../../actions/projectActions";

class ProjectBoard extends Component {
  state = {
    errors: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklogAction(id);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.errors) {
    //   this.setState({
    //     errors: this.props.errors,
    //   });
    // }
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    console.log(
      "prevProps from componentDidUpdate of ProjectBoard ",
      prevProps
    );
    console.log(
      "currentProps from componentDidUpdate of ProjectBoard ",
      this.props
    );
    //this.props.getBacklogAction(id);
  }

  componentWillUnmount() {
    this.props.clearProjectAction();
  }

  render() {
    const { id } = this.props.match.params;
    const { project_tasks } = this.props.backlog;
    const { errors } = this.props;
    let boardContent;

    const boardAlgo = (errors, project_tasks) => {
      if (project_tasks.length < 1) {
        if (errors.projectIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.projectIdentifier}
            </div>
          );
        } else {
          return (
            <div className="alert alert-info text-center" role="alert">
              No Project Tasks Found For This Project
            </div>
          );
        }
      } else {
        return <Backlog project_tasks_prop={project_tasks} />;
      }
    };

    boardContent = boardAlgo(errors, project_tasks);

    return (
      <div className="container">
        <Link to={`/addProject/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBacklogAction: (backlogId) =>
      dispatch(backlogActions.getBacklogAndProjectTasks(backlogId)),
    clearProjectAction: () => dispatch(projectActions.clearProjectErrors()),
  };
};

const mapStateToProps = (state) => {
  return {
    backlog: state.backlog,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBoard);
