import s from "./loading.module.css"
import { useEffect, useState } from "react";

const Loading = ({ title = "We are preparing everything for you"}) => {

    const [position, setPosition] = useState(10);
    
    useEffect(() => {
        setTimeout(() => {
            setPosition(-1)
        }, 2500)
    }, [])

    return (
        <div  className={s.container} style={{ zIndex: position}}>
            <div className={s.loadingDotContainer}>
                <div className={s.loadingDot}></div>
                <div className={s.loadingDot}></div>
                <div className={s.loadingDot}></div>
            </div>
                <h1>{title}, please wait</h1>
        </div>
    )
}

export default Loading;