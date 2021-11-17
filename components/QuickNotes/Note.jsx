import s from "./Note.module.css"
import fetch from 'isomorphic-unfetch';

import { faPenFancy, faTrash, faTimes, faLock, faUnlock, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useState, useRef, useEffect } from "react";
config.autoAddCss = false;


const Note = ({id, title, description, deleteNote, password, updateNote, isUnlocked, unlockNoteFn}) => {
    const [editingMode, setEditingMode] = useState(false)
    const [viewingMode, setViewingMode] = useState(false)
    const [unlockMode, setUnlockMode] = useState(isUnlocked)
    const [passwordMode, setPasswordMode] = useState(false)
    const [passwordError, setPasswordError]= useState(false)
    const [noteTitle, setNoteTitle] = useState(title);
    const [noteDescription, setNoteDescription] = useState(description)

    const editTitleRef = useRef(title)
    const editContentRef = useRef(description)
    const enteredPasswordRef = useRef("")
    
    useEffect(() => {
        setUnlockMode(isUnlocked)
    }, [isUnlocked])

    const editNote = () => {
        const updatedTitle = editTitleRef.current.value;
        const updatedContent = editContentRef.current.value;
        updateNote({_id: id, title: updatedTitle, description: updatedContent, isUnlocked: unlockMode})
        setNoteTitle(updatedTitle);
        setNoteDescription(updatedContent)
        setEditingMode(false)
    }

    const lockNote = async () => {
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, isUnlocked: false})
        })
        setUnlockMode(false)
    }

    const unlockNote = async () => {
        setPasswordMode(true)
    }
    
    const handleNoteView = async () => {
        console.log(password)
        if(enteredPasswordRef.current.value === password) {
            unlockNoteFn(id)
            setUnlockMode(true)
            setPasswordMode(false)
        } else {
            setPasswordError(true)
        }

    }


    return (
        <>
            { !editingMode && <> <h1>{noteTitle}</h1> <FontAwesomeIcon className={s.icon} size="2x" onClick={unlockMode ? lockNote : unlockNote} icon={unlockMode ? faUnlock : faLock} /> </> }
            { passwordMode && <> <h2>Enter your password </h2> <div style={{display: "flex", alignItems: "center"}}><input ref={enteredPasswordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password"/> <FontAwesomeIcon className={s.checkIcon} onClick={handleNoteView} icon={faCheckCircle} size="2x" /></div></>}
            <div className={!viewingMode ? s.buttonsContainer : s.viewingModeContainer}>
                {viewingMode && unlockMode && !editingMode &&
                <p className={s.contentTextView}>{noteDescription}</p>
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
        </>
    )
}


export default Note;