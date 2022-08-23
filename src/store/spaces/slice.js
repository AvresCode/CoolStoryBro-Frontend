import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allSpaces: null,
    spaceDetails: null,
    mySpace: null,
}

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
   setAllSpaces: (state, action) => {
      state.allSpaces = action.payload;
    },
    
  },
});

// remember to export the action creators for the new reducer cases
export const { setAllSpaces } = spaceSlice.actions;

export default spaceSlice.reducer;