import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null,
      errorMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
      if (this.props.user) {
          this.setState({
              redirectTo: "/home"
          })
      }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios
      .post("/api/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/home/pins"
          });
        }
      })
      .catch(error => {
        console.log(`login error:\n${error}`);
        this.setState({
          errorMessage:
            "Username and password not found. Please try again or sign up."
        });
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div>
          <form id="form-mainbox">
            <h1>Tasks</h1>
            <p>{this.state.errorMessage}</p>
            <div>
              <label htmlFor="username">
                USERNAME
              </label>
              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">
                PASSWORD
              </label>
              <div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <button
              onClick={this.handleSubmit}
              type="submit"
            >
              Log In
            </button>
            <br />
            <a href="/signup">
              Not a member? Register here.
            </a>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;
