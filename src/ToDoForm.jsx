// import { useState } from "react";
import { useStore } from "effector-react";

import { $input, change } from "../src/model";

function ToDoForm({ addTask }) {
  // const [todoInput, setTodoInput] = useState("");
  const input = useStore($input);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTask(input);
    // setTodoInput("");
  };

  // const handleChange = (evt) => {
  //   setTodoInput(evt.target.value);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(evt) => change(evt.target.value)}
        placeholder="Введите задачу..."
      />
      <button>Сохранить</button>
    </form>
  );
}

export default ToDoForm;
