import s from "./ToDos.module.css"
import {useState, useRef} from "react"

export default function ToDos(){

    const [toDos, setToDos] = useState([])
    const textBox = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault();
        setToDos([...toDos, textBox.current.value])
        textBox.current.value = "";
    }

    return (
        <div className={s.container}>
            <h1 className={s.title}>to do</h1>
            <form>
                <input ref={textBox} type="text" />
                <button onClick={(e) => onSubmit(e)}>Submit</button>
            </form>
            { toDos.map(toDo => (
                <span>{toDo}</span>
            ))}
        </div>
    )
}