import axios from "axios";
import { setAllSpaces } from "./slice";

const URL = "http://localhost:4000";

// Feature 1 :  get all spaces from the Api
export async function fetchSpaces(dispatch, getState) {
  try {
    const spacesResponse = await axios.get(`${URL}/spaces`);
    const spaces = spacesResponse.data;
    console.log("spaces response:", spaces);
    dispatch(setAllSpaces(spaces));
  } catch (e) {
    console.log(e.message);
  }
}
