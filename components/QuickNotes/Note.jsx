import s from "./Note.module.css"

import { faPenFancy, faTrash, faTimes, faLock, faUnlock, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useRef } from "react";
config.autoAddCss = false;


const Note = ({title, content, deleteNote, password}) => {
    const [editingMode, setEditingMode] = useState(false)
    const [viewingMode, setViewingMode] = useState(false)
    const [unlockMode, setUnlockMode] = useState(true)
    const [passwordMode, setPasswordMode] = useState(false)
    const [passwordError, setPasswordError]= useState(false)
    const editTextRef = useRef(content)
    const enteredPasswordRef = useRef(null)

    const editNote = () => {
        setEditingMode(true)
        editTextRef.current = content;
    }

    const lockNote = () => {
        setUnlockMode(false)
    }

    const unlockNote = () => {
        setPasswordMode(true)
    }
    
    const handleNoteView = () => {
        if(enteredPasswordRef.current.value === password) {
            setUnlockMode(true)
            setPasswordMode(false)
        } else {
            setPasswordError(true)
        }

        enteredPasswordRef.current.value = ""
    }

    return (
    <div className={s.noteContainer}>
            { !editingMode && <> <h1>{title}</h1> <FontAwesomeIcon className={s.icon} size="2x" onClick={unlockMode ? lockNote : unlockNote} icon={unlockMode ? faUnlock : faLock} /> </> }
            { passwordMode && <> <h2>Enter your password </h2> <div style={{display: "flex", alignItems: "center"}}><input ref={enteredPasswordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password"/> <FontAwesomeIcon className={s.checkIcon} onClick={handleNoteView} icon={faCheckCircle} size="2x" /></div></>}
            <div className={!viewingMode ? s.buttonsContainer : s.viewingModeContainer}>
                {viewingMode && 
                <p className={s.contentTextView}>{content}</p>
                }
                {!editingMode ?
                <>
                    {!viewingMode ? 
                    <>
                        { unlockMode && <FontAwesomeIcon className={s.icon} onClick={editNote} size="2x" icon={faPenFancy} /> }
                        {!viewingMode && unlockMode && <button onClick={() => setViewingMode(true)} className={s.viewButton}>View Note</button>}
                        { unlockMode && <FontAwesomeIcon className={s.trashBin} size="2x" onClick={() => deleteNote(title)} icon={faTrash} />}
                    </> :
                    <div className={s.viewingModeIconsContainer}>
                        <FontAwesomeIcon className={s.icon} onClick={editNote} size="2x" icon={faPenFancy} />
                        <FontAwesomeIcon className={s.trashBin} size="2x" onClick={() => deleteNote(title)} icon={faTrash} />
                        <FontAwesomeIcon className={s.closeBtn} onClick={() => setViewingMode(false)} icon={faTimes} size="2x" />
                    </div>
                    }
                </> 
                :
                <div className={s.editingContainer}>
                    <div className={s.editingContentContainer}>
                        <input className={s.editTitle} type="text" value={title} />
                        <textarea className={s.editText} defaultValue={content} ref={editTextRef}></textarea>    
                    </div>
                    <FontAwesomeIcon className={s.icon} icon={faPenFancy} size="3x" />
                    <FontAwesomeIcon className={s.closeBtn} onClick={() => setEditingMode(false)} icon={faTimes} size="2x" />
                </div> 
                }

                
                
            </div>
    </div>
    )
}

export default Note;