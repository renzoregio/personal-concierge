import s from "./ToDos.module.css"
import {useState, useRef, useEffect} from "react"
import { BackToMain } from "../Home"

import fetch from 'isomorphic-unfetch';


import { faCheck, faCheckCircle, faTrash, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const getToDos = async() => {
    const res = await fetch("http://localhost:3000/api/todos");
    const { data } = await res.json();
    return data
}


const ToDos = ({ initialPending, initialCompleted }) => {
    console.log(initialPending)
    const [toDos, setToDos] = useState(initialPending)
    const [completedToDos, setCompletedToDos] = useState(initialCompleted)
    const textBox = useRef(null)
    const clickedPendingToDos = useRef([])
    const clickedCompletedToDos = useRef([])

    const updateToDos = async() => {
        const data = await getToDos();
        const pending = data.filter(toDo => !toDo.isCompleted)
        const completed = data.filter(toDo => toDo.isCompleted)

        setToDos(pending)
        setCompletedToDos(completed)
    }

    const addTask = async(e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3000/api/todos", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({task: textBox.current.value, isCompleted: false})
            })
        } catch (error) {
            console.log(error);
        }
        updateToDos();
        textBox.current.value = "";
    }

    const completeTask = async(id) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isCompleted: true })
            })
        } catch (error) {
            console.log(error)
        }

        updateToDos();
    }

    const deleteTask = async(id) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`,{
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
         console.log(error)   
        }

        updateToDos();
    }

    const returnTask = async(id) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isCompleted: false })
            })
        } catch (error) {
            console.log(error)
        }

        updateToDos();
    }

    return (
        <div className={s.container}>
            <div className={s.toDosContainer}>
                <div>
                    <h1 className={s.title}>add a to do</h1>
                    <form className={s.toDoForm}>
                        <input className={s.textBox} ref={textBox} type="text" />
                        <button className={s.submitBtn} onClick={(e) => addTask(e)}>
                            <FontAwesomeIcon size="2x" icon={faCheckCircle}/>
                        </button>
                    </form>
                    <div className="toDoMainContainer">
                        { toDos.map((toDo, i) => (
                            <div className={s.toDoContainer} key={i}>
                                <span ref={refElement => clickedPendingToDos.current[i] = refElement}  className={s.toDoText}>{toDo.task}</span>
                                <FontAwesomeIcon onClick={() => completeTask(toDo._id)} size="2x" className={`${s.icon} ${s.checkIcon}`} icon={faCheck}/>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                <h1 className={s.title}>{completedToDos.length > 0 ? "completed tasks" : "no completed tasks"}</h1>

                {completedToDos.length > 0 && (
                    <div> 
                    { completedToDos.map((toDo, i) => (
                        <div className={s.toDoContainer} key={i}>
                            <span ref={refElement => clickedCompletedToDos.current[i] = refElement} className={`${s.toDoText} ${s.completed}`}>{toDo.task}</span>
                            <FontAwesomeIcon size="2x" onClick={() => deleteTask(toDo._id)} className={`${s.icon} ${s.trashIcon}`} icon={faTrash} />
                            <FontAwesomeIcon size="2x" onClick={() => returnTask(toDo._id)} className={`${s.icon} ${s.historyIcon}`} icon={faHistory} />
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
            <BackToMain />
        </div>
    )
}

ToDos.getInitialProps = async() => {
    const data = await getToDos();
    const pending = data.filter(toDo => !toDo.isCompleted)
    const completed = data.filter(toDo => toDo.isCompleted)
    return { initialPending: pending, initialCompleted: completed }
}

export default ToDos;