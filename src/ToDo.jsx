function ToDo({ todo, toggleTask, removeTask }) {
  return (
    <div key={todo.id} className="item-todo">
      <div
        className={todo.completed ? 'item-text strike' : 'item-text'}
        onClick={() => toggleTask(todo.id)}
      >
        {todo.title}
      </div>
      <div className="item-delete" onClick={() => removeTask(todo.id)}>
        X
      </div>
    </div>
  );
}

export default ToDo;
