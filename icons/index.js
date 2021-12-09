import { 
    faHome, faCalendar, faStickyNote, faDollarSign, faUtensils, faList,
    faCheckCircle, faCar, faCartPlus, faPizzaSlice, faEllipsisH, faShoppingBag, faTimesCircle,
    faTimes, faUser, faCloud, faCloudRain, faSnowflake, faSun,faClock, faSignOutAlt,
    faPenFancy, faTrash, faLock, faUnlock,
    faSearch, faStar, faStarHalf
    
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const icons = {
    "star": <FontAwesomeIcon icon={faStar} />,
    "starHalf": <FontAwesomeIcon icon={faStarHalf} />,
    "search2x": <FontAwesomeIcon icon={faSearch} size="2x" />,
    "trash2x": <FontAwesomeIcon icon={faTrash} size="2x" />,
    "penFancy2x":<FontAwesomeIcon icon={faPenFancy} size="2x" />, 
    "penFancy3x":<FontAwesomeIcon icon={faPenFancy} size="3x" />, 
    "unlock2x":<FontAwesomeIcon icon={faUnlock} size="2x" />,
    "lock2x":<FontAwesomeIcon icon={faLock} size="2x" />,
    "home" : <FontAwesomeIcon icon={faHome} />,
    "homeCalendar": <FontAwesomeIcon icon={faCalendar} size="2x"/>,
    "calendar": <FontAwesomeIcon icon={faCalendar} />,
    "homeStickyNote": <FontAwesomeIcon icon={faStickyNote} size="2x"/>,
    "stickyNote3x": <FontAwesomeIcon icon={faStickyNote} size="3x"/>,
    "dollarSign2x": <FontAwesomeIcon icon={faDollarSign} size="2x"/>,
    "dollarSign": <FontAwesomeIcon icon={faDollarSign} />,
    "times": <FontAwesomeIcon icon={faTimes} />,
    "times2x": <FontAwesomeIcon icon={faTimes} size="2x"/>,
    "homeUtensils": <FontAwesomeIcon icon={faUtensils} size="2x"/>,
    "homeList": <FontAwesomeIcon icon={faList} size="2x"/>,
    "pizzaSlice2x": <FontAwesomeIcon icon={faPizzaSlice} size="2x"/>,
    "cartPlus2x": <FontAwesomeIcon icon={faCartPlus} size="2x"/>,
    "car2x": <FontAwesomeIcon icon={faCar} size="2x"/>,
    "shoppingBag2x": <FontAwesomeIcon icon={faShoppingBag} size="2x"/>,
    "ellipsisH2x": <FontAwesomeIcon icon={faEllipsisH} size="2x"/>,
    "checkCircle2x": <FontAwesomeIcon icon={faCheckCircle} size="2x"/>,
    "checkCircle3x": <FontAwesomeIcon icon={faCheckCircle} size="3x"/>,
    "timesCircle2x": <FontAwesomeIcon icon={faTimesCircle} size="2x"/>,
    "user": <FontAwesomeIcon icon={faUser} />,
    "cloud": <FontAwesomeIcon icon={faCloud} />,
    "cloudRain": <FontAwesomeIcon icon={faCloudRain} />,
    "snowflake": <FontAwesomeIcon icon={faSnowflake} />,
    "sun": <FontAwesomeIcon icon={faSun} />,
    "clock": <FontAwesomeIcon icon={faClock} />,
    "signOut": <FontAwesomeIcon icon={faSignOutAlt} />,


}


export default icons;