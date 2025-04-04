import express, { Router, RequestHandler } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controller/todo.controller";
import { authenticate } from "../middleware/authorize";

const router: Router = express.Router();


router.post(
  "/create",
  authenticate as unknown as RequestHandler,
  createTodo as unknown as RequestHandler
);
router.get(
  "/fetch",
  authenticate as unknown as RequestHandler,
  getTodos as unknown as RequestHandler
);
router.put(
  "/update/:id",
  authenticate as unknown as RequestHandler,
  updateTodo as unknown as RequestHandler
);
router.delete(
  "/delete/:id",
  authenticate as unknown as RequestHandler,
  deleteTodo as unknown as RequestHandler
);

export default router;
