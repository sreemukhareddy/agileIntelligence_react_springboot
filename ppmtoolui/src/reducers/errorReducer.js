import * as actions from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  newFunction();
  switch (action.type) {
    case actions.GET_ERRORS:
      return action.payload;
    case actions.CLEAR_ERRORS:
      return {};

    default:
      return state;
  }

  function newFunction() {
    console.log("error reducer start");
    console.log(
      "action that has been triggered is ",
      action.type,
      " & the payload is ",
      action.payload
    );
    console.log("error reducer end");
  }
}
