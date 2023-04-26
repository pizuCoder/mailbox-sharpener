import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../redux-store/mailSlice";
import axios from "axios";

export const useMailHooks = (email) => {
    const receivedMails = useSelector((state) => state.mail.receivedMails);
    const sentMails = useSelector((state) => state.mail.sentMails);
  
    const [readCount, setReadCount] = useState(0);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      // Fetch received emails and dispatch to store
      const useFetchMails = (email) => {
      axios
        .get(
          `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
            /[.@]/g,
            ""
          )}/receivedMails.json`
        )
        .then((response) => {
          const receivedMails = [];
  
          for (const key in response.data) {
            const mail = {
              id: key,
              ...response.data[key],
            };
            receivedMails.push(mail);
          }
          dispatch(mailActions.addReceivedMail(receivedMails));
          const readMails = receivedMails.filter((mail) => mail.isRead);
          setReadCount(readMails.length); //
        })
        .catch((error) => console.log(error));
  
      // Fetch sent emails and dispatch to store
      axios
        .get(
          `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
            /[.@]/g,
            ""
          )}/sentMails.json`
        )
        .then((response) => {
          const sentMails = [];
          for (const key in response.data) {
            const mail = {
              id: key,
              ...response.data[key],
            };
            sentMails.push(mail);
          }
          dispatch(mailActions.addSentMail(sentMails));
        })
        .catch((error) => console.log(error));
    }
    return { readCount, receivedMails, sentMails }
}, [dispatch, email]);
  
    const history = useHistory();
  
    const handleMailClick = (mailId) => {
      const receivedMail = receivedMails.find((mail) => mail.id === mailId);
  
      if (receivedMail) {
        axios
          .put(
            `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
              /[.@]/g,
              ""
            )}/receivedMails/${mailId}/isRead.json`,
            true // Set isRead to true
          )
          .then((response) => {
            dispatch(mailActions.markMailasRead(mailId));
            // Increment readCount by 1
            setReadCount((prevReadCount) => prevReadCount + 1);
          })
          .catch((error) => console.log(error));
        history.push({
          pathname: `/mail/${mailId}`,
          state: {
            from: receivedMail.from,
            subject: receivedMail.subject,
            body: receivedMail.body,
            type: "received",
          },
        });
      } else {
        const sentMail = sentMails.find((mail) => mail.id === mailId);
        history.push({
          pathname: `/mail/${mailId}`,
          state: {
            to: sentMail.to,
            subject: sentMail.subject,
            body: sentMail.body,
            type: "sent",
          },
        });
      }
    };
    const handleDeleteClick = (mailId) => {
      const receivedMail = receivedMails.find((mail) => mail.id === mailId);
      const sentMail = sentMails.find((mail) => mail.id === mailId);
      if (receivedMail) {
        axios
          .delete(
            `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
              /[.@]/g,
              ""
            )}/receivedMails/${mailId}.json`
          )
          .then((response) => {
            dispatch(mailActions.deleteReceivedMail(mailId));
          })
          .then((error) => console.log(error));
      }
      if (sentMail) {
        axios
          .delete(
            `https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
              /[.@]/g,
              ""
            )}/sentMails/${mailId}.json`
          )
          .then((response) => {
            dispatch(mailActions.deleteSentMail(mailId));
          })
          .catch((error) => console.log(error));
      }
    };

   
}