import { useRef, useState } from "react";
import s from "./Calendar.module.css"

import { faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Day({ day, setFunction, removeFunction, dayName }){
    const [addingToDay, setAddingToDay] = useState(false);
    let startTimeRef = useRef(null);
    let endTimeRef = useRef(null);
    let titleRef = useRef(null);
    let scheduleRefs = useRef([]);

    const addToDay = (e) => {
        e.preventDefault();
        let startValue = startTimeRef.current.value;
        let endValue = endTimeRef.current.value;
        let titleValue = titleRef.current.value;
        const scheduleObj = {
            startTime: startValue,
            endTime: endValue,
            title: titleValue
        }
        setFunction(scheduleObj);
        startTimeRef.current.value = "";
        endTimeRef.current.value = "";
        titleRef.current.value = "";
        setAddingToDay(false);
    }

    return(
          
                <div className={s.dayContainer}>
                    <h2 style={{textAlign:"center"}}>{dayName}</h2>
                    {day && 
                    <> 
                        {day.map((schedule, i) => (
                            <div key={i} className={s.scheduleContainer}>
                                <FontAwesomeIcon onClick={() => removeFunction(schedule._id, dayName)} className={s.removeScheduleIcon} icon={faTimes}/>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                                <span ref={refElement => scheduleRefs.current[i] = refElement}>{schedule.title}</span>
                            </div>
                        ))}
                    </>
                    }
                    {addingToDay && 
                        <form className={s.addToDayForm}>
                            <label htmlFor="startTime">Start</label>
                            <input id="startTime" ref={startTimeRef} type="time"  />
                            <label fohtmlForr="endTime">End</label>
                            <input id="endTime" ref={endTimeRef} type="time" />
                            <input ref={titleRef} type="text" placeholder="Title"/>
                            <FontAwesomeIcon className={s.addToDayIcon} icon={faCalendarCheck} onClick={(e) => addToDay(e)} size="2x" />
                        </form>
                    }
                    {!addingToDay && <button onClick={() => setAddingToDay(true)} className={s.addToDayBtn}>Add to Schedule</button>}
                </div>
            
    )
}