import "./App.css";
import "tailwindcss/dist/tailwind.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import TokenCheck from "./components/TokenCheck";
import Home from "./pages/Home";
import Navbar from "./components/Home/Navbar";
import { useEffect } from "react";

// import { Client, Intents } from "discord.js";

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function App() {
  // useEffect(() => {
  //   client.once("ready", () => {
  //     console.log("Ready!");
  //   });
  // }, []);
  // client.login("NzQwOTM5MjgwMzkzODMwNDgw.XywTeg.453zmw0nLAvy1fQKvjP5i5U0dKA");
  return (
    // <></>
    <Router>
      <TokenCheck />
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
