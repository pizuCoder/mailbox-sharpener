import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receivedMails: [],
  sentMails: [],
  readCount: 0,
  unreadCount: 0,
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
    markMailAsRead(state, action) {
      const mailId = action.payload;
      const mail = state.receivedMails.find((mail) => mail.id === mailId);
      if (mail && !mail.isRead) {
        mail.isRead = true;
        state.readCount++;
        state.unreadCount--;
      }
    },
    deleteReceivedMail(state, action) {
      const mailId = action.payload;
      state.receivedMails = state.receivedMails.filter((mail) => mail.id !== mailId);
      if (!state.receivedMails.find((mail) => !mail.isRead)) {
        state.readCount = 0;
        state.unreadCount = 0;
      } else {
        state.readCount = state.receivedMails.filter((mail) => mail.isRead).length;
        state.unreadCount = state.receivedMails.length - state.readCount;
      }
    },
    deleteSentMail(state, action) {
      const mailId = action.payload;
      state.sentMails = state.sentMails.filter((mail) => mail.id !== mailId);
    },
    setReadCount(state, action) {
      state.readCount = action.payload;
    },
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice;
