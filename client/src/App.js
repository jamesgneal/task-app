import React, { Component } from "react";
import { Route } from "react-router-dom";
import API from "./utils/API";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      loggedIn: false
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // ====================== User methods ======================
  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("/api/user/").then(response => {
      if (response.data.user) {
        console.log(
          `getUser found a user saved in the server session: ${
            response.data.user
          }`
        );
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
        this.loadUserPins(response.data.user.username);
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <Login
              updateUser={this.updateUser}
              user={this.state.username}
            />
          )}
        />
        <Route exact path="/signup" render={() => <Register />} />
        <Route
          exact
          path="/logout"
          render={() => <Login updateUser={this.updateUser} />}
        />
        <Route
          exact
          path="/home"
          render={() => (
            <div>
              <h1>My Tasks</h1>
              <p>
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
