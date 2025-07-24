import { createContext, useReducer } from "react";
import "./Styles/App.scss";
import InputBar from "./Components/InputBar";
import TodosList from "./Components/TodosList";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_AS_DONE: "done-todo",
  EDIT_TODO: "edit-todo",
  CLEAR_TODO: "clear-todo",
  SUBMIT_EDIT: "submit-edit"
};

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, action.payload];
      break;

    case ACTIONS.TOGGLE_AS_DONE:
      return todos.map((todo) => {
        if (action.payload.id === todo.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
      break;

    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
      break;

    case ACTIONS.CLEAR_TODO:
      return [];
      break;

    case ACTIONS.EDIT_TODO:
      return todos.map((todo) => {
        if (action.payload.id === todo.id) {
          return { ...todo, isEditActive: !todo.isEditActive };
        }
        return todo;
      });
      break;
      case ACTIONS.SUBMIT_EDIT:
     return todos.map((todo) => {
        if (action.payload.id === todo.id) {
          return { ...todo, isEditActive: !todo.isEditActive,...action.payload };
        }
        return todo;
      });
  }
}

export const globalDispatch = createContext(null);

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
    // console.log(todos)
  return (
    <>
      <globalDispatch.Provider value={dispatch}>
        <InputBar />
        <TodosList todos={todos} />
      </globalDispatch.Provider>
    </>
  );
}

export default App;
