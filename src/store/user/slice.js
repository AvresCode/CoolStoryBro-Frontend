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

    deleteStory : (state, action) => {
      console.log("delete action", action.payload);
      const id = action.payload;
      const updatedStories = state.profile.space.stories.filter((story) => story.id !== id);
      state.profile.space.stories = updatedStories;
    }


  },
});

export const { loginSuccess, logOut, tokenStillValid, deleteStory } = userSlice.actions;

export default userSlice.reducer;
