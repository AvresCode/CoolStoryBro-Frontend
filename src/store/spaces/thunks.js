import axios from "axios";
import { setAllSpaces, setSpaceDetails } from "./slice";

const URL = "http://localhost:4000";

// Feature 1 :  get all spaces from the Api
export async function fetchSpaces(dispatch, getState) {
  try {
    const spacesResponse = await axios.get(`${URL}/spaces`);
    const spaces = spacesResponse.data;
   // console.log("spaces response:", spaces);
    dispatch(setAllSpaces(spaces));
  } catch (e) {
    console.log(e.message);
  }
}

// Feature 2 :  get space details by id from the Api
export  function fetchSpaceDetails(id) {
  return async function thunk(dispatch, getState) {
   
      const detailsResponse = await axios.get(`${URL}/spaces/${id}`);
      console.log("space detail response:", detailsResponse.data);
      const spaceDetail = detailsResponse.data
      dispatch(setSpaceDetails(spaceDetail))
   
  }
}