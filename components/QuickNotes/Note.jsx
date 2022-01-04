import s from "./Note.module.css"
import fetch from 'isomorphic-unfetch';
import { useState, useRef, useEffect } from "react";
import icons from "../../icons";

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
        await fetch(`https://personal-concierge.vercel.app/api/notes/${id}`, {
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
        if(enteredPasswordRef.current.value === password) {
            unlockNoteFn(id)
            setUnlockMode(true)
            setPasswordMode(false)
        } else {
            setPasswordError(true)
            enteredPasswordRef.current.value = ""

        }

    }


    return (
        <>
            { !editingMode && <> <h1>{noteTitle}</h1> <div className={s.icon} onClick={unlockMode ? lockNote : unlockNote}> { unlockMode ? icons.unlock2x : icons.lock2x } </div></> }
            { passwordMode && <> <h2>Enter your password </h2> <div style={{display: "flex", alignItems: "center"}}><input ref={enteredPasswordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password"/> <div className={s.checkIcon} onClick={handleNoteView}> {icons.checkCircle2x} </div></div></>}
            <div className={!viewingMode ? s.buttonsContainer : s.viewingModeContainer}>
                {viewingMode && unlockMode && !editingMode &&
                <p className={s.contentTextView}>{noteDescription}</p>
                }
                {!editingMode ?
                <>
                    {!viewingMode ? 
                    <>
                        { unlockMode && <div className={s.icon} onClick={() => setEditingMode(true)}> {icons.penFancy2x} </div>  }
                        {!viewingMode && unlockMode && <button onClick={() => setViewingMode(true)} className={s.viewButton}>View</button>}
                        { unlockMode && <div className={s.trashBin} onClick={() => deleteNote(id)}> {icons.trash2x} </div>}
                    </> :
                    <div className={s.viewingModeIconsContainer}>
                        { unlockMode && <div className={s.icon} onClick={() => setEditingMode(true)}> {icons.penFancy2x} </div> }
                        {!viewingMode && unlockMode && <button onClick={() => setViewingMode(true)} className={s.viewButton}>View Note</button>}
                        { unlockMode && <div className={s.trashBin} onClick={() => deleteNote(id)}> {icons.trash2x} </div>}
                    </div>
                    }
                </> 
                :
                <div className={s.editingContainer}>
                    <div className={s.editingContentContainer}>
                        <input className={s.editTitle} type="text" defaultValue={title} ref={editTitleRef} />
                        <textarea className={s.editText} defaultValue={description} ref={editContentRef}></textarea>    
                    </div>
                    <div className={s.icon} onClick={editNote}> {icons.penFancy3x} </div>
                    <div className={s.closeBtn} onClick={() => setEditingMode(false)}> {icons.times2x} </div>
                </div> 
                }
            </div>
        </>
    )
}


export default Note;