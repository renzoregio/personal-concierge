import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import s from "./Calendar.module.css";
import  Day from "./Day"

export default function Calendar(){
    const dateObj = new Date();
    const [existingCalendar, setExistingCalendar] = useState(false);
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);

    const setFunctions = [
        {currentDay:"Monday", setter: (obj) => setMonday([...monday, obj])},
        {currentDay:"Tuesday", setter: (obj) => setTuesday([...tuesday, obj])},
        {currentDay:"Wednesday", setter: (obj) => setWednesday([...wednesday, obj])},
    ]

    const removeFunctions = [
        {remove: (title) => setMonday([...monday.filter(schedule => schedule.title !== title)])},
        {remove: (title) => setTuesday([...tuesday.filter(schedule => schedule.title !== title)])},
        {remove: (title) => setWednesday([...wednesday.filter(schedule => schedule.title !== title)])},

    ]

    const arr = [monday, tuesday, wednesday]

  

    return(
        <div className={s.container}>
            {!existingCalendar && <button onClick={() => setExistingCalendar(true)} className={s.startCalendarBtn}>Start Calendar</button>}
            {existingCalendar && 
                <>
                    {arr.map((day,i) => (
                        <Day day={day} key={i} index={i} dayName={setFunctions[i].currentDay} removeFunction={removeFunctions[i].remove} setFunction={setFunctions[i].setter}/>
                    ))}
                </>
            }
        </div>
    )
}