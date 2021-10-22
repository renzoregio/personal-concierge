import s from "./ToDos.module.css"
import {useState, useRef} from "react"


import { faCheck, faCheckCircle, faTrash, faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function ToDos(){

    const [toDos, setToDos] = useState([])
    const [completedToDos, setCompletedToDos] = useState([])
    const textBox = useRef(null)
    const clickedPendingToDos = useRef([])
    const clickedCompletedToDos = useRef([])

    const onSubmit = (e) => {
        e.preventDefault();
        setToDos([...toDos, textBox.current.value].sort())
        textBox.current.value = "";
    }

    const completeTask = (x) => {
        let currentToDo = x.textContent
        setCompletedToDos([...completedToDos, currentToDo].sort())
        const filteredToDos = toDos.filter(toDo => {
            if(toDo !== currentToDo){
                return toDo
            }
        })
        setToDos([...filteredToDos].sort())
    }

    const removeTask = (x) => {
        let currentToDo = x.textContent;
        const filteredCompletedToDos = completedToDos.filter(toDo => {
            if(toDo !== currentToDo){
                return toDo
            }
        })
        setCompletedToDos([...filteredCompletedToDos].sort())
    }

    const returnTask = (x) => {
        let currentToDo = x.textContent;
        const filteredCompletedToDos = completedToDos.filter(toDo => {
            if(toDo !== currentToDo){
                return toDo
            }
        })
        setCompletedToDos([...filteredCompletedToDos].sort())
        setToDos([...toDos, currentToDo].sort())
    }

    return (
        <div className={s.container}>
            <div>
                <h1 className={s.title}>add a to do</h1>
                <form className={s.toDoForm}>
                    <input className={s.textBox} ref={textBox} type="text" />
                    <button className={s.submitBtn} onClick={(e) => onSubmit(e)}>
                        <FontAwesomeIcon size="2x" icon={faCheckCircle}/>
                    </button>
                </form>
                <div className="toDoMainContainer">
                    { toDos.map((toDo, i) => (
                        <div className={s.toDoContainer} key={i}>
                            <span ref={refElement => clickedPendingToDos.current[i] = refElement}  className={s.toDoText}>{toDo}</span>
                            <FontAwesomeIcon onClick={() => completeTask(clickedPendingToDos.current[i])} size="2x" className={`${s.icon} ${s.checkIcon}`} icon={faCheck}/>
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
                        <span ref={refElement => clickedCompletedToDos.current[i] = refElement} className={`${s.toDoText} ${s.completed}`}>{toDo}</span>
                        <FontAwesomeIcon size="2x" onClick={() => removeTask(clickedCompletedToDos.current[i])} className={`${s.icon} ${s.trashIcon}`} icon={faTrash} />
                        <FontAwesomeIcon size="2x" onClick={() => returnTask(clickedCompletedToDos.current[i])} className={`${s.icon} ${s.historyIcon}`} icon={faHistory} />
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    )
}