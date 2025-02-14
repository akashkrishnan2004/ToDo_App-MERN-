// import { useEffect, useState } from "react";
// import "./home.css";
// import API_URL from "./apiConnection";
// import axios from "axios";

// export default function Home() {
//   const [todos, setTodos] = useState([]);

//   const [newTodo, setNewTodo] = useState();

//   //   useEffect(() => {
//   //     const fetchTodo = () => {
//   //       axios
//   //         .get(`${API_URL}/get-todo`)
//   //         // .then((result) => setTodos(result))
//   //         .catch((error) => console.log(error));
//   //     };
//   //     fetchTodo();
//   //   }, []);

//   const fetchTodo = () => {
//     axios
//       .get(`${API_URL}/get-todo`)
//       .then((result) => {
//         console.log("API Response:", result.data); // ✅ Debug API response
//         setTodos(result.data.data || []); // ✅ Ensure todos is always an array
//       })
//       .catch((error) => console.log("Error fetching todos:", error));
//   };
//   useEffect(() => {
//     fetchTodo();
//   }, []);

//   const handleInputChange = (event) => {
//     setNewTodo(event.target.value);
//   };

//   //   const handleAdd = () => {
//   //     axios
//   //       .post(`${API_URL}/add-todo`, { newTodo: newTodo })
//   //       .then((result) => console.log(result))
//   //       .catch((error) => console.log(error));
//   //     console.log(`Todo -  ${newTodo}`);
//   //   };

//   const handleAdd = () => {
//     // if (!newTodo.trim()) {
//     //   alert("Todo cannot be empty!");
//     //   return;
//     // }

//     axios
//       .post(`${API_URL}/add-todo`, { todoDescription: newTodo }) // ✅ Fixed request body
//       .then((result) => {
//         console.log(result);
//         setNewTodo(""); // ✅ Clear input field
//         fetchTodo(); // ✅ Refresh todo list
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleEditTodo = () => {}

//   const handleDeleteTodo = () => {};

//   // //
//   // axios
//   //   .get(`${API_URL}/get-todo`, { todos: todos })
//   //   .then((result) => console.log(result))
//   //   .catch((error) => console.log(error)
//   //   )

//   return (
//     <div className="home">
//       <h1>Todo</h1>
//       <input
//         type="text"
//         placeholder="Enter todo"
//         onChange={handleInputChange}
//       />
//       <button type="button" onClick={handleAdd}>
//         Add
//       </button>
//       {todos.length === 0 ? (
//         <p>No todos</p>
//       ) : (
//         <ul>
//           {todos.map((todo, index) => (
//             <li key={index}>
//               {todo.todoDescription}
//               <div className="btns">
//                 <button onClick={handleEditTodo}>Edit</button>
//                 <button onClick={handleDeleteTodo}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import "./home.css";
import API_URL from "./apiConnection";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // Track which todo is being edited
  const [editText, setEditText] = useState(""); // Store edited text

  // Fetch todos
  const fetchTodo = () => {
    axios
      .get(`${API_URL}/get-todo`)
      .then((result) => {
        console.log("API Response:", result.data);
        setTodos(result.data.data || []); // Ensure todos is always an array
      })
      .catch((error) => console.log("Error fetching todos:", error));
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  // Handle input change for adding a todo
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // Add a new todo
  const handleAdd = () => {
    if (!newTodo.trim()) {
      alert("Todo cannot be empty!");
      return;
    }

    axios
      .post(`${API_URL}/add-todo`, { todoDescription: newTodo })
      .then(() => {
        setNewTodo("");
        fetchTodo();
      })
      .catch((error) => console.log(error));
  };

  // Set up editing mode
  const handleEditClick = (todo) => {
    setEditingTodo(todo._id);
    setEditText(todo.todoDescription);
  };

  // Update a todo
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

  // Delete a todo
  const handleDeleteTodo = (id) => {
    axios
      .delete(`${API_URL}/delete-todo/${id}`)
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
        Add
      </button>

      {todos.length === 0 ? (
        <p>No todos</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
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
                  {todo.todoDescription}
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
