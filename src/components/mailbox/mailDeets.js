import React from "react";
import Button from "react-bootstrap/Button";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MailDeets() {
  const location = useLocation();
  const history = useHistory();
  const { to, from, subject, body, type, isRead } = location.state;
  
  // const unreadCount = useSelector((state) => state.mail.unread);
  // const readCount = useSelector((state) => state.mail.read);

  return (
    <div>
      <Button onClick={() => {history.replace("/welcome")
    console.log("readCount", isRead)
    // console.log("unread: ", unreadCount)
  }
    }>Back</Button>
      {type === "received" && <p>From: {from}</p>}
      {type === "sent" && <p>To: {to}</p>}
      <p>Subject: {subject}</p>
      <p>Body: {body}</p>
    </div>
  );
}
