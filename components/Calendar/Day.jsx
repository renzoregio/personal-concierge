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
    let endTimeRef = useState(null);
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

    const removeSchedule = (x) => {
        const schedule = x.textContent;
        removeFunction(schedule)

    }

    return(
          
                <div className={s.dayContainer}>
                    <h2 style={{textAlign:"center"}}>{dayName}</h2>
                    {day && 
                    <> 
                        {day.map((schedule, i) => (
                            <div key={i} className={s.scheduleContainer}>
                                <FontAwesomeIcon onClick={() => removeSchedule(scheduleRefs.current[i])} className={s.removeScheduleIcon} icon={faTimes}/>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                                <span ref={refElement => scheduleRefs.current[i] = refElement}>{schedule.title}</span>
                            </div>
                        ))}
                    </>
                    }
                    {addingToDay && 
                        <form className={s.addToDayForm}>
                            <input ref={startTimeRef} type="text" placeholder="Start Time" />
                            <input ref={endTimeRef} type="text" placeholder="End Time" />
                            <input ref={titleRef} type="text" placeholder="Title"/>
                            <FontAwesomeIcon className={s.addToDayIcon} icon={faCalendarCheck} onClick={(e) => addToDay(e)} size="2x" />
                        </form>
                    }
                    {!addingToDay && <button onClick={() => setAddingToDay(true)} className={s.addToDayBtn}>Add to Schedule</button>}
                </div>
            
    )
}