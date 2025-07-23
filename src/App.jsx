import { useState } from "react";
import "./Styles/App.scss";
import InputBar from "./Components/InputBar";
import TodosList from "./Components/TodosList";
function App() {
  const [todos, setTodos] = useState([]);

  function handleCreate(newItem) {
    newItem && setTodos((todos)=>[...todos,newItem])
  }

  function handleDeleteAll() {
    setTodos([])
  }

  function handleDelete(event,_index) {
    event.preventDefault();
    const newArray = todos.filter((item,itemIndex)=>{
      console.log(itemIndex)
      return itemIndex !== _index
    })
   setTodos(newArray)
  }

  function handleEditTodo(event,index){
    event.preventDefault();
    const value = event.target.value
    const newArray = [...todos]
    newArray[index] = value
    setTodos(newArray)
  }

  return (
    <>
      <h1 className="app-title">Todos App</h1>
      <InputBar onCreate={handleCreate} onDeleteAll={handleDeleteAll} />

      <section className="item-list-container">
         {todos.length ? (
        <TodosList lists={todos} onDelete={handleDelete} onEditTodo={handleEditTodo} />
      ) : (
        <p>Add some items to your list to get started!</p>
      )}
      </section>
    </>
  );
}

export default App;
