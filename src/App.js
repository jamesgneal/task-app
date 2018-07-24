import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import API from "./utils/API";
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>My Tasks</h1>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
