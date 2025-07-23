import { useState,useContext } from 'react'
import './Styles/Components.scss'
// import { ACTIONS } from '../App'
// import { dispatchContext } from '../App'
// function InputBar({onCreate}) {

//     const [input,setInput] =useState('')
//     const dispatch = useContext(dispatchContext)

//     const handleInput = (event)=>{
//         console.log(event.target.value)
//         setInput(event.target.value)    
//     }

//     const handleSubmit = (event) => {
//     event.preventDefault();
//     onCreate(input)
//     setInput('')
//   };

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

function InputBar() {

    const [isActive,setIsActive] = useState(false)
    const handleCreate =()=>{
        setIsActive(!isActive)
    }


    return (
        <div className='input-bar-container'>
            <button onClick={handleCreate} className={`task-create-btn ${isActive == true && 'hide'}`}>New Task +</button>
             {isActive && <TodoForm/>}
        </div>
    )
}

function TodoForm(){
const [input,setInput] =useState('')
console.log(input)
return (
     <form action="">
        <textarea className='todo__input' onChange={(event)=>{setInput(event.target.value)}} defaultValue={input}  name="" id=""></textarea>

        <select name="categories" id="categories">
    <option value="" disabled selected hidden>Priority Level</option>
    <option value="Personal">Personal</option>
    <option value="Home">Home</option>
    <option value="Work">Work</option>
    <option value="Others">Others</option>
        </select>

        <select name="urgency" id="urgency">
            <option value="" disabled selected hidden>Priority Level</option>
    <option value="low">Can Wait</option>
    <option value="normal">Needs Attention</option>
    <option value="urgent">Handle Immediately</option>
        </select>
                </form>
)
}
export default InputBar
