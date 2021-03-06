const router = require("express").Router();
const taskRoutes = require("./tasks");
const userRoutes = require("./user")

router.use("/tasks", taskRoutes)
router.use("/user", userRoutes)

module.exports = router;