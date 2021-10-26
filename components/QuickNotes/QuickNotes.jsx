import s from "./QuickNotes.module.css"
import Note from "./Note";
import { useRef, useState } from "react";

import { faCheck, faCheckCircle, faPenFancy, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const QuickNotes = () => {
    const [notes, setNotes] = useState([])
    const [addingNote, setAddingNote] = useState(false)
    const [userSetup, setUserSetup] = useState(false)
    const [userPassword, setUserPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)

    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const handleUserPassword = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if(password === confirmPassword){
            setUserPassword(password)
            setUserSetup(true)
        } else {
            setPasswordError(true)
        }
    }

    const addNote = () => {
        setAddingNote(false)
        const titleValue = titleRef.current.value;
        const contentValue = contentRef.current.value;
        console.log(contentValue)
        const noteObj = { title: titleValue, content: contentValue }
        setNotes([...notes, noteObj])
        titleRef.current.value = ""
        contentRef.current.value = ""
    }

    const deleteNote = (title) => {
        const filteredNotes = notes.filter(note => {
            if(note.title !== title){
                return note;
            }
        })
        setNotes([...filteredNotes])
    }
    
    return (
        <div className={s.container}>
            {userSetup ? 
            <>
                <div className={s.noteBtn}>
                    {!addingNote && 
                    <div className={s.addNoteContainer} onClick={() => setAddingNote(true)}> 
                        <span> Add a Note</span>
                        <FontAwesomeIcon  size="3x" icon={faStickyNote} />
                    </div>
                    }
                    {addingNote && 
                    <>
                        <form className={s.noteForm}>
                            <span>Title</span>
                            <input ref={titleRef} required type="text" />
                            <span>Content</span>
                            <textarea ref={contentRef} type="text" required ></textarea>
                        </form>
                        <FontAwesomeIcon className={s.checkIcon} onClick={addNote} size="3x" icon={faCheckCircle} />
                    </>
                    }
                </div>
                {notes.map((note, i) => (
                    <Note key={i} title={note.title} content={note.content} deleteNote={deleteNote} password={userPassword}/>
                ))}
            </> :  
            <div className={s.userSetupForm}>
                <h1>Please enter a password for your locked notes</h1>
                <form className={s.userSetUpFieldContainer}>               
                    <input ref={passwordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password" placeholder="Password" />
                    <input ref={confirmPasswordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password" placeholder="Confirm Password" />
                    <FontAwesomeIcon className={s.checkIcon} onClick={handleUserPassword} icon={faCheckCircle} size="3x" />
                </form>
                { passwordError && <h3 style={{color:"red", fontWeight: "bold"}}>Passwords do not match! Try again</h3>}
            </div>
            }
        </div>
    )
}

export default QuickNotes;