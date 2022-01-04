import s from "./QuickNotes.module.css"
import Note from "./Note";
import { useEffect, useRef, useState } from "react";
import { getSession } from "next-auth/client"
import { LoadingPage } from "../Loading";
import fetch from 'isomorphic-unfetch';
import  { Nav }  from "../Nav"
import icons from "../../icons"

const QuickNotes = () => {

    const [addingNote, setAddingNote] = useState(false)
    const [userSetup, setUserSetup] = useState(false)
    const [userPassword, setUserPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [username, setUsername] = useState("")

    const [notes, setNotes] = useState([])

    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const resetDataRef = useRef(false)
    const [updating, setUpdating] = useState([]);

    useEffect(async () => {

        if(!userSetup){
            const userObj = await getSession();
            setUsername(userObj.user.name)
            const fetchedNotes = await getNotes(userObj.user.name);
            const passwordObj = await getPassword(userObj.user.name);
            if(passwordObj.length){
                setUserSetup(true)
                setUserPassword(passwordObj[0].password)
            }

            if(fetchedNotes.length){
                setNotes(fetchedNotes)
            }
        }
        
        if(resetDataRef.current){
            const updatedNotes = await getNotes(username)
            setNotes([])
            setNotes(updatedNotes)
            resetDataRef.current = false;
        }
        
    }, [updating])

    const getPassword = async (user) => {
        const pass = await fetch("http://localhost:3000/api/notes/password", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User": user
            }
        });
        const { password } = await pass.json();
        return password
    }

    const getNotes = async (user) => {
        const res = await fetch('http://localhost:3000/api/notes', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "User": user
            }
        });
        const { data } = await res.json();
        return data;
    }

    const initiateUpdate = () => {
        resetDataRef.current = true;
        setUpdating([])
    }

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
                body: JSON.stringify({ user: username, password: password })
            })
            setUserPassword(password)
            setUserSetup(true)
        } else {
            setPasswordError(true)
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";
        }
    }

    const updateNote = async (obj) => {
        try {
            await fetch(`http://localhost:3000/api/notes/${obj._id}`,{
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({_id: obj.id, title: obj.title, description: obj.description, isUnlocked: obj.isUnlocked})
            })

            initiateUpdate()
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
        initiateUpdate()
    }

    
    const addNote = async () => {
        const titleValue = titleRef.current.value;
        const contentValue = contentRef.current.value;
        
        const form = { user: username, title: titleValue, description: contentValue, isUnlocked: true }

        try {
            await fetch('http://localhost:3000/api/notes', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "User": username
                },
                body: JSON.stringify(form)
            });

            initiateUpdate()

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

            initiateUpdate()
    
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className={s.container}>
        <Nav hide={false}/>
            {userSetup ? 
            <div className={s.notesContainer}>
                <div className={s.noteBtn}>
                    {!addingNote &&
                        <div className={s.addNoteContainer} onClick={() => setAddingNote(true)}> 
                            <span> Add a Note</span>
                            { icons.stickyNote3x }
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
                        <div className={s.checkIcon} onClick={addNote}>
                            { icons.checkCircle3x }
                        </div>
                    </>
                    }
                </div>
                {notes.map((note, i) => (
                    <div key={i} className={s.noteContainer} style={{animationDelay: `${i}00ms`}}>
                        <Note id={note._id} title={note.title} description={note.description} deleteNote={deleteNote} password={userPassword} updateNote={updateNote} isUnlocked={note.isUnlocked} unlockNoteFn={unlockNote}/>
                    </div>
                ))}
            </div> :  
            <div className={s.userSetupForm}>
                <h1>Please enter a password for your locked notes</h1>
                <form className={s.userSetUpFieldContainer}>               
                    <input ref={passwordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password" placeholder="Password" />
                    <input ref={confirmPasswordRef} className={!passwordError ? s.passwordField : s.passwordError} type="password" placeholder="Confirm Password" />
                    <div className={s.checkIcon} onClick={handleUserPassword}>
                        { icons.checkCircle3x }
                    </div>
                </form>
                { passwordError && <h3 style={{color:"red", fontWeight: "bold"}}>Passwords do not match! Try again</h3>}
            </div>
            }
            <LoadingPage />
        </div>
    )
}

export default QuickNotes;