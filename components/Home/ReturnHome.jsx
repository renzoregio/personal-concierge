import Link from "next/link"
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import s from "./home.module.css"
const ReturnHome = () => {
    return(
        <div className={s.homeBtn}>
            <Link href="/">
                <FontAwesomeIcon icon={faHome} size="3x"/>
            </Link>
        </div>
    )
}

export default ReturnHome;