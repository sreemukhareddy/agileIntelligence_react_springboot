import * as actionTypes from "./types";
import axios from "axios";

import setJWTToken from "../SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const addProjectTask = (backLogId, newProjectTask, history) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
    }
    axios
      .post(`/api/backlog/${backLogId}`, newProjectTask, {
        timeout: 3000,
      })
      .then((response) => {
        history.push(`/projectBoard/${backLogId}`);
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: {},
        });
      })
      .catch((error) => {
        console.log("====================================================");
        console.log(error);
        //alert(error);
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
};

export const getBacklogAndProjectTasks = (backlogId) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
    }
    axios
      .get(`/api/backlog/${backlogId}`)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_BACKLOG,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
};

export const getProjectTaskRelatedToAbacklog = (
  backlogId,
  projectTaskId,
  history
) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
    }
    axios
      .get(`/api/backlog/${backlogId}/${projectTaskId}`)
      .then((response) => {
        console.log("getProjectTaskRelatedToAbacklog ", response.data);
        dispatch({
          type: actionTypes.GET_PROJECT_TASK,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        history.push(`/projectBoard/${backlogId}`);
      });
  };
};

export const updateProjectTask = (
  backlogId,
  projectTaskId,
  updatedProjectTask,
  history
) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
    }
    axios
      .put(`/api/backlog/${backlogId}/${projectTaskId}`, updatedProjectTask, {
        timeout: 3000,
      })
      .then((response) => {
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
          type: actionTypes.CLEAR_ERRORS,
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
};

export const deleteProjectTask = (backLogId, projectTaskId) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
    }
    axios.delete(`/api/backlog/${backLogId}/${projectTaskId}`).then((res) => {
      dispatch({
        type: actionTypes.DELETE_PROJECT_TASK,
        payload: projectTaskId,
      });
    });
  };
};
