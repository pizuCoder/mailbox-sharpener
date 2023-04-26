import React from "react";
import Button from "react-bootstrap/Button";
import { useLocation, useHistory } from "react-router-dom";


// import { mailActions } from "../redux-store/mailSlice";

export default function MailDeets() {

  // const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { to, from, subject, body, type } = location.state;
  
  
  return (
    <div>
      <Button onClick={() => {
        history.replace("/welcome")
    // console.log("readCount", isRead)
    
    // console.log("read: ", readCount)
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
