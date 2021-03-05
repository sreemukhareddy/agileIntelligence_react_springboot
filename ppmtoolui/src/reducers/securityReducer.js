import * as actionTypes from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

export default function (state = initialState, action) {
  console.log(
    "Coming from the securityReducer with the action type ",
    action.type,
    " and payload as ",
    action.payload,
    " the current state is ",
    state
  );

  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload ? true : false,
        user: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        validToken: false,
        user: {},
      };
    default:
      return state;
  }
}
