import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
  receivedMails: [],
  sentMails: [],
}

const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    addReceivedMail(state, action){
      state.receivedMails = state.receivedMails.concat(action.payload)
    },
    addSentMail(state, action){
      state.sentMails = state.sentMails.concat(action.payload)
    },
    deleteReceivedMail(state, action){

    },
    deleteSentMail(state, action){

    },
  }
})

export const mailActions = mailSlice.actions
export default mailSlice