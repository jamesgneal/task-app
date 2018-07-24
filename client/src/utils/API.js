import axios from "axios";

export default {
  newTask: (taskTitle, taskDetails, taskDueDate, taskOwner) => {
    let taskObj = {
      title: taskTitle,
      details: taskDetails,
      due: taskDueDate,
      user: taskOwner,
      completed: false
    };
    return axios.post(`/api/tasks`, taskObj);
  },

  getTasks: (username) => {
      let userObj = {
          user: username
      }
      return axios.post("/api/tasks/user", userObj)
  }
};
