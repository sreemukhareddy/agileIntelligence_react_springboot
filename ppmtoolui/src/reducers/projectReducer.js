import * as actions from "../actions/types";

const initalState = {
  projects: [],
  project: {},
};

function newFunction(action, state) {
  console.log(
    "Coming from the projectReducer with the action type ",
    action.type,
    " and payload as ",
    action.payload,
    " the current state is ",
    state
  );
}

const reducer = (state = initalState, action) => {
  newFunction(action, state);
  switch (action.type) {
    case actions.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case actions.GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case actions.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => {
          return action.payload !== project.projectIdentifier;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
