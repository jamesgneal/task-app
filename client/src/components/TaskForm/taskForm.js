import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class LoginForm extends Component {
  render() {
    return (
      <div>
        <form id="form-mainbox">
          <h3>Tasks</h3>
          <div>
            <label htmlFor="username">USERNAME</label>
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
            <label htmlFor="password">PASSWORD</label>
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
          <button onClick={this.handleSubmit} type="submit">
            Log In
          </button>
          <br />
          <a href="/signup">Not a member? Register here.</a>
        </form>
      </div>
    );
  }
}

export default LoginForm;
