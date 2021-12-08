import s from "./todo.module.css"
import Link from "next/link"
import { useState } from 'react'

export default function ToDoButton({icon, title, slug}){

    const [displayTask, setDisplayTask] = useState(false)

    return(
        <div className={s.container} onMouseEnter={() => setDisplayTask(true)} onMouseLeave={() => setDisplayTask(false)}>
            { !displayTask && 
                <Link href={`/route/${slug}`}>
                    <div>
                        { icon }
                    </div>
                </Link>
            }
            { displayTask && 
                <Link href={`/route/${slug}`}>
                    <span className={s.title}>{title}</span>
                </Link>
            }
        </div>
    )
}