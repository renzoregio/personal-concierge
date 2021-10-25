import s from "./Note.module.css"

import { faPenFancy, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


const Note = () => {
    return (
    <div className={s.noteContainer}>
            <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
            <div className={s.buttonsContainer}>
                <FontAwesomeIcon size="2x" icon={faPenFancy} />
                <button className={s.viewButton}>View Note</button>
                <FontAwesomeIcon size="2x" icon={faTrash} />
            </div>
    </div>
    )
}

export default Note;