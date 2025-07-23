import { useState, useContext } from "react";
import "./Styles/Components.scss";
import { ACTIONS } from "../App";
import { globalDispatch } from "../App";
// function InputBar({onCreate}) {

//     const [input,setInput] =useState('')
//    

//     const handleInput = (event)=>{
//         console.log(event.target.value)
//         setInput(event.target.value)
//     }

//     return (
//         <div className='input-container'>
//             <button>Create Task</button>
//             <form onSubmit={handleSubmit} >
//                 <input type="text"  onChange={handleInput} value={input} placeholder='Create a note...' />
//             </form>
//             <section>
//                 <button className='add-btn' onClick={handleSubmit}>Add Todo</button>
//                 <button className='clr-btn' onClick={()=>{dispatch({type:ACTIONS.CLEAR_TODO})}}>Clear Todo</button>
//             </section>
//         </div>
//     )
// }



 const dispatch = useContext(globalDispatch)


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
        New Task +
      </button>
      {isActive && <TodoForm onCreate={handleCreate} />}
    </div>
  );
}

function TodoForm({ onCreate }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const taskContext = event.target[0].value;
    const taskPriority = event.target[1].value;
    const taskCategory = event.target[2].value;

    const newTodo = {
      id: Date.now(),
      isComplete: false,
      taskContext,
      taskPriority,
      taskCategory
    };

    onCreate();

    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo__form">
      <input
        type="text"
        className="todo__input"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
      />
      <section className="form__section">
        <span>
          <p>Urgency</p>
          <select name="urgency" defaultValue={"low"} id="urgency">
            <option value="Can Wait">Can Wait</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Handle Immediately">Handle Immediately</option>
          </select>
        </span>
        <span>
          <p>Task Category</p>
          <select name="categories" defaultValue={"Personal"} id="categories">
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Others">Others</option>
          </select>
        </span>
      </section>
      <button className="form__submit-btn">Create Task</button>
    </form>
  );
}
export default InputBar;
