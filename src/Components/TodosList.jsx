
import "./Styles/Components.scss";


function TodosList({todos}) {


  return (
  <main className="">
   <ul className="todo__list-container">
       {todos.map((object, id) => {
        return <li className="item" key={id}>
          <input type="text" defaultValue={object.taskTitle} />
      <section className="form__section">
        <span>
          
          <select name="urgency" defaultValue={object.taskPriority} id="urgency">
            <option value="Can Wait">Can Wait</option>
            <option value="Needs Attention">Needs Attention</option>
            <option value="Handle Immediately">Handle Immediately</option>
          </select>
        </span>
        <span>
          
          <select name="categories" defaultValue={object.taskCategory} id="categories">
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Others">Others</option>
          </select>
        </span>
      </section>
        </li>;
      })}
    </ul>
  </main>
  )
}

export default TodosList














// function TodosList({todos}) {
 
//   const dispatch = useContext(dispatchContext)
    
//   return (
//     <ul className="list-container">
//       {todos.map((object, id) => {
//         return <li key={id}>
//             <form >
//             <input  type="text" value={object.context} />
//             <p>DETAILS: ID{object.id}, Complete:{object.isComplete.toString()}</p>
//             <label htmlFor="check">Completed</label>
//             {
//            <Categories categories={object.category}/>
//             }
//            <input type="checkbox" name="check"  defaultChecked={object.isComplete.toString()} onClick={()=>{dispatch({type:ACTIONS.TOGGLE_AS_DONE, payload:{id:object.id}})}} />
//             </form>
//               <button onClick={()=>{dispatch({type: ACTIONS.DELETE_TODO, payload:{id:object.id}})}}>Delete</button>
        
//         </li>;
//       })}
//     </ul>
//   );
// }



// function Categories({categories}){
//   const dispatch = useContext(dispatchContext)
//         return (
//           <ul className="category-list-container">
//             {
//               categories.map((item,id)=>{
//                return( <li key={id}>
//                 <input disabled defaultChecked={true} type="checkbox" />
//                 <p>{item}</p>
//                </li>)
//               })
//             }
            
//             </ul>
//         )
      
// }


// export default TodosList;
