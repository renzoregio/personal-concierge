import { 
    faHome, faCalendar, faStickyNote, faDollarSign, faUtensils, faList,
    faCheckCircle, faCar, faCartPlus, faPizzaSlice, faEllipsisH, faShoppingBag, faTimesCircle 
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const icons = {
    "home" : <FontAwesomeIcon icon={faHome} />,
    "homeCalendar": <FontAwesomeIcon icon={faCalendar} size="2x"/>,
    "homeStickyNote": <FontAwesomeIcon icon={faStickyNote} size="2x"/>,
    "dollarSign2x": <FontAwesomeIcon icon={faDollarSign} size="2x"/>,
    "dollarSign": <FontAwesomeIcon icon={faDollarSign} />,
    "homeUtensils": <FontAwesomeIcon icon={faUtensils} size="2x"/>,
    "homeList": <FontAwesomeIcon icon={faList} size="2x"/>,
    "pizzaSlice2x": <FontAwesomeIcon icon={faPizzaSlice} size="2x"/>,
    "cartPlus2x": <FontAwesomeIcon icon={faCartPlus} size="2x"/>,
    "car2x": <FontAwesomeIcon icon={faCar} size="2x"/>,
    "shoppingBag2x": <FontAwesomeIcon icon={faShoppingBag} size="2x"/>,
    "ellipsisH2x": <FontAwesomeIcon icon={faEllipsisH} size="2x"/>,
    "checkCircle2x": <FontAwesomeIcon icon={faCheckCircle} size="2x"/>,
    "timesCircle2x": <FontAwesomeIcon icon={faTimesCircle} size="2x"/>,


}


export default icons;