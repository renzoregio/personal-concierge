import s from "./ToDos.module.css"
import {useState, useRef} from "react"
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
    const [toDos, setToDos] = useState(initialPending)
    const [completedToDos, setCompletedToDos] = useState(initialCompleted)
    const textBox = useRef(null)

    const fetchToDos = async(method, id, task = "", isCompletedBool = false) => {
        const url = id === null ? "http://localhost:3000/api/todos" : `http://localhost:3000/api/todos/${id}`;
        const headerObj = { "Accept": "application/json", "Content-Type": "application/json" }
        try {
            if(method === "GET" || method === "DELETE"){
                await fetch(url, {
                    method: method,
                    headers: headerObj,
                })
            } else if (method === "POST"){
                await fetch(url, {
                    method: method,
                    headers: headerObj,
                    body: JSON.stringify({ task: task })
                })
            } else if (method === "PUT"){
                await fetch(url, {
                    method: method,
                    headers: headerObj,
                    body: JSON.stringify({ isCompleted : isCompletedBool })
                })
            }
        } catch (error) {
            console.log(error)
        }
        updateToDos();
    }

    const updateToDos = async() => {
        const data = await getToDos();
        const pending = data.filter(toDo => !toDo.isCompleted)
        const completed = data.filter(toDo => toDo.isCompleted)

        setToDos(pending)
        setCompletedToDos(completed)
    }

    const addTask = (e) => {
        e.preventDefault();
        fetchToDos("POST", null, textBox.current.value);
        textBox.current.value = "";
    }

    const completeTask = (id) => {
        fetchToDos("PUT", id, null, true);
    }

    const deleteTask = (id) => {
        fetchToDos("DELETE", id, null, null);
    }

    const returnTask = (id) => {
        fetchToDos("PUT", id, null)
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
                                <span  className={s.toDoText}>{toDo.task}</span>
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
                            <span className={`${s.toDoText} ${s.completed}`}>{toDo.task}</span>
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