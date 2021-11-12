import s from "./nav.module.css"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/client"

export default function Nav (){
    const [username, setUsername] = useState("")

    useEffect(async() => {
        const userObj = await getSession()
        setUsername(userObj.user.name);
    }, [])

    return (
        <div className={s.navContainer}>
            <span >hello, {username}</span>
            <button className={s.signOutBtn} onClick={signOut}>Sign Out</button>
        </div>
    )
}

