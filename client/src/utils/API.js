import axios from "axios";

export default {
    // monitor output
    newTask: (taskTitle, taskDetails, taskDueDate) => {
        console.log (`Title: ${taskTitle}\nDetails: ${taskDetails}\nDue: ${taskDueDate}`)
    
    // format data for model
    let taskObj = {
        title: taskTitle,
        details: taskDetails,
        due: taskDueDate,
        completed: false
    }

    // pass the formatted data to the server
    return axios.post(`/api/tasks`, taskObj)
    }
};