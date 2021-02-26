import * as actionTypes from "../actions/types";

const initialState = {
  project_tasks: [],
  project_task: {},
};

export default function (state = initialState, action) {
  //newFunction();
  switch (action.type) {
    case actionTypes.GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload,
      };
    case actionTypes.GET_PROJECT_TASK:
      console.log("============>", action.payload);
      return {
        ...state,
        project_task: action.payload,
      };
    case actionTypes.DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (pt) => pt.projectSequence != action.payload
        ),
      };

    default:
      return state;
  }
  function newFunction() {
    console.log("backlog reducer start");
    console.log(
      "action that has been triggered is ",
      action.type,
      " & the payload is ",
      action.payload
    );
    console.log("backlog reducer end");
  }
}
