import React, { useState } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";
import { useStore, useEvent } from "effector-react";
import { $todos, fetchTodosFx, insert } from "../src/model";

const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const todos = useStore($todos);
  console.log(todos);
  // const [todos, setTodos] = useState([]);
  const fetchEvent = useEvent(fetchTodosFx);

  React.useEffect(() => {
    // async function getData() {
    //   try {
    //     const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
    //     const data = await res.json();
    //     setTodos(data);
    //     console.log(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getData();
    fetchEvent(url);
  }, []);

  const addTask = (todoInput) => {
    if (!todoInput) return;
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title: todoInput,
      completed: false,
    };
    insert(newTodo);
    // setTodos([...todos, newTodo]);
  };

  // const removeTask = (id) => {
  //   //оставлем в todos только те элементы, у которых не id
  //   setTodos([...todos.filter((item) => item.id !== id)]);
  // };

  // const handleToggle = (id) => {
  //   setTodos([
  //     ...todos.map((item) =>
  //       item.id === id ? { ...item, completed: !item.completed } : { ...item }
  //     ),
  //   ]);
  // };

  return (
    <div className="App">
      <header>
        <h1>Список задач: {todos.length}</h1>
      </header>
      <ToDoForm addTask={addTask} />
      {todos.map((item) => (
        <ToDo
          key={item.id}
          todo={item}
          // toggleTask={handleToggle}
          // removeTask={removeTask}
        />
      ))}
    </div>
  );
}

export default App;
