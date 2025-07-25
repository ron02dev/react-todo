import { useState, useContext, useEffect, useRef } from "react";
import "./Styles/Components.scss";
import { ACTIONS, todoCategory, todoUrgency } from "../App";
import { globalDispatch } from "../App";

function InputBar() {
  const [isActive, setIsActive] = useState(false);
  const handleCreate = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="input-bar-container">
      <button
        onClick={handleCreate}
        className={`todo__create-btn ${isActive == true && "hide"}`}
      >
        New Todo +
      </button>
      {isActive && <TodoForm onCreate={handleCreate} />}
    
    </div>
  );
}

function TodoForm({ onCreate }) {
  const [input, setInput] = useState("");
  const dispatch = useContext(globalDispatch);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const todoTitle = event.target[0].value || null;
    
    if (todoTitle) {
      const todoPriority = event.target[1].value;
      const todoCategory = event.target[2].value;

      const newTodo = {
        id: Date.now(),
        isComplete: false,
        isEditActive: false,
        todoTitle,
        todoPriority,
        todoCategory,
      };

      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });

  
    } else {
      console.log("focus lost");
      onCreate();
    }
    // SETS IS ACTIVE TO FALSE
    // ONCREATE DONT DELETE

    onCreate();
    setInput("");
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="todo__form">
      <input
        ref={inputRef}
        maxLength={30}
        type="text"
        className="todo__input"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
      />
      <section className="form__section">
        <span>
          <select name="urgency" defaultValue={"low"} id="urgency">
            {todoUrgency.map((object, id) => {
              return (
                <option key={id} value={object.value}>
                  {object.label}
                </option>
              );
            })}
          </select>
        </span>
        <span>
          <select name="categories" defaultValue={"personal"} id="categories">
            {todoCategory.map((object, id) => {
              return (
                <option key={id} value={object.value}>
                  {object.label}
                </option>
              );
            })}
          </select>
        </span>
      </section>
      <button className="form__submit-btn">Create Task</button>
    </form>
  );
}






export default InputBar;
