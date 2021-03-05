import * as actionTypes from "./types";
import axios from "axios";
import setJWTToken from "../SecurityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUSer = (newUser, history) => {
  return (dispatch) => {
    axios
      .post("/api/users/register", newUser)
      .then((response) => {
        history.push("/");
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: {},
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

export const logOutIn = (timePeriod, history) => {
  alert("logout in " + timePeriod);
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut(history));
    }, timePeriod);
  };
};

export const login = (loginRequest, history) => {
  return (dispatch) => {
    axios
      .post("/api/users/login", loginRequest)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwt_decode(token); // all the claims that we put in backend security
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          payload: decoded,
        });
        dispatch(logOutIn(decoded.exp, history));
        history.push("/dashboard");
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.GET_ERRORS,
          payload: error.response.data,
        });
      });
  };
};

export const autoSignIn = (history) => {
  return (dispatch) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setJWTToken(token);
      const decoded = jwt_decode(token); // all the claims that we put in backend security
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded,
      });
      // history.push("/dashboard");
    }
  };
};

export const logOut = (history) => {
  alert("logout triggered");
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);
    dispatch({
      type: actionTypes.LOGOUT_USER,
    });
    if (history) {
      history.push("/");
    }
  };
};
