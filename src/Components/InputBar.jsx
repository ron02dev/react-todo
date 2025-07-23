import { useState } from 'react'
import './Styles/Components.scss'
function InputBar({onCreate,onDeleteAll}) {

    const [input,setInput] =useState('')


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
                <button className='clr-btn' onClick={onDeleteAll}>Clear Todo</button>
            </section>
        </div>
    )
}

export default InputBar
