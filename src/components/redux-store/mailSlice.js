import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receivedMails: [],
  sentMails: [],
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addReceivedMail(state, action) {
      state.receivedMails = action.payload;
    },
    addSentMail(state, action) {
      state.sentMails = action.payload;
    },
    
    deleteReceivedMail(state, action) {
      const mailId = action.payload;
      state.receivedMails = state.receivedMails.filter((mail) => mail.id !== mailId);
    },
    deleteSentMail(state, action) {
      const mailId = action.payload;
      state.sentMails = state.sentMails.filter((mail) => mail.id !== mailId);
    },
    markMailasRead(state, action) {
      const mailId = action.payload;
      state.receivedMails = state.receivedMails.map((mail) =>
        mail.id === mailId ? { ...mail, isRead: true } : mail
      );
    },
  },
});


export const mailActions = mailSlice.actions;

export default mailSlice;
