import s from "./home.module.css"
import { faCheckCircle, faCalendar, faStickyNote, faConciergeBell, faDollarSign, faUtensils, faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import ToDoButton from "./ToDoButton"
import  { Nav }  from "../Nav"
import { useEffect, useState } from "react";
import { LoadingPage } from "../Loading";

export default function Home() {
    const arr = [
        { icon: faList, title: "To Do", slug: "to-do"},
        { icon: faCalendar, title: "Daily Schedule", slug: "schedule"},
        { icon: faStickyNote, title: "Quick Note", slug: "quick-notes"},
        { icon: faDollarSign, title: "Budget", slug: "budget"}, 
        { icon: faUtensils, title: "Restaurant Recommendations", slug: "restaurant-recommendations"}
    ]
    return(
        <div className={s.container}>
            <LoadingPage title={"Bringing you back home"}/>
            <Nav />
            <span className={s.title}>Welcome to your Personal Concierge
            </span>
            <div className={s.tasksContainer}>
                { arr.map((toDo, i) => (
                    <ToDoButton key={i} iconName={toDo.icon} slug={toDo.slug} title={toDo.title}/>
                ))}
            </div>
        </div>
    )
}
