import { useState, useContext, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Styles/Components.scss";
import { ACTIONS, todoCategory, todoUrgency } from "../App";
import { globalDispatch } from "../App";

function TodosList({ todos, filterTodo }) {
  const dispatch = useContext(globalDispatch);
  const [displayTodo, setDisplayTodo] = useState([]);

  const handleEditTodo = (selected_id) => {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: selected_id } });
  };

  const handleDeleteTodo = (selected_id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: selected_id } });
  };

  const handleToggleAsDoneTodo = (selected_id) => {
    dispatch({ type: ACTIONS.TOGGLE_AS_DONE, payload: { id: selected_id } });
  };

  useEffect(() => {
    if (filterTodo) {
      const priority_type = filterTodo[0];
      const category_type = filterTodo[1];

      if (priority_type !== "all" && category_type === "all") {
        const filteredTodo = todos.filter((item) => {
          if (item.todoPriority === priority_type) {
            return item;
          }
        });

        const filterByCompleted = filteredTodo.sort((a, b) => {
          if (a.isComplete && !b.isComplete) return -1;
          if (!a.isComplete && b.isComplete) return 1;
          return 0;
        });

        setDisplayTodo(filterByCompleted);
      } else if (category_type !== "all" && priority_type === "all") {
        const filteredTodo = todos.filter((item) => {
          if (item.todoCategory === category_type) {
            return item;
          }
        });
        const filterByCompleted = filteredTodo.sort((a, b) => {
          if (a.isComplete && !b.isComplete) return -1;
          if (!a.isComplete && b.isComplete) return 1;
          return 0;
        });

        setDisplayTodo(filterByCompleted);
      } else if (priority_type !== "all" && category_type !== "all") {
        const filteredTodo = todos.filter((item) => {
          if (
            item.todoPriority === priority_type &&
            item.todoCategory === category_type
          ) {
            return item;
          }
        });
        const filterByCompleted = filteredTodo.sort((a, b) => {
          if (a.isComplete && !b.isComplete) return -1;
          if (!a.isComplete && b.isComplete) return 1;
          return 0;
        });

        setDisplayTodo(filterByCompleted);
      } else if (priority_type == "all" && category_type == "all") {
        const filterByCompleted = todos.sort((a, b) => {
          if (a.isComplete && !b.isComplete) return -1;
          if (!a.isComplete && b.isComplete) return 1;
          return 0;
        });
        console.log("SORT BY COMPLETED", filterByCompleted);

        setDisplayTodo(filterByCompleted);
    
      } else {
        console.log("FILTER ERRO TODOLIST.JSX");
      }
    }
  }, [filterTodo]);

  useEffect(() => {
    const filterByCompleted = todos.sort((a, b) => {
      if (a.isComplete && !b.isComplete) return -1;
      if (!a.isComplete && b.isComplete) return 1;
      return 0;
    });
    setDisplayTodo(filterByCompleted);
  }, [todos]);

  return (
    <ul className="todo__list-container">
      {displayTodo.length ? (
        <TodoItem
          handleToggleAsDoneTodo={handleToggleAsDoneTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          displayTodo={displayTodo}
        />
      ) : (
        <TodoMessage />
      )}
    </ul>
  );
}

function TodoMessage() {
  return (
    <>
      <div className="todo__message-container">
        <h1 className="todo__h1-message">You're all caught up! 🎉</h1>
        <p className="todo__h1-message">
          <em>Add a new task when you're ready.</em>
        </p>
      </div>
    </>
  );
}

function TodoItem({
  displayTodo,
  handleEditTodo,
  handleDeleteTodo,
  handleToggleAsDoneTodo,
}) {
  return (
    <>
      {displayTodo.map((object, id) => {
        return (
          <li key={id}>
            {object.isEditActive == false && (
              <div className="todo__item">
                <section className="todo__controls-container">
                  <button
                    className="todo__edit-btn"
                    onClick={() => {
                      handleEditTodo(object.id);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="todo__delete-btn"
                    onClick={() => {
                      handleDeleteTodo(object.id);
                    }}
                  >
                    Delete
                  </button>
                </section>

                <div className="todo__header-container">
                  <p
                    onClick={() => {
                      handleToggleAsDoneTodo(object.id);
                    }}
                    className={`todo__title ${
                      object.isComplete == true && "complete"
                    }`}
                  >
                    {object.todoTitle}
                  </p>
                </div>
                <ul className="todo__type-container">
                  {todoUrgency.map((item, id) => {
                    return item.value === object.todoPriority ? (
                      <li key={id} className="todo__priority">
                        Priority: {item.label}
                      </li>
                    ) : (
                      ""
                    );
                  })}
                  {todoCategory.map((item, id) => {
                    return item.value === object.todoCategory ? (
                      <li key={id} className="todo__category">
                        Category: {item.label}
                      </li>
                    ) : (
                      ""
                    );
                  })}
                </ul>
              </div>
            )}

            {object.isEditActive == true && <EditForm object={object} />}
          </li>
        );
      })}
    </>
  );
}

function EditForm({ object }) {
  const dispatch = useContext(globalDispatch);
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  function onSubmit(data) {
    const id = Number(data.id);
    const todoTitle = data.todoTitle;
    const todoPriority = data.todoPriority;
    const todoCategory = data.todoCategory;
    console.log(data);
    dispatch({
      type: ACTIONS.SUBMIT_EDIT,
      payload: { id, todoTitle, todoPriority, todoCategory },
    });
  }


  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
       
        className="todo__form-edit"
      >
        <input type="hidden" {...register("id")} value={object.id} />
        <input
          type="text"
          className="todo__edit-input"
          defaultValue={object.todoTitle}
          {...register("todoTitle", {
            required: true,
            maxLength: 50,
            message: "required input",
          })}
        />
        <section className="form__section">
          <span>
            <select
              name="urgency"
              defaultValue={object.todoPriority}
              id="urgency"
              {...register("todoPriority")}
            >
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
            <select
              name="categories"
              defaultValue={object.todoCategory}
              id="categories"
              {...register("todoCategory")}
            >
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
        <button
          onSubmit={(e) => {
            handleEditTodo(e, object.id);
          }}
          className="form__submit-btn"
        >
          Save Edit
        </button>
      </form>
    </>
  );
}

export default TodosList;
