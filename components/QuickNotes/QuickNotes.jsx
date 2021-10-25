import s from "./QuickNotes.module.css"
import Note from "./Note";
import { useRef, useState } from "react";

import { faPenFancy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const QuickNotes = () => {
    const [notes, setNotes] = useState([])
    const [addingNote, setAddingNote] = useState(false)
    const titleRef = useRef(null)
    const contentRef = useRef(null);

    const addNote = () => {
        console.log(titleRef.current.value)
        const noteObj = { title: "Note", "Content" : "Hello there!" }
        setNotes([...notes, noteObj])
    }

    return (
        <div className={s.container}>
            <div onClick={() => setAddingNote(true)} className={s.addNoteBtn}>
                {!addingNote && 
                <> 
                    <h1> Add a Note</h1>
                    <FontAwesomeIcon size="2x" icon={faPenFancy} />
                </>
                }
                {addingNote && 
                <>
                    <form className={s.noteForm}>
                        <span>Title</span>
                        <input ref={titleRef} type="text" required />
                        <span>Content</span>
                        <textarea ref={contentRef} type="text" required ></textarea>
                    </form>
                    <FontAwesomeIcon onClick={addNote} size="2x" icon={faPenFancy} />
                </>
                }
            </div>
            {notes.map((note, i) => (
                <Note key={i} />
            ))}
        </div>
    )
}

export default QuickNotes;