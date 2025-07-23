import { useContext } from "react";
import "./Styles/Components.scss";
import { ACTIONS } from "../App";
import { dispatchContext } from "../App";
function TodosList({todos}) {
 
  const dispatch = useContext(dispatchContext)
    
  return (
    <ul className="list-container">
      {todos.map((object, id) => {
        return <li key={id}>
            <form >
            <input  type="text" value={object.context} />
            <p>DETAILS: ID{object.id}, Complete:{object.isComplete.toString()}</p>
            <label htmlFor="check">Completed</label>
            {
           <Categories categories={object.category}/>
            }
           <input type="checkbox" name="check"  defaultChecked={object.isComplete.toString()} onClick={()=>{dispatch({type:ACTIONS.TOGGLE_AS_DONE, payload:{id:object.id}})}} />
            </form>
              <button onClick={()=>{dispatch({type: ACTIONS.DELETE_TODO, payload:{id:object.id}})}}>Delete</button>
        
        </li>;
      })}
    </ul>
  );
}



function Categories({categories}){
  const dispatch = useContext(dispatchContext)
        return (
          <ul className="category-list-container">
            {
              categories.map((item,id)=>{
               return( <li key={id}>
                <input disabled defaultChecked={true} type="checkbox" />
                <p>{item}</p>
               </li>)
              })
            }
            
            </ul>
        )
      
}


export default TodosList;
