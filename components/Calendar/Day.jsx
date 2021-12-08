import { useRef, useState } from "react";
import s from "./Calendar.module.css"
import icons from "../../icons"

export default function Day({ day, setFunction, removeFunction, dayName }){
    const [addingToDay, setAddingToDay] = useState(false);
    const [startErr, setStartErr] = useState(false);
    const [endErr, setEndErr] = useState(false);
    const [titleErr, setTitleErr] = useState(false);
    let startTimeRef = useRef(null);
    let endTimeRef = useRef(null);
    let titleRef = useRef(null);
    let scheduleRefs = useRef([]);

    const addToDay = (e) => {
        e.preventDefault();
        let startValue = startTimeRef.current.value;
        let endValue = endTimeRef.current.value;
        let titleValue = titleRef.current.value;
        
        if(startValue === ""){
            setStartErr(true)
        } else {
            setStartErr(false)
        } 

        if(endValue === ""){
            setEndErr(true)
        } else {
            setEndErr(false)
        }

        if(titleValue === ""){
            setTitleErr(true)
        } else {
            setTitleErr(false)
        }

        if(startValue !== "" && endValue !== "" && titleValue !== ""){
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
    }

    return(
          
                <div className={s.dayContainer}>
                    <h2 style={{textAlign:"center"}}>{dayName}</h2>
                    {day && 
                    <> 
                        {day.map((schedule, i) => (
                            <div key={i} className={s.scheduleContainer}>
                                <div onClick={() => removeFunction(schedule._id, dayName)} className={s.removeScheduleIcon}>
                                    { icons.times }
                                </div>
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                                <span ref={refElement => scheduleRefs.current[i] = refElement}>{schedule.title}</span>
                            </div>
                        ))}
                    </>
                    }
                    {addingToDay && 
                        <form className={s.addToDayForm}>
                            <label className={startErr && s.error} htmlFor="startTime">{!startErr ? "Start Time" : "Start Time cannot be empty!"}</label>
                            <input id="startTime" ref={startTimeRef} type="time"  />
                            <label className={endErr && s.error} htmlFor="endTime">{!endErr ? "End Time" : "End Time cannot be empty!"}</label>
                            <input id="endTime" ref={endTimeRef} type="time" />
                            <label className={titleErr && s.error} htmlFor="title">{!titleErr ? "Title" : "Title cannot be empty!"}</label> 
                            <input id="title" ref={titleRef} type="text" />
                            <button className={s.addToDayIconContainer} onClick={(e) => addToDay(e)}>
                                <div className={s.addToDayIcon}>
                                    { icons.checkCircle2x }
                                </div>
                            </button>
                        </form>
                    }
                    {!addingToDay && <button onClick={() => setAddingToDay(true)} className={s.addToDayBtn}>Add to Schedule</button>}
                </div>
            
    )
}