import { useState } from "react";

function ToDoForm({ addTask }) {
  const [todoInput, setTodoInput] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTask(todoInput);
    setTodoInput("");
  };

  const handleChange = (evt) => {
    setTodoInput(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoInput}
        onChange={handleChange}
        placeholder="Введите задачу..."
      />
      <button>Сохранить</button>
    </form>
  );
}

export default ToDoForm;
