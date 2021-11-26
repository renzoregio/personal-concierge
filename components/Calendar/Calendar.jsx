import { BackToMain } from "../Home"

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import s from "./Calendar.module.css";
import  Day from "./Day"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getSession} from "next-auth/client"
import { LoadingPage } from "../Loading"


export default function Calendar(){
    const dateObj = new Date();
    
    const [currentTime, setCurrentTime] = useState(null);

    const [existingCalendar, setExistingCalendar] = useState(false);
    const [currentDay, setCurrentDay] = useState([])
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wednesday, setWednesday] = useState([]);
    const [thursday, setThursday] = useState([]);
    const [friday, setFriday] = useState([]);
    const [saturday, setSaturday] = useState([])
    const [sunday, setSunday] = useState([])
    const [username, setUsername] = useState("")

    const arr = [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


    useEffect(async() => {
        const userObj = await getSession();
        setUsername(userObj.user.name)
        await createScheduleProfile(userObj.user.name)
    }, [])
  

    const createScheduleProfile = async(user) => {
        try {
             await fetch("http://localhost:3000/api/schedule",{
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: user })
            })

            setExistingCalendar(true)
            await getSchedule(user);

        } catch (error) {
            console.log(error)
        }
    }

    const setSchedule = (arr, setter) => {
        const am = []
        const pm = []
        for(let i = 0; i < arr.length; i++){
            if(parseInt(arr[i].startTime) >= 13){
                pm.push(arr[i])
            } else {
                am.push(arr[i])
            }
        }

        am.sort((a, b) => parseInt(a.startTime) - parseInt(b.startTime))
        pm.sort((a, b) => parseInt(a.startTime) - parseInt(b.startTime))
        
        const sortedSchedule = [...am, ...pm]

        sortedSchedule.forEach(obj => {
            setter(prev => [...prev, obj])
        })
    }
    const getSchedule = async(user) => {
        const res = await fetch("http://localhost:3000/api/schedule",{
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User": username || user
            }
        })
        const { data } = await res.json();
        const { 
            monday: mondayCopy, 
            tuesday: tuesdayCopy, 
            wednesday: wednesdayCopy, 
            thursday: thursdayCopy, 
            friday: fridayCopy, 
            saturday: saturdayCopy, 
            sunday: sundayCopy} = data[0];
        reset();
        setSchedule(sundayCopy, setSunday)
        setSchedule(mondayCopy, setMonday)
        setSchedule(tuesdayCopy, setTuesday)
        setSchedule(wednesdayCopy, setWednesday)
        setSchedule(thursdayCopy, setThursday)
        setSchedule(fridayCopy, setFriday)
        setSchedule(saturdayCopy, setSaturday)

        const currentDayCount = dateObj.getDay();
        if(currentDayCount === 0){
            setCurrentDay(sundayCopy);
        } else if (currentDayCount === 1){
            setCurrentDay(mondayCopy);
        } else if (currentDayCount === 2){
            setCurrentDay(tuesdayCopy);
        } else if (currentDayCount === 3){
            setCurrentDay(wednesdayCopy);
        } else if (currentDayCount === 4){
            setCurrentDay(thursdayCopy)
        } else if(currentDayCount === 5){
            setCurrentDay(fridayCopy)
        } else if (currentDayCount === 6){
            setCurrentDay(saturdayCopy)
        }
    }

    const reset = () => {
        setSunday([])
        setMonday([])
        setTuesday([])
        setWednesday([])
        setThursday([])
        setFriday([])
        setSaturday([])
        setCurrentDay([])
    }

    const addToDay = async(obj, user = username, day) => {
        try {
            await fetch(`http://localhost:3000/api/schedule/day/${user}-${day}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj)
            })
            getSchedule(user);
        } catch (error) {
            console.log(error)
        }
    }

    const removeFromDay = async(id, day) => {
        try {
            await fetch(`http://localhost:3000/api/schedule/remove-task/${id}-${username}-${day.toLowerCase()}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({})
            })
            getSchedule(username)
        } catch (error) {
            console.log(error)
        }
    }

    const setFunctions = [
        {setter: (obj) => addToDay(obj, username, "sunday")},
        {setter: (obj) => addToDay(obj, username, "monday")},
        {setter: (obj) => addToDay(obj, username, "tuesday")},
        {setter: (obj) => addToDay(obj, username, "wednesday")},
        {setter: (obj) => addToDay(obj, username, "thursday")},
        {setter: (obj) => addToDay(obj, username, "friday")},
        {setter: (obj) => addToDay(obj, username, "saturday")},
        ]

    const removeFunctions = [
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
        {remove: (id, day) => removeFromDay(id, day)},
    ]

    const getCurrentTime = () => {
        const currentDate = new Date()
        const seconds = `${currentDate.getSeconds()}`
        let time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${seconds.length > 1 ? seconds : "0" + seconds}`
        setCurrentTime(time)
    }

    setInterval(getCurrentTime, 1000)

    return(
        <div className={s.container}>
            <LoadingPage />
            <span className={s.currentTime}>{currentTime}</span>
            {!existingCalendar && <button onClick={() => setExistingCalendar(true)} className={s.startCalendarBtn}>Start Calendar 
            <FontAwesomeIcon style={{marginLeft:"20px"}} icon={faCalendar} />
            </button>}
            { existingCalendar && 
            <div className={s.currentDayContainer}>
            
                <div className={s.currentDayHeader}>
                    <span className={s.currentDayTitle}>Today is a {daysOfWeek[dateObj.getDay()]}</span>
                    <span className={s.currentDayDate}> {months[dateObj.getMonth()]} {dateObj.getDate()}, {dateObj.getFullYear()}</span>
                </div>
                <div className={s.currentDayDivider}></div>
                { currentDay.length > 0 ? 
                
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
                            <Day day={day} key={i} index={i} dayName={daysOfWeek[i]} removeFunction={removeFunctions[i].remove} setFunction={setFunctions[i].setter}/>
                        ))}
                    </>
                }
            </div>
            <BackToMain />
        </div>
    )
}