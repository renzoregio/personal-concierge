import s from "./Note.module.css"

import { faPenFancy, faTrash, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useRef } from "react";
config.autoAddCss = false;


const Note = ({title, content}) => {
    const [editingMode, setEditingMode] = useState(false)
    const [viewingNote, setViewingNote] = useState(false)
    const editTextRef = useRef(content)
    const editNote = () => {
        console.log(editTextRef)
        setEditingMode(true)
        editTextRef.current = content;
        console.log(content)

    }

    return (
    <div className={s.noteContainer}>
            { !editingMode && <h1>{title}</h1> }
            <div className={s.buttonsContainer}>
                {!editingMode ?
                <>
                    <FontAwesomeIcon onClick={editNote} size="2x" icon={faPenFancy} />
                    <button className={s.viewButton}>View Note</button>
                    <FontAwesomeIcon size="2x" icon={faTrash} />
                </> 
                :
                <div className={s.editingContainer}>
                    <div className={s.editingContentContainer}>
                        <input className={s.editTitle} type="text" value={title} />
                        <textarea className={s.editText} defaultValue={content} ref={editTextRef}></textarea>    
                    </div>
                    <FontAwesomeIcon icon={faPenFancy} size="3x" />
                    <FontAwesomeIcon className={s.closeBtn} icon={faTimes} size="2x" />
                </div> 
                }

                {viewingNote && 
                
                <>
                    <span>{content}</span>
                </>
                
                }
                
            </div>
    </div>
    )
}

export default Note;