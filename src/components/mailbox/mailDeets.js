import React from "react";
import Button from "react-bootstrap/Button";
import { useLocation, useHistory } from "react-router-dom";

export default function MailDeets() {
  const location = useLocation();
  const history = useHistory();
  const { to, from, subject, body, type } = location.state;

  return (
    <div>
      <Button onClick={() => history.replace("/welcome")}>Back</Button>
      {type === "received" && <p>From: {from}</p>}
      {type === "sent" && <p>To: {to}</p>}
      <p>Subject: {subject}</p>
      <p>Body: {body}</p>
    </div>
  );
}
