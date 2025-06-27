import React, { useState, useEffect } from "react";
import { scanTodos, createTodo, deleteTodo } from "./dynamo.js";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    scanTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), text, completed: false };
    await createTodo(newItem);
    setTodos((prev) => [...prev, newItem]);
    setText("");
  };

  const handleDelete = async (id) => {
    try{
      await deleteTodo(id);
      setTodos(prev => prev.filter(item => item.id !== id))
    }
    catch (e){
      console.log('Error when deleting:', e)
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New todo"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleAdd}>Add</button>

{/* item = {
  id: '123456',
  text: 'i am a task',
  complete: false
} */}

      <ul style={{ marginTop: 16 }}>
        {todos.map((item) => (
          <li key={item.id}>{item.text}
            <button onClick={() => handleDelete(item.id)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
