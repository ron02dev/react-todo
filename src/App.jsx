import { createContext, useEffect, useReducer, useState } from "react";
import "./Styles/App.scss";
import InputBar from "./Components/InputBar";
import TodosList from "./Components/TodosList";
import FilterBar from "./Components/FilterBar";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_AS_DONE: "done-todo",
  EDIT_TODO: "edit-todo",
  CLEAR_TODO: "clear-todo",
  LOAD_TODO: "load-save",
  SUBMIT_EDIT: "submit-edit",
  FILTER_TODO: "filter-todo",
};

export const todoUrgency = [
  { value: "low", label: "Can Wait 🟢" },
  { value: "normal", label: "Needs Attention 🟠" },
  { value: "urgent", label: "Handle Immediately 🔴" },
];

export const todoCategory = [
  {
    value: "personal",
    label: "Personal 👨🏻",
  },
  { value: "home", label: "Home 🏠" },
  { value: "work", label: "Work 💼" },
  { value: "others", label: "Others 👽" },
];

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
      localStorage.clear();
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
          console.log("fired", action.payload);
          return {
            ...todo,
            isEditActive: !todo.isEditActive,
            ...action.payload,
          };
        }
        return todo;
      });
    case ACTIONS.LOAD_TODO:
      return action.payload;
      break;
  }
}

export const globalDispatch = createContext(null);
function App() {
  
  const [todos, dispatch] = useReducer(reducer, []);
  const [filterTodo, setFilterTodo] = useState();

    useEffect(()=>{

      if(todos.length){
        localStorage.clear()
      localStorage.setItem('todos',JSON.stringify(todos))
     console.log(JSON.parse(localStorage.getItem('todos')))
      }

    },[todos])

    useEffect(()=>{

      const getLocalTodo = JSON.parse(localStorage.getItem('todos')) || null

      if(getLocalTodo){
        const newTodos = getLocalTodo.map((item)=>{
            return item
      })
      console.log(newTodos)
       newTodos && dispatch({ type: ACTIONS.LOAD_TODO, payload: getLocalTodo });
      console.log(getLocalTodo)
      }
  console.log(todos);
    },[])

  function handleFilter(todoPriority, todoCategory) {
    const filter = [todoPriority, todoCategory];

    console.log("🚀 ~ handleFilter ~ filter:", filter);

    setFilterTodo(filter);
  }

  return (
    <>
    <header><h1 className="todo__header-title">📌Todo App </h1></header>
      <globalDispatch.Provider value={dispatch}>
      
          <InputBar todos={todos} />
          
        <main className="main__todo-list">
                   <FilterBar handleFilter={handleFilter} />
                   <TodosList filterTodo={filterTodo} todos={todos} />
        </main>
      </globalDispatch.Provider>
    </>
  );
}

export default App;
