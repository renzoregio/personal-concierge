import s from "./QuickNotes.module.css"
import Note from "./Note";
import { useEffect, useRef, useState } from "react";
import ReturnHome  from "../Home/ReturnHome"

import fetch from 'isomorphic-unfetch';

import {  faCheckCircle, faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const QuickNotes = ({ fetchedNotes, password }) => {
    const [notes, setNotes] = useState(fetchedNotes)
    const [addingNote, setAddingNote] = useState(false)
    const [userSetup, setUserSetup] = useState(false)
    const [userPassword, setUserPassword] = useState(null)
    const [passwordError, setPasswordError] = useState(false)

    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    useEffect(() => {
        if(password.length){
            setUserSetup(true);
            setUserPassword(password[0].password)
        }
    })

    const handleUserPassword = async () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if(password === confirmPassword){
            await fetch("http://localhost:3000/api/notes/password", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password: password })
            })
            setUserPassword(password)
            setUserSetup(true)
        } else {
            setPasswordError(true)
        }
    }

    const updateNote = async (obj) => {
        try {
            await fetch(`http://localhost:3000/api/notes/${obj.id}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title: obj.title, description: obj.description, isUnlocked: obj.isUnlocked})
            })

            const res = await fetch('http://localhost:3000/api/notes');
            const { data } = await res.json();

            setNotes(data);
        } catch (error) {
            console.log(error)
        }
    }

    const unlockNote = async (id) => {
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isUnlocked: true})
        })

        const res = await fetch('http://localhost:3000/api/notes');
            const { data } = await res.json();

        setNotes(data);
    }

    
    const addNote = async () => {
        const titleValue = titleRef.current.value;
        const contentValue = contentRef.current.value;
        
        const form = { title: titleValue, description: contentValue, isUnlocked: true }

        try {
            await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            setNotes([...notes, form])

        } catch (error) {
            console.log(error)
        }

        setAddingNote(false)
    }

    const deleteNote = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/notes/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })

            const res = await fetch('http://localhost:3000/api/notes');
            const { data } = await res.json();

            console.log(data, "HI")

            setNotes(data)
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className={s.container}>
            {userSetup ? 
            <div className={s.notesContainer}>
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
                    <Note key={i} id={note._id} title={note.title} description={note.description} deleteNote={deleteNote} password={userPassword} updateNote={updateNote} isUnlocked={note.isUnlocked} unlockNoteFn={unlockNote}/>
                ))}
            </div> :  
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
            <ReturnHome />
        </div>
    )
}

QuickNotes.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();
    const pass = await fetch("http://localhost:3000/api/notes/password");
    const { password } = await pass.json();
    console.log(data)
    return { fetchedNotes: data, password};
}


export default QuickNotes;