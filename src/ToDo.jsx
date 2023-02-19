import { remove, toggle } from "../src/model";

function ToDo({ todo }) {
  return (
    <div key={todo.id} className="item-todo">
      <div
        className={todo.completed ? "item-text strike" : "item-text"}
        onClick={() => toggle(todo.id)}
      >
        {todo.title}
      </div>
      <div className="item-delete" onClick={() => remove(todo.id)}>
        X
      </div>
    </div>
  );
}

export default ToDo;
