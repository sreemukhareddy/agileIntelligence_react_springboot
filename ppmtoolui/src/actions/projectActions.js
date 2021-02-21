import * as actions from "./types";

import axios from "axios";

// export const createProject = (project, history) => async (dispatch) => {
//   try {
//     const res = await axios.post("/api/project", project, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     history.push("/dashboard");
//   } catch (err) {
//     dispatch({
//       type: actions.GET_ERRORS,
//       payload: err.response.data,
//     });
//   }
// };

export const clearProjectErrors = () => {
  return (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERRORS,
    });
  };
};

export const createProject = (project, history) => {
  return (dispatch) => {
    axios
      .post("/api/project", project, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({
          type: actions.GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
};

export const getProjects = () => {
  return (dispatch) => {
    axios
      .get("/api/project")
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: actions.GET_PROJECTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        alert(error.response);
      });
  };
};

export const getProject = (projectId, history) => {
  return (dispatch) => {
    axios
      .get(`/api/project/${projectId}`)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: actions.GET_PROJECT,
          payload: response.data,
        });
      })
      .catch((error) => {
        //alert(error.response);
        history.push("/dashboard");
      });
  };
};

export const deleteProject = (projectId, history) => {
  return (dispatch) => {
    axios
      .delete(`/api/project/${projectId}`)
      .then((response) => {
        dispatch({
          type: actions.DELETE_PROJECT,
          payload: projectId,
        });
        //history.push("/dashboard");
      })
      .catch((error) => {
        alert("error in delete project action", error.response);
      });
  };
};
