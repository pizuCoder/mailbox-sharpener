import { createSlice } from "@reduxjs/toolkit";
import { sendMail } from "./actions";


const initialMailState = {
  mails: [],
};

const mailSlice = createSlice({
    name: "mail",
    initialState: initialMailState,
    reducers: {
      sendMail,
      addMail(state, action) {
        state.mails.push(action.payload);
      }
    }
  });

export const mailActions = mailSlice.actions;

export default mailSlice;
