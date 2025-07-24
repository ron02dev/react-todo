import { useState } from "react";
import "./Styles/Components.scss";

function TodosList({ todos }) {


  const [isEditActive,setIsEditActive] = useState(false)

console.log(isEditActive)
  return (
    <main className="">
      <ul className="todo__list-container">
        {todos.map((object,id) => {
          console.log("is active?",isEditActive)
          return (
             
            <li key={id}>

            <div className="todo__item">
                <div className="todo__header-container">
               <section className="todo__controls-container">
                  <input 
                className="todo__input-checkbox" 
                type="checkbox"
                defaultChecked={object.isComplete}
                />
                <button onClick={()=>{setIsEditActive(!isEditActive)}}>🛠️</button> 
              </section>
              <p className="todo__title">{object.todoTitle}</p>
              </div>
              <ul className="todo__type-container">
                <li className="todo__priority">
                    Urgency: {object.todoPriority}
                </li>
                <li className="todo__category">
                   Category: {object.todoCategory}
                </li>
                </ul> 
              </div>

              
            </li>
             
         
          );
        })}
      </ul>
    </main>
  );
}



// function EditForm({object}){

//   return (
//     <>
//     <div className="edit-modal">
//               <section className="todo__input-container">

//                 <input 
//                 className="todo__input-checkbox" 
//                 type="checkbox"
//                 defaultChecked={object.isComplete}
//                 />
//                  <button onClick={()=>{setIsEditActive(!isEditActive)}}>🛠️</button> 
               
//               </section>
//               <section className="form__section">
//                 <select
//                   className="todo__select-urgency"
//                   name="urgency"
//                   defaultValue={object.taskPriority}
//                   id="urgency"
//                 >
//                   <option value="Can Wait">Can Wait</option>
//                   <option value="Needs Attention">Needs Attention</option>
//                   <option value="Handle Immediately">Handle Immediately</option>
//                 </select>

//                 <select
//                   className="todo__select-category"
//                   name="categories"
//                   defaultValue={object.taskCategory}
//                   id="categories"
//                 >
//                   <option value="Personal">Personal</option>
//                   <option value="Home">Home</option>
//                   <option value="Work">Work</option>
//                   <option value="Others">Others</option>
//                 </select>
//               </section>
//     </div>
//     </>
 

//   )

// }














export default TodosList;


