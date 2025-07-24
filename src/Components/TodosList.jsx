import { useState, useContext, useRef, useEffect } from "react";
import "./Styles/Components.scss";
import { ACTIONS } from "../App";
import { globalDispatch } from "../App";

function TodosList({ todos }) {
  const dispatch = useContext(globalDispatch);

  const handleEditTodo = (selected_id) => {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: selected_id } });
  };

  return (
    <main className="">
      <ul className="todo__list-container">
        {todos.map((object, id) => {
          console.log(object.isComplete)
          return (
            <li key={id}>
              {object.isEditActive == false && (
                <div className="todo__item">
                  <div className="todo__header-container">
                    <section className="todo__controls-container">
                      <input
                        className="todo__input-checkbox"
                        type="checkbox"
                        defaultChecked={object.isComplete}
                      />
                      <button
                        onClick={() => {
                          handleEditTodo(object.id);
                        }}
                      >
                        🛠️
                      </button>
                    </section>
                   
                    <p className={`todo__title ${object.isComplete == true && 'complete'}`}>{object.todoTitle}</p>
                  </div>
                  <ul className="todo__type-container">
                    <li className="todo__priority">
                      Urgency: {object.todoPriority}
                    </li>
                    <li className="todo__category">
                      Category: {object.todoCategory}
                    </li>
                  </ul>
                </div>
              )}

              {object.isEditActive == true && <EditForm object={object} />}

            </li>
          );
        })}
      </ul>
    </main>
  );
}

function EditForm({ object }) {
  const dispatch = useContext(globalDispatch);
  const [input, setInput] = useState(object.todoTitle);


  const handleEditTodo = (event, selected_id) => {
    event.preventDefault();

    const todoTitle = event.target[0].value;
    const todoPriority = event.target[1].value;
    const todoCategory = event.target[2].value;

    dispatch({
      type: ACTIONS.SUBMIT_EDIT,
      payload: {
        id: selected_id,
        todoTitle,
        todoPriority,
        todoCategory,
      },
    });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          handleEditTodo(e, object.id);
        }}
        className="todo__form-edit"
      >
        <input
          ref={inputRef}
          type="text"
          className="todo__edit-input"
          onChange={(event) => {
            setInput(event.target.value);
          }}
          value={input}
        />
        <section className="form__section">
          <span>
            <select
              name="urgency"
              defaultValue={object.todoPriority}
              id="urgency"
            >
              <option value="Can Wait">Can Wait</option>
              <option value="Needs Attention">Needs Attention</option>
              <option value="Handle Immediately">Handle Immediately</option>
            </select>
          </span>
          <span>
            <select
              name="categories"
              defaultValue={object.todoCategory}
              id="categories"
            >
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Others">Others</option>
            </select>
          </span>
        </section>
        <button className="form__submit-btn">Save Edit</button>
      </form>
    </>
  );
}

export default TodosList;
