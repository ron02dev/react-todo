import { ACTIONS, todoCategory, todoUrgency } from "../App";
import { useState, useContext, useRef, useEffect} from "react";
import { globalDispatch } from "../App";
import {useForm} from "react-hook-form"
function FilterBar({handleFilter}) {


const { register, handleSubmit, watch, formState: { errors } } = useForm();


  const onSubmit = (data) => {

    const todoPriority = data.todoUrgency
    const todoCategory = data.todoCategory
    handleFilter(todoPriority,todoCategory)
    };

  return (
  
    <form className="todo__form-filter" onChange={handleSubmit(onSubmit)}>
      <select name="" {...register("todoUrgency")} id="">
        <option value="all">All</option>
        {todoUrgency.map((object,id)=>{

            return(<option key={id} value={object.value}>{object.label}</option>)
        })}
      </select>
    <select name="" {...register("todoCategory")} id="">
        <option value="all">All</option>
        {todoCategory.map((object,id)=>{

            return(<option key={id} value={object.value}>{object.label}</option>)
        })}
      </select>
    </form>
  );
}

export default FilterBar
