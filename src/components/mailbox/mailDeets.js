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
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Button
        variant="secondary"
        onClick={() => {
          history.replace("/welcome");
        }}
        style={{ marginBottom: "20px" }}
      >
        Back
      </Button>
      <div style={{ backgroundColor: "white", padding: "20px" }}>
        {type === "received" && <p style={{color: "black"}}>From: {from}</p>}
        {type === "sent" && <p style={{color: "black"}}>To: {to}</p>}
        <p style={{ fontWeight: "bold" , color: "black"}}>Subject: {subject}</p>
        <p style={{ whiteSpace: "pre-wrap" , color: "black"}}>{body}</p>
      </div>
    </div>
  );
}
