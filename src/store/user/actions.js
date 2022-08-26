import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import { appLoading, appDoneLoading, setMessage } from "../appState/slice";
import { showMessageWithTimeout } from "../appState/actions";
import { loginSuccess, logOut, tokenStillValid } from "./slice";
import { setAllSpaces } from "../spaces/slice";
import { deleteStory, addStory, editSpace } from "./slice";

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });
      console.log("response", response);
      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", true, "account created"));

      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(
        loginSuccess({ token: response.data.token, user: response.data.user })
      );
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      } else {
        console.log(error.message);
        dispatch(
          setMessage({
            variant: "danger",
            dismissable: true,
            text: error.response.data.message,
          })
        );
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid({ user: response.data }));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

// delete a story
export const deleteOneStory = (id) => async (dispatch, getState) => {
  try {
    //  console.log("here");
    const token = selectToken(getState());
    const response = await axios.delete(`${apiUrl}/spaces/story/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("delete response", response);
    dispatch(deleteStory(id));
    dispatch(showMessageWithTimeout("success", false, "Story deleted!", 4000));
  } catch (e) {
    console.log(e.message);
  }
};

//Add new story
export const postStoryThunk =
  (name, content, imageUrl) => async (dispatch, getState) => {
    try {
      console.log("addStory");
      const token = selectToken(getState());
      const spaceId = getState().user.profile.space.id;
      const response = await axios.post(
        `${apiUrl}/spaces/story`,
        {
          name,
          content,
          imageUrl,
          spaceId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("story response", response);
      dispatch(addStory(response.data.newStory));
      dispatch(showMessageWithTimeout("success", false, "Story added!", 4000));
    } catch (e) {
      console.log(e.message);
    }
  };

//Edit my space

export const editMySpace =
  (title, description, backgroundColor, color) =>
  async (dispatch, getState) => {
    try {
      console.log("EditSpace");
      const token = selectToken(getState());
      const id = getState().user.profile.space.id;
      const response = await axios.patch(
        `${apiUrl}/spaces/${id}`,
        { title, description, backgroundColor, color },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("edit response", response);
      dispatch(editSpace(response.data.space));
      dispatch(showMessageWithTimeout("success", false, "Edited successfully!", 4000));

    } catch (e) {
      console.log(e.message);
    }
  };
