import { BackToMain } from "../Home"

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import  Day from "./Day"


export default function Calendar(){
    const dateObj = new Date();
    const [existingCalendar, setExistingCalendar] = useState(false);
    const [existingCurrentSchedule, setExistingCurrentSchedule] = useState(false)
    const [currentDay, setCurrentDay] = useState({})
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [sunday, setSunday] = useState([])

    const arr = [monday, tuesday, wednesday, sunday]
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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


    useEffect(() => {
        const currentDayCount = dateObj.getDay();
        if(currentDayCount === 0){
            setCurrentDay(sunday);
        }

        setExistingCurrentSchedule(currentDay.length > 0 ? true : false)
    })
  

    return(
        <div className={s.container}>
            {!existingCalendar && <button onClick={() => setExistingCalendar(true)} className={s.startCalendarBtn}>Start Calendar</button>}
            { existingCalendar && 
            
            <div className={s.currentDayContainer}>
                <div className={s.currentDayHeader}>
                    <span className={s.currentDayTitle}>Today is a {daysOfWeek[dateObj.getDay()]}</span>
                    <span className={s.currentDayDate}> {months[dateObj.getMonth()]} {dateObj.getDate()}, {dateObj.getFullYear()}</span>
                </div>
                <div className={s.currentDayDivider}></div>
                { existingCurrentSchedule ? 
                
                    <div className={s.currentDayScheduleContainer}>
                    { currentDay.map((schedule, i) => (
                        <div className={s.currentScheduleContainer} key={i}>
                            <span className={s.currentScheduleBubble}>{schedule.startTime} - {schedule.endTime}</span>
                            <span className={s.currentScheduleBubble}>{schedule.title}</span>
                        </div>
                    ))}
                    </div>

                    :

                    <span className={s.currentDayTitle}>No Schedule Set</span>
                
                }
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