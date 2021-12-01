import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import s from "./home.module.css"
import { useRouter } from 'next/router'



const ReturnHome = () => {
    const router = useRouter();
    return(
        <div onClick={() => router.push("/")}className={s.homeBtn}>
                <FontAwesomeIcon icon={faHome} size="3x"/>
        </div>
    )
}

export default ReturnHome;