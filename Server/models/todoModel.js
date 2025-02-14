import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
//   todoDescription: { type: "String", required: true },
    todoDescription: String,
});

const todoModel = mongoose.model("todos", todoSchema);

export default todoModel;
