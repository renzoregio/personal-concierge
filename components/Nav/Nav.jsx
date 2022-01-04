import s from "./nav.module.css"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/client"
import {BackToMain} from "../Home"
import { useRouter } from 'next/router'
import icons from "../../icons"

export default function Nav({ hide = true }){
    const [time, setTime] = useState("")
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")
    const [temperature, setTemperature] = useState(0)
    const [weatherIcon, setWeatherIcon] = useState("")
    const [weatherDescription, setWeatherDescription] = useState([])
    const router = useRouter()

    const getCurrentTime = () => {
        const currentDate = new Date()
        const seconds = `${currentDate.getSeconds()}`
        const hour = currentDate.getHours();
        const minutes = `${currentDate.getMinutes()}`;
        let time = `${hour}:${minutes.length > 1 ? minutes : "0" + minutes }:${seconds.length > 1 ? seconds : "0" + seconds}`
        setTime(time)
        if(hour >= 12 && hour < 18){
            setMessage("good afternoon")
        } else if (hour >= 18 && hour < 24){
            setMessage("good evening")
        } else {
            setMessage("good morning")
        }
    }


    useEffect(async() => {
        const userObj = await getSession()
        setUsername(userObj.user.name);
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${process.env.WEATHER_KEY}&units=metric`)
            const data = await res.json()
            setTemperature(Math.round(data.main.temp))
            setWeatherIcon(data.weather[0].main.toLowerCase())
            setWeatherDescription(data.weather[0].description)
        } catch (error) {
            console.log(error)
        }
    
        setInterval(getCurrentTime, 1000)

    }, [time])

    const getWeatherIcon = () => {
        if(weatherIcon === "clouds"){
            return icons.cloud
        } else if (weatherIcon === "rain" || weatherIcon === "drizzle"){
            return icons.cloudRain
        } else if (weatherIcon === "clear"){
            return icons.sun
        } else if(weatherIcon === "snow"){
            return icons.snowflake
        } else {
            return icons.cloud
        }
    }

    const signOutFn = () => {
        router.push("/route/sign-out")
        setTimeout(() => {
            signOut();
        }, 2000)
    }

    return (
        <div className={s.navContainer}>
            <div style={{ color: "white" }}>
                <span style={{ marginLeft: "20px"}}>{message}, {username}</span>
            </div>
            <div className={s.clockContainer}>
                { icons.clock }
                <span style={{ marginLeft: "20px"}}>{time}</span>
            </div>
            { !hide && <BackToMain />}
            <div className={s.weatherContainer}>
                <span style={{ marginRight: "20px"}}>{weatherDescription} {temperature}&deg;C</span>
                { getWeatherIcon() }
            </div>
            <div onClick={() => signOutFn()} className={s.signOutContainer} >
                <button className={s.signOutBtn}></button>
                { icons.signOut }
            </div>
        </div>
    )
}

