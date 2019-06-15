// App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import User from "./components/User";
import UserList from "./components/UserList";
import Technology from "./components/Technology";
import Category from "./components/Category";
import MeetUpAPI from "./components/MeetUpAPI";

class App extends Component {
  render() {
    return (
      <Router>
        <Nav />

        <div>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/userslist" component={UserList} />
            <Route path="/userslist/:userId" component={User} />
            <Route exact path="/technology" component={Technology} />
            <Route path="/technology/:technologyId" component={Technology} />
            <Route exact path="/category" component={Category} />
            <Route path="/category/:categoryId" component={Category} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
