import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../redux-store/mailSlice";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

import { useHistory } from "react-router-dom";

import axios from "axios";

const Inbox = () => {
  const email = useSelector((state) => state.auth.email);
  const receivedMails = useSelector((state) => state.mail.receivedMails);
  const sentMails = useSelector((state) => state.mail.sentMails);

  const [readCount, setReadCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch received emails and dispatch to store
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

  return (
    <Tabs defaultActiveKey="received" id="inbox-tabs">
      <Tab eventKey="received" title="Received">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Received Mails</h4>
          <div>
            <Badge variant="secondary" className="mr-2">
              Read:{readCount}
            </Badge>
            <Badge variant="info">Unread: {receivedMails.length - readCount} </Badge>
          </div>
        </div>
        {receivedMails.length === 0 ? (
          <p style={{ padding: "1rem" }}>No new Mails</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Status</th>
                <th>From</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {receivedMails.map((mail) => (
                <tr
                  key={mail.id}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleMailClick(mail.id);
                  }}
                >
                  <td>
                    <Badge bg="primary">{mail.isRead ? "": "Unread"}</Badge>
                  </td>
                  <td>{mail.from}</td>
                  <td>{mail.subject}</td>
                  <td>{mail.body}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(mail.id)}
                    >
                      Delete Mail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Tab>
      <Tab eventKey="sent" title="Sent">
        {sentMails.length === 0 ? (
          <p style={{ padding: "1rem" }}>No New Mails</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>To</th>
                <th>Subject</th>
                <th>Body</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {sentMails.map((mail) => (
                <tr
                  key={mail.id}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => handleMailClick(mail.id)}
                >
                  <td>{mail.to}</td>
                  <td>{mail.subject}</td>
                  <td>{mail.body}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(mail.id)}
                    >
                      Delete Mail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Tab>
    </Tabs>
  );
};

export default Inbox;
