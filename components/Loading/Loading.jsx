import s from "./loading.module.css"

import { faBell, faConciergeBell, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from "react";
config.autoAddCss = false;

const Loading = () => {

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
                <h1>We are preparing everything for you, please wait</h1>
        </div>
    )
}

export default Loading;