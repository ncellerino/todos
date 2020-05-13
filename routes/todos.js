const express = require("express");
const router = express.Router();
import TodoController from "../controllers/todo.controller";
const auth = require("../tools/auth");

/* POST create todo. */
router.post("/", TodoController.insert);

/* GET get todos. */
router.get("/", TodoController.getAll);

/* PUT update todo. */
router.post("/", TodoController.update);

module.exports = router;
