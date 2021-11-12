import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import s from "./todo.module.css"
import Link from "next/link"
import { useState } from 'react'

export default function ToDoButton({iconName, title, slug}){

    const [displayTask, setDisplayTask] = useState(false)

    return(
        <div className={s.container} onMouseEnter={() => setDisplayTask(true)} onMouseLeave={() => setDisplayTask(false)}>
            { !displayTask && 
                <Link href={`/route/${slug}`}>
                    <FontAwesomeIcon className={s.icon} icon={iconName} size="2x"/>
                </Link>
            }
            { displayTask && 
            
                <span className={s.title}>{title}</span>
            
            }
        </div>
    )
}