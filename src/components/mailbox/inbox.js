import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../redux-store/mailSlice";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import  Button  from "react-bootstrap/Button";

import axios from "axios";

const Inbox = () => {
    const email = useSelector((state) => state.auth.email)
  const { receivedMails, sentMails } = useSelector((state) => state.mail);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch received emails and dispatch to store
    axios.get(`https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
        /[.@]/g,
        ""
      )}/receivedMails.json`)
      .then((response) => 
       {
        const receivedMails = [];
        for (const key in response.data) {
          const mail = {
            id: key,
            ...response.data[key],
          };
          receivedMails.push(mail);
        }
        dispatch(mailActions.addReceivedMail(receivedMails));
      })
      .catch((error) => console.log(error));

    // Fetch sent emails and dispatch to store
    axios.get(`https://mailbox-sharpener-default-rtdb.firebaseio.com/${email.replace(
        /[.@]/g,
        ""
      )}/sentMails.json`)
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
  }, [dispatch, email]);

  

  return (
    <Tabs defaultActiveKey="received" id="inbox-tabs">
      <Tab eventKey="received" title="Received">
        {receivedMails.length ===0 ? (
          <p style={{padding: '1rem'}}>No new Mails</p>
        ) : (
          receivedMails.map((mail) => (
            <div
              key={mail.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <p>{mail.from}</p>
              <p>{mail.subject}</p>
              <p>{mail.body}</p>
              <Button variant="danger">Delete Mail</Button>
            </div>
          ))
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent">
        {sentMails.length === 0 ? (
          <p style={{padding: '1rem'}}>No New Mails</p>
        ) : (
          sentMails.map((mail) => (
            <div
              key={mail.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "1rem",
              }}
            >
              <p>{mail.to}</p>
              <p>{mail.subject}</p>
              <p>{mail.body}</p>
              <Button variant="danger"> Delete Mail </Button>
            </div>
          ))
        )}
      </Tab>
    </Tabs>
  );
};

export default Inbox;

  