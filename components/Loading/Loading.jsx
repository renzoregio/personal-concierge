import s from "./loading.module.css"
import { useEffect, useState } from "react";

const Loading = ({ title = "We are preparing everything for you"}) => {

    const [position, setPosition] = useState(10);
    const [loadingDone, setLoadingDone] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {
            setLoadingDone(true)
        }, 2500)

        if(loadingDone){
            setPosition(-1)
        }

    }, [loadingDone])

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