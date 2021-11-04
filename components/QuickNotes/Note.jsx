import s from "./Note.module.css"
import Link from "next/link"
import { faPenFancy, faTrash, faTimes, faLock, faUnlock, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useRef } from "react";
config.autoAddCss = false;


const Note = ({id, title, description, deleteNote, password, updateNote}) => {
    const [editingMode, setEditingMode] = useState(false)
    const [viewingMode, setViewingMode] = useState(false)
    const [unlockMode, setUnlockMode] = useState(true)
    const [passwordMode, setPasswordMode] = useState(false)
    const [passwordError, setPasswordError]= useState(false)

    const editTitleRef = useRef(title)
    const editContentRef = useRef(description)
    const enteredPasswordRef = useRef(null)

    const editNote = () => {
        const updatedTitle = editTitleRef.current.value;
        const updatedContent = editContentRef.current.value;
        updateNote({id: id, updatedTitle, updatedContent})
        setEditingMode(false)
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
                {viewingMode && unlockMode && !editingMode &&
                <p className={s.contentTextView}>{description}</p>
                }
                {!editingMode ?
                <>
                    {!viewingMode ? 
                    <>
                        { unlockMode && <FontAwesomeIcon className={s.icon} onClick={() => setEditingMode(true)} size="2x" icon={faPenFancy} />  }
                        {!viewingMode && unlockMode && <button onClick={() => setViewingMode(true)} className={s.viewButton}>View Note</button>}
                        { unlockMode && <FontAwesomeIcon className={s.trashBin} size="2x" onClick={() => deleteNote(id)} icon={faTrash} />}
                    </> :
                    <div className={s.viewingModeIconsContainer}>
                        { unlockMode && <FontAwesomeIcon className={s.icon} onClick={() => setEditingMode(true)} size="2x" icon={faPenFancy} /> }
                        {!viewingMode && unlockMode && <button onClick={() => setViewingMode(true)} className={s.viewButton}>View Note</button>}
                        { unlockMode && <FontAwesomeIcon className={s.trashBin} size="2x" onClick={() => deleteNote(id)} icon={faTrash} />}
                    </div>
                    }
                </> 
                :
                <div className={s.editingContainer}>
                    <div className={s.editingContentContainer}>
                        <input className={s.editTitle} type="text" defaultValue={title} ref={editTitleRef} />
                        <textarea className={s.editText} defaultValue={description} ref={editContentRef}></textarea>    
                    </div>
                    <FontAwesomeIcon className={s.icon} onClick={editNote} icon={faPenFancy} size="3x" />
                    <FontAwesomeIcon className={s.closeBtn} onClick={() => setEditingMode(false)} icon={faTimes} size="2x" />
                </div> 
                }

                
                
            </div>
        </div>
    )
}

export default Note;