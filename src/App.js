import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import AuthForm from "./components/Auth/AuthForm";
import Logout from "./components/Auth/Logout";
import ComposeEmail from "./components/mailbox/composeEmail";
import  Button  from "react-bootstrap/Button";
import Inbox from "./components/mailbox/inbox";
import MailDeets from "./components/mailbox/mailDeets";
// import SentMailDeets from "./components/mailbox/sentMailDeets";

export default function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Switch>
      <Route exact path="/">
        <AuthForm />
      </Route>
      <Route exact path="/welcome">
        <div style={{ padding: "1rem" }}>
          <Logout />
          {/* <h1>Welcome to Your Mailbox</h1> */}
          <a href='/compose'> <Button>Compose email</Button></a>
          <div style={{padding: '1rem'}}>
          <Inbox />
          
          </div>
        </div>
      </Route>
      <Route exact path="/mail/:mailId" >
        <MailDeets />
      </Route>
      
      <Route path='/compose' >
        <ComposeEmail />
      </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}
