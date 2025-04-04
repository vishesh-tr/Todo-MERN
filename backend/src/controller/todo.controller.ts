import { Request, Response } from "express";
import Todo from "../model/todo.model";
import { AuthenticatedRequest } from "../Types/types"; 

export const createTodo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const todo = new Todo({
      text: req.body.text,
      completed: req.body.completed,
      user: req.user?._id, 
    });

    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo creation" });
  }
};


export const getTodos = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user?._id });
    res.status(200).json({ message: "Todos Fetched Successfully", todos });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo fetching" });
  }
};

export const updateTodo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo Updated Successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo updating" });
  }
};

export const deleteTodo = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred in todo deletion" });
  }
};
