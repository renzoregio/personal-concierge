import { BackToMain } from "../Home"

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import  Day from "./Day"


export default function Calendar(){
    const dateObj = new Date();
    const [existingCalendar, setExistingCalendar] = useState(false);
    const [currentDay, setCurrentDay] = useState(null)
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [sunday, setSunday] = useState([])

    const setFunctions = [
        {currentDay:"Monday", setter: (obj) => setMonday([...monday, obj])},
        {currentDay:"Tuesday", setter: (obj) => setTuesday([...tuesday, obj])},
        {currentDay:"Wednesday", setter: (obj) => setWednesday([...wednesday, obj])},
        {currentDay:"Sunday", setter: (obj) => setSunday([...sunday, obj])},
    ]

    const removeFunctions = [
        {remove: (title) => setMonday([...monday.filter(schedule => schedule.title !== title)])},
        {remove: (title) => setTuesday([...tuesday.filter(schedule => schedule.title !== title)])},
        {remove: (title) => setWednesday([...wednesday.filter(schedule => schedule.title !== title)])},
        {remove: (title) => setSunday([...sunday.filter(schedule => schedule.title !== title)])},

    ]

    const arr = [monday, tuesday, wednesday, sunday]


    useEffect(() => {
        const currentDayCount = dateObj.getDay();
        if(currentDayCount === 0){
            setCurrentDay(sunday);
        }
    })
  

    return(
        <div className={s.container}>
            {!existingCalendar && <button onClick={() => setExistingCalendar(true)} className={s.startCalendarBtn}>Start Calendar</button>}
            { existingCalendar && 
            
            <div className={s.currentDayContainer}>
                <span className={s.currentDayTitle}>Today is a Sunday</span>
                <div className={s.currentDayScheduleContainer}>
                    { currentDay.map((schedule, i) => (
                        <div className={s.currentScheduleContainer} key={i}>
                            <span className={s.currentScheduleBubble}>{schedule.startTime} - {schedule.endTime}</span>
                            <span className={s.currentScheduleBubble}>{schedule.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            }
            <div className={s.calendarDaysContainer}>
                {existingCalendar && 
                    <>
                        {arr.map((day,i) => (
                            <Day day={day} key={i} index={i} dayName={setFunctions[i].currentDay} removeFunction={removeFunctions[i].remove} setFunction={setFunctions[i].setter}/>
                        ))}
                    </>
                }
            </div>
            <BackToMain />
        </div>
    )
}