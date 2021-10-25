import s from "./Note.module.css"

import { faPenFancy, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useRef } from "react";
config.autoAddCss = false;


const Note = ({title, content}) => {
    const [editingMode, setEditingMode] = useState(false)
    const editTextRef = useRef(content)
    const editNote = () => {
        console.log(editTextRef)
        setEditingMode(true)
        editTextRef.current = content;
        console.log(content)

    }

    return (
    <div className={s.noteContainer}>
            <h1>{title}</h1>
            <div className={s.buttonsContainer}>
                {!editingMode ?
                <>
                    <FontAwesomeIcon onClick={editNote} size="2x" icon={faPenFancy} />
                    <button className={s.viewButton}>View Note</button>
                    <FontAwesomeIcon size="2x" icon={faTrash} />
                </> 
                :
                <>
                    <textarea className={s.editText} defaultValue={content} ref={editTextRef}></textarea>
                    <FontAwesomeIcon icon={faPenFancy} size="2x" />
                </> 
                } 
                
            </div>
    </div>
    )
}

export default Note;