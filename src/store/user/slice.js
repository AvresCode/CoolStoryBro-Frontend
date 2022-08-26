import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },

    deleteStory: (state, action) => {
      console.log("delete action", action.payload);
      const id = action.payload;
      const updatedStories = state.profile.space.stories.filter(
        (story) => story.id !== id
      );
      state.profile.space.stories = updatedStories;
    },

    addStory: (state, action) => {
      console.log("add story action", action.payload);

      state.profile.space.stories.push({ ...action.payload });
    },

    editSpace: (state, action) => {
      console.log("Edit space action", action.payload);

      state.profile.space = {...state.profile.space, ...action.payload};
    },
  },
});

export const { loginSuccess, logOut, tokenStillValid, deleteStory, addStory, editSpace } =
  userSlice.actions;

export default userSlice.reducer;
