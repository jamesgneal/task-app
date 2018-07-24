import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import API from "./utils/API";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      loggedIn: false,
      tasks: [],
      title: "",
      details: "",
      dueDate: "",
      redirectTo: ""
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

  // ====================== Task methods ======================
  loadTasks = username => {
    API.getTasks(username).then(res => {
      this.setState({
        tasks: res.data
      });
    });
  };

  handleNewTask = event => {
    event.preventDefault();
    API.newTask(
      this.state.title,
      this.state.details,
      this.state.dueDate,
      this.state.username
    )
      .then(response => {
        const cleanResponse = JSON.stringify(response.data, null, 4);
        console.log(`\n\n${cleanResponse}\n\n`);
        this.loadTasks(this.state.username);
      })
      .catch(e => {
        console.log(e);
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
        this.loadTasks(response.data.user.username);
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
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <Login updateUser={this.updateUser} user={this.state.username} />
            )}
          />
          <Route exact path="/signup" render={() => <Register />} />
          <Route
            exact
            path="/logout"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route
            path="/home"
            render={() => (
              <div>
                <h1>My Tasks</h1>
                {this.state.tasks.length ? (
                  <ul>
                    {this.state.tasks.map((task, index) => (
                      <li key={`${task.title}-${index}`}>
                        {task.title}
                        <p>{task.details}</p>
                        <p>{task.due}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks</p>
                )}
                <Link to="/home/new">new task</Link>
              </div>
            )}
          />
          <Route
            exact
            path="/home/new"
            render={() => (
              <div>
                <form>
                  <label htmlFor="task-title">Title</label>
                  <input
                    type="text"
                    id="task-title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="task-details">Details</label>
                  <input
                    type="text"
                    id="task-details"
                    name="details"
                    value={this.state.details}
                    onChange={this.handleInputChange}
                  />
                  <label htmlFor="task-due">Due</label>
                  <input
                    type="text"
                    id="task-due"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.handleInputChange}
                  />
                  <button onClick={this.handleNewTask} type="submit">
                    Save Task
                  </button>
                </form>
              </div>
            )}
          />
        </div>
      );
    }
  }
}

export default App;
