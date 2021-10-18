import s from "./home.module.css"
import { faCheckCircle, faCalendar, faStickyNote, faConciergeBell, faDollarSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import ToDoButton from "./ToDoButton"

export default function Home() {

    const arr = [
        { icon: faCheckCircle, title: "To Do"},
        { icon: faCalendar, title: "Weekly Schedule"},
        { icon: faStickyNote, title: "Quick Note"},
        { icon: faDollarSign, title: "Budget"}
    ]

    return(
        <>
            <span className={s.title}>Welcome to your Personal Concierge
            <FontAwesomeIcon className={s.icon} icon={faConciergeBell} />
            </span>
            <span className={s.subtitle}>What do you want to do today?</span>
            { arr.map((toDo, i) => (
                <ToDoButton key={i} iconName={toDo.icon} title={toDo.title}/>
            ))}
        </>
    )
}