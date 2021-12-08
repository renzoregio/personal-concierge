import s from "./home.module.css"
import icons from "../../icons"
import ToDoButton from "./ToDoButton"
import  { Nav }  from "../Nav"
import { LoadingPage } from "../Loading";

export default function Home() {
    const arr = [
        { icon: icons.homeList, title: "To Do", slug: "to-do"},
        { icon: icons.homeCalendar, title: "Daily Schedule", slug: "schedule"},
        { icon: icons.homeStickyNote, title: "Quick Note", slug: "quick-notes"},
        { icon: icons.dollarSign2x, title: "Budget", slug: "budget"}, 
        { icon: icons.homeUtensils, title: "Restaurant Recommendations", slug: "restaurant-recommendations"}
    ]
    return(
        <div className={s.container}>
            <LoadingPage title={"Bringing you home"}/>
            <Nav/>
            <span className={s.title}>Welcome to your Personal Concierge
            </span>
            <div className={s.tasksContainer}>
                { arr.map((toDo, i) => (
                    <ToDoButton key={i} icon={toDo.icon} slug={toDo.slug} title={toDo.title}/>
                ))}
            </div>
        </div>
    )
}
