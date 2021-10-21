import s from "./ToDos.module.css"
import {useState, useRef} from "react"


import { faCheck, faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function ToDos(){

    const [toDos, setToDos] = useState([])
    const textBox = useRef(null)
    const clickedToDo = useRef([])

    const onSubmit = (e) => {
        e.preventDefault();
        setToDos([...toDos, textBox.current.value])
        textBox.current.value = "";
    }

    const completeTask = (x) => {
        let currentToDo = x.textContent
        const filteredToDos = toDos.filter(toDo => {
            if(toDo !== currentToDo){
                return toDo
            }
        })
        setToDos([...filteredToDos])
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>things you need to do</h1>
            <form className={s.toDoForm}>
                <input className={s.textBox} ref={textBox} type="text" />
                <button className={s.submitBtn} onClick={(e) => onSubmit(e)}>
                    <FontAwesomeIcon size="2x" icon={faCheckCircle}/>
                </button>
            </form>
            <div className="toDoMainContainer">
                { toDos.map((toDo, i) => (
                    <div className={s.toDoContainer} key={i}>
                        <span ref={refElement => clickedToDo.current[i] = refElement}  className={s.toDoText}>{toDo}</span>
                        <FontAwesomeIcon onClick={() => completeTask(clickedToDo.current[i])} size="2x" className={s.icon} icon={faCheck}/>
                        <FontAwesomeIcon size="2x" className={s.icon} icon={faTrash} />
                    </div>
                ))}
            </div>
        </div>
    )
}