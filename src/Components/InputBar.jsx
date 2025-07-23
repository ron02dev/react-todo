import { useState,useContext } from 'react'
import './Styles/Components.scss'
import { ACTIONS } from '../App'
import { dispatchContext } from '../App'
function InputBar({onCreate}) {

    const [input,setInput] =useState('')
    const dispatch = useContext(dispatchContext)

    const handleInput = (event)=>{
        console.log(event.target.value)
        setInput(event.target.value)    
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(input)
    setInput('')
  };

    return (
        <div className='input-container'>
            <form onSubmit={handleSubmit} >
                <input type="text"  onChange={handleInput} value={input} placeholder='Create a note...' />
            </form>
            <section>
                <button className='add-btn' onClick={handleSubmit}>Add Todo</button>
                <button className='clr-btn' onClick={()=>{dispatch({type:ACTIONS.CLEAR_TODO})}}>Clear Todo</button>
            </section>
        </div>
    )
}

export default InputBar
