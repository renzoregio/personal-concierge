import s from "./home.module.css"
import icons from "../../icons"
import { useRouter } from 'next/router'

const ReturnHome = () => {
    const router = useRouter();
    return(
        <div onClick={() => router.push("/")}className={s.homeBtn}>
            {icons.home}
        </div>
    )
}

export default ReturnHome;