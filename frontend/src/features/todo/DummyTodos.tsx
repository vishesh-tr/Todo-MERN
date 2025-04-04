import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTodo } from "./TodoReducer";
import Pagination from "../../components/Pagination";
import { Todo } from "../../features/user/Types";

const DummyTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [editText, setEditText] = useState<string>("");

  const todosPerPage: number = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();

      const formattedTodos: Todo[] = data.map((todo: any) => ({
        _id: String(todo.id),
        id: todo.id,
        text: todo.title || "",
        completed: todo.completed,
        userId: String(todo.userId),
        userEmail: "" // placeholder, not needed here
      }));

      setTodos(formattedTodos);
    } catch (error) {
      console.error("Error fetching dummy todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setEditText(todo.text || "");
  };

  const handleSaveEdit = () => {
    if (!editingTodo) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === editingTodo._id ? { ...todo, text: editText } : todo
      )
    );
    setEditingTodo(null);
    setEditText("");
  };

  const handleDeleteTodo = (id?: string) => {
    if (!id) return;
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const handleAddToMyTodos = async (todo: Todo) => {
    if (!loggedInUser) {
      alert("Please log in first!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4001/todo/create", {
        method: "POST",
        credentials: "include", // Send cookies (auth)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: todo.text,
          completed: todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo to backend");
      }

      const result = await response.json();

      alert("Todo added to your list!");
      dispatch(addTodo(result.newTodo));

    } catch (error) {
      console.error("Error adding todo to backend:", error);
      alert("Failed to add todo!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dummy Todos</h2>
        <button onClick={() => navigate("/todo")} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          Back to Todos
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">User ID</th>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Completed</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTodos.map((todo) => (
                  <tr key={todo._id} className="border-t border-gray-300">
                    <td className="px-4 py-2">{todo.userId}</td>
                    <td className="px-4 py-2">{todo.id}</td>
                    <td className="px-4 py-2">
                      {editingTodo?._id === todo._id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="border border-gray-300 px-2 py-1 rounded"
                        />
                      ) : (
                        todo.text
                      )}
                    </td>
                    <td className="px-4 py-2">{todo.completed ? "✅" : "❌"}</td>
                    <td className="px-4 py-2 flex gap-2">
                      {editingTodo?._id === todo._id ? (
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditTodo(todo)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTodo(todo._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleAddToMyTodos(todo)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default DummyTodos;
