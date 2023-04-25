import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receivedMails: [],
  sentMails: [],
  unread: 0,
  read: 0,
  isRead: false,
  lastReadMailId: null
};

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    addReceivedMail(state, action) {
      state.receivedMails = action.payload;
      const { read, unread } = action.payload.reduce(
        (counts, mail) => {
          if (mail.isRead) {
            counts.read++;
          } else {
            counts.unread++;
          }
          return counts;
        },
        { read: 0, unread: 0 }
      );
      state.read = read;
      state.unread = unread;
      // action.payload.forEach(mail => mail.isRead = false);
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
    updateReceivedMailIsRead(state, action) {
      const { id, isRead } = action.payload;
      const mailIndex = state.receivedMails.findIndex((mail) => mail.id === id);
      if (mailIndex >= 0) {
        state.receivedMails[mailIndex].isRead = isRead;
        state.unread += isRead ? -1 : 1;
    state.read += isRead ? 1 : -1;
      }
      if (isRead) {
        state.lastReadMailId = id;
      }
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice;
