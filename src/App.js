import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthForm from "./components/Auth/AuthForm";
import Logout from "./components/Auth/Logout";

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
          <h1>Welcome to Your Mailbox</h1>
        </div>
      </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}
