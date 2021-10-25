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
            <div className={s.addNoteBtn}>
                {!addingNote && 
                <> 
                    <h1> Add a Note</h1>
                    <FontAwesomeIcon onClick={() => setAddingNote(true)} size="2x" icon={faPenFancy} />
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
                <Note key={i} title={note.title} content={note.content} deleteNote={deleteNote}/>
            ))}
        </div>
    )
}

export default QuickNotes;