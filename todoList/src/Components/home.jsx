import { useEffect, useState } from "react";
import "./home.css";
import API_URL from "./apiConnection";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTodo = () => {
    axios
      .get(`${API_URL}/get-todo`)
      .then((result) => {
        console.log("API Response:", result.data);
        setTodos(result.data.data || []);
      })
      .catch((error) => console.log("Error fetching todos:", error));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAdd = () => {
    if (!newTodo.trim()) {
      toast.error("Todo cannot be empty!");
      return;
    }

    axios
      .post(`${API_URL}/add-todo`, { todoDescription: newTodo, completed: false })
      .then(() => {
        setNewTodo("");
        fetchTodo();
      })
      .catch((error) => console.log(error));
  };

  const handleEditClick = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.todoDescription);
  };

  const handleEditTodo = () => {
    if (!editText.trim()) {
      alert("Todo cannot be empty!");
      return;
    }

    axios
      .put(`${API_URL}/update-todo/${editingTodo}`, {
        todoDescription: editText,
      })
      .then(() => {
        setEditingTodo(null);
        setEditText("");
        fetchTodo();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${API_URL}/delete-todo/${id}`)
      .then(() => {
        fetchTodo();
      })
      .catch((error) => console.log(error));
  };

  const handleToggleComplete = (todo) => {
    axios
      .put(`${API_URL}/update-todo/${todo._id}`, {
        completed: !todo.completed,
      })
      .then(() => {
        fetchTodo();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="home">
      <h1>Todo</h1>
      <input
        type="text"
        placeholder="Enter todo"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleAdd}>
        Add Todo
      </button>

      {todos.length === 0 ? (
        <p>No todos</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo)}
              />
              {editingTodo === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={handleEditTodo}>Save</button>
                  <button onClick={() => setEditingTodo(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.todoDescription}
                  </span>
                  <div className="btns">
                    <button onClick={() => handleEditClick(todo)}>Edit</button>
                    <button onClick={() => handleDeleteTodo(todo._id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
