import { useEffect, useState } from "react";
import './todoList.scss'

const TodoList = () => {
    interface objTodo {
        id: number,
        title: string
        completed: boolean
    }
   const todos = [
    {
        id: 1,
        title: "Изучить основы JavaScript",
        completed: false
    },
    {
        id: 2,
        title: "Сверстать TODO-приложение",
        completed: true
    },
    {
        id: 3,
        title: "Добавить возможность редактирования задачи",
        completed: false
    },
    {
        id: 4,
        title: "Реализовать фильтрацию по статусу",
        completed: false
    },
    {
        id: 5,
        title: "Настроить сохранение в localStorage",
        completed: false
    }
];

const [todo, setTodo] = useState(()=>{
    const newTodos = localStorage.getItem('my-todos')
    if(newTodos !== null){
        return JSON.parse(newTodos)
    }else{
        return todos
    }
});
const [inputValue, setInputValue] = useState('')

const takeValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setInputValue(e.target.value)
    
}
useEffect(()=>{
    localStorage.setItem('my-todos', JSON.stringify(todo))
},[todo])
const putNewTask = () =>{
    const newObj = {
        id: Date.now(),
        title: inputValue,
        completed: false
    }

    setTodo((prev: objTodo[])=>{
        return [...prev, newObj]
    })
 
    
    setInputValue('')
}
const deletTask = (id: number) =>{
    const newTodo = todo.filter((item:objTodo) =>{
        if(id !== item.id){
            return item
        }
    })
    setTodo(newTodo)
}
  return (
    <div className="todoList">
        <div className="todoList__container _container">
            <h1>Todo List</h1>
                <ul className="todolist__ul">
                {todo.map((item:objTodo)=>{
                    const {title,id} = item
                return (
                    <li key={id} className="todolist__li">{title} <button onClick={()=>deletTask(id)}>удалить</button></li>
                )
            })}
            </ul>
            <div className="todolist__block">
                <input onChange={(e)=>takeValue(e)} type="text" value={inputValue} />
                <button onClick={putNewTask}>Добавить</button>
            </div>
        </div>
    </div>
  );
}

export default TodoList