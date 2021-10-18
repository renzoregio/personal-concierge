import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from "./todo.module.css"
export default function ToDoButton({iconName, title}){
    return(
        <div className={s.container}>
            <FontAwesomeIcon className={s.icon} icon={iconName}/>
            <span className={s.title}>{title}</span>
        </div>
    )
}