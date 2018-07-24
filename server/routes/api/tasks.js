const router = require("express").Router();
const taskController = require("../../controllers/taskController");

// Matches with "/api/tasks"
router
  .route("/")
  .post(taskController.create);

// Matches with "/api/tasks/user"
router
  .route("/user")
  .post(taskController.findTasks);

// Matches with "/api/tasks/:id"
router
  .route("/:id")
  .get(taskController.findTasks)
  .put(taskController.update)
  .delete(taskController.remove);

module.exports = router;
