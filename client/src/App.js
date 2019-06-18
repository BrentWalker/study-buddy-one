// App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AllUsers from "./components/user-list.component";
import AllTechnologies from "./components/technology-list.component";
import AllCategories from "./components/category-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container jumbotron">
          <nav className="navbar navbar-expand-lg navbar bg-dark">
            <Link to="/" className="navbar-brand">
              <h2>Study Buddy</h2>
            </Link>
            <div className="navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/users" className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/technologies" className="nav-link">
                    Technologies
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/categories" className="nav-link">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          
          <Route path="/users" component={AllUsers} />
          <Route path="/technologies" component={AllTechnologies} />
          <Route path="/categories" component={AllCategories} />
        </div>
      </Router>
    );
  }
}

export default App;
