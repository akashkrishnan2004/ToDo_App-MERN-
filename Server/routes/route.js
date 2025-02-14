import express from "express";

import todoHandler from "../request-handlers/todoHandler.js"

const rourter = express.Router();

rourter.post("/add-todo", todoHandler.addTodo);

rourter.get("/get-todo", todoHandler.getTodo)

rourter.put("/update-todo/:id", todoHandler.updateTodo);

rourter.delete("/delete-todo/:id", todoHandler.deleteTodo)

export default rourter;
