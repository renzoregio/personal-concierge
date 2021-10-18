import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from "./todo.module.css"
import Link from "next/link"

export default function ToDoButton({iconName, title}){
    const slug = title.split(" ").join("").toLowerCase();
    return(
        <Link href={`/route/${slug}`}>
            <div className={s.container}>
                <FontAwesomeIcon className={s.icon} icon={iconName}/>
                <span className={s.title}>{title}</span>
            </div>
        </Link>
    )
}