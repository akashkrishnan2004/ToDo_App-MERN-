import todoModel from "../models/todoModel.js";

const addTodo = async (req, res) => {
  try {
    const { todoDescription } = req.body;
    const data = new todoModel({ todoDescription });
    await data.save();
    res.status(200).json({ message: "Todo added successfully", data });
  } catch (error) {
    console.log("Todo not added");
    console.log(error);
  }
};

const getTodo = async (req, res) => {
  try {
    const data = await todoModel.find();
    res.status(200).json({ message: "All todos found", data });
  } catch (error) {
    console.log(error);
    console.log("Todos not found");
  }
};

const updateTodo = async (req, res) => {
  try {
    const data = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated successfully", data });
  } catch (error) {
    console.log("Todo not updated");
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const data = await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log("Todo not deleted");
    console.log(error);
  }
};

export default { addTodo, getTodo, updateTodo, deleteTodo };
