import { createContext, useReducer} from "react";
import "./Styles/App.scss";
import InputBar from "./Components/InputBar";
import TodosList from "./Components/TodosList";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  TOGGLE_AS_DONE: "done-todo",
  ADD_TO_CATEGORY_TODO: "add-to-category",
  EDIT_TODO: "edit-todo",
  CLEAR_TODO: "clear-todo",
};


function reducer(todos, action) {
  switch (action.type) {

    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.inputText)];
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
        return []
      break;
      case ACTIONS.EDIT_TODO:
        console.log(action.payload.id)
      break;
        break;
  }
}

function newTodo(user_input) {
  return {
    id: Date.now(),
    context: user_input,
    isComplete: true,
    category: ["Personal"],
  };
}



export const dispatchContext = createContext(null)



function App() {
  const [todos, dispatch] = useReducer(reducer, []);
   


  function handleCreateTodo(inputText) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { inputText } });
  }

  console.log(todos);

  return (
    <>
    <dispatchContext.Provider value={dispatch}>
            <InputBar onCreate={handleCreateTodo}/>
      {todos && <TodosList todos={todos}/>}
    </dispatchContext.Provider>
    </>
  );
}

export default App;
