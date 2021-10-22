import Link from "next/link"
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const ReturnHome = () => {
    return(
        <Link href="/">
                <FontAwesomeIcon icon={faHome} size="3x"/>
        </Link>
    )
}

export default ReturnHome;