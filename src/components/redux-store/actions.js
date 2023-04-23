import { push, child } from "firebase/database";
import { mailActions } from "./mailSlice";
import { useSelector } from "react-redux";

export const sendMail = (sender, receiver, subject, body) => {
    
  return (dispatch) => {
    const { email} = useSelector((state) => state.auth);
    const sentAt = new Date().toISOString();
    const dbRef = `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
        /[.@]/g,
        ""
      )}.json`;
    const newMailRef = push(child(dbRef, "sent/" + sender), {
      sender: sender,
      receiver: receiver,
      subject: subject,
      body: body,
      sentAt: sentAt
    });
    const newMailId = newMailRef.key;

    push(
      child(dbRef, "received/" + receiver),
      {
        sender: sender,
        receiver: receiver,
        subject: subject,
        body: body,
        sentAt: sentAt
      },
      (error) => {
        if (error) {
          // handle error
        } else {
          dispatch(mailActions.addMail({ mailId: newMailId, sender, receiver, subject, body, sentAt }));
        }
      }
    );
  };
};
