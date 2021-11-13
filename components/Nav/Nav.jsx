import s from "./nav.module.css"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/client"

import { faCloud, faCloudRain, faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function Nav (){
    const [username, setUsername] = useState("")
    const [temperature, setTemperature] = useState(0)
    const [weatherIcon, setWeatherIcon] = useState("")
    const [weatherDescription, setWeatherDescription] = useState([])

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
    }, [])

    const getWeatherIcon = () => {
        if(weatherIcon === "clouds"){
            return faCloud
        } else if (weatherIcon === "rain" || weatherIcon === "drizzle"){
            return faCloudRain
        } else if (weatherIcon === "clear"){
            return faSun
        } else if(weatherIcon === "snow"){
            return faSnowflake
        } else {
            return faCloud
        }
    }

    return (
        <div className={s.navContainer}>
            <span >hello, {username}</span>
            <div className={s.weatherContainer}>
                <span>{weatherDescription} at {temperature}&deg;C</span>
                <FontAwesomeIcon icon={getWeatherIcon()} /> 
            </div>
            <button className={s.signOutBtn} onClick={signOut}>Sign Out</button>
        </div>
    )
}

