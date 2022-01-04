import s from "./ToDos.module.css"
import {useState, useRef, useEffect} from "react"
import { getSession } from "next-auth/client";
import { LoadingPage } from "../Loading";
import fetch from 'isomorphic-unfetch';
import  { Nav }  from "../Nav"
import icons from "../../icons"

const ToDos = () => {

    const [toDos, setToDos] = useState([])
    const [completedToDos, setCompletedToDos] = useState([])
    const [username, setUsername] = useState("")
    const textBox = useRef(null)

    useEffect(async() => {
        const userObj = await getSession();
        setUsername(userObj.user.name);
        if(userObj){
            const data = await getToDos(userObj.user.name)
            const pending = data.filter(toDo => !toDo.isCompleted)
            const completed = data.filter(toDo => toDo.isCompleted)
            setToDos(pending);
            setCompletedToDos(completed)
        }
    }, [])

    const getToDos = async(user) => {
        const res = await fetch("http://localhost:3000/api/todos", {
            method: "GET",
            headers: {
                "Accept": "application/json", "Content-Type": "application/json", "user": user
            },
        });
        const { data } = await res.json();
        if(!data){
            return []
        }
        return data
    }

    
    const fetchToDos = async(method, id, task = "", isCompletedBool = false) => {
        const url = id === null ? "http://localhost:3000/api/todos" : `http://localhost:3000/api/todos/${id}`;
        const headerObj = { "Accept": "application/json", "Content-Type": "application/json" }
        try {
            if(method === "GET" || method === "DELETE"){
                await fetch(url, {
                    method: method,
                    headers: {"Accept": "application/json", "Content-Type": "application/json", "User": username},
                })
            } else if (method === "POST"){
                await fetch(url, {
                    method: method,
                    headers: headerObj,
                    body: JSON.stringify({ task: task, user: username })
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
        const data = await getToDos(username);
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
        <Nav hide={false}/>
            <div className={s.toDosContainer}>
                <div>
                    <h1 className={s.title}>add a to do</h1>
                    <form className={s.toDoForm}>
                        <input className={s.textBox} ref={textBox} type="text" />
                        <button className={s.submitBtn} onClick={(e) => addTask(e)}>
                            { icons.checkCircle2x }
                        </button>
                    </form>
                    <div>
                        { toDos.map((toDo, i) => (
                            <div className={s.toDoContainer} key={i}>
                                <span  className={s.toDoText}>{toDo.task}</span>
                                <div onClick={() => completeTask(toDo._id)} className={`${s.icon} ${s.checkIcon}`}> 
                                    { icons.check2x }
                                </div>
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
                            <div onClick={() => deleteTask(toDo._id)} className={`${s.icon} ${s.trashIcon}`}> {icons.trash2x} </div>
                            <div onClick={() => returnTask(toDo._id)} className={`${s.icon} ${s.historyIcon}`}> {icons.history2x} </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            </div>
            <LoadingPage />
        </div>
    )
}

export default ToDos;
