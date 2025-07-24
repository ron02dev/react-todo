import { useState, useContext, useRef, useEffect} from "react";
import {useForm} from "react-hook-form"
import "./Styles/Components.scss";
import { ACTIONS, todoCategory, todoUrgency } from "../App";
import { globalDispatch } from "../App";

function TodosList({ todos }) {
  const dispatch = useContext(globalDispatch);

  const handleEditTodo = (selected_id) => {
    dispatch({ type: ACTIONS.EDIT_TODO, payload: { id: selected_id } });
  };

  const handleDeleteTodo = (selected_id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: selected_id } });
  };

  const handleToggleAsDoneTodo = (selected_id) => {
    dispatch({ type: ACTIONS.TOGGLE_AS_DONE, payload: { id: selected_id } });
  };

  return (
    <main className="">
      <ul className="todo__list-container">
        {todos.map((object, id) => {
         
          return (
            <li key={id}>
              {object.isEditActive == false && (
                <div className="todo__item">
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
      </ul>
    </main>
  );
}

function EditForm({ object }) {
  const dispatch = useContext(globalDispatch);
  const {register,handleSubmit} = useForm({
        mode: "all",
      });

//  localStorage.clear()

 function onSubmit(data){

  const id = Number(data.id);
    const todoTitle =  data.todoTitle;
     const todoPriority = data.todoPriority;
     const todoCategory = data.todoCategory;
      console.log(todoTitle)
      console.log(data)
      dispatch({type: ACTIONS.SUBMIT_EDIT, payload: {id,todoTitle,todoPriority,todoCategory}})
 }

 function handleBlur(e){
    console.log(e)
 }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} onBlur={handleBlur} 
      className="todo__form-edit">
        <input type="hidden" {...register("id")}  value={object.id} />
        <input
          type="text"
          className="todo__edit-input"
          defaultValue={object.todoTitle}
          {...register("todoTitle",{
            required : true,
            maxLength: 30,
            message : "required input"
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
