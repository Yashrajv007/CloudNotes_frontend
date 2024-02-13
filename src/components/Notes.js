import React, { useContext, useEffect, useRef, useState } from 'react'
import notecontext from "../context/notes/notecontext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const {mode}=props;
    let navigate = useNavigate();
    const context = useContext(notecontext);
    const { notes, getNotes, editNote,deleteNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const [deleteNoteId, setDeleteNoteId] = useState(null);

    const ref = useRef(null)
    const refClose = useRef(null)
    const ref1=useRef(null)
    const ref1Close=useRef(null)

    const handleclick = (e) => {
        console.log("updatng note", note)
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        
        props.showAlert("Updated Successfully", "success");
    }
    const handlechange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const deleteTheNote = (id) => {
        setDeleteNoteId(id);
        ref1.current.click();
    }

    const handleDelete=(id)=>{
        if (deleteNoteId) {
            deleteNote(deleteNoteId);
            ref1Close.current.click();
            setDeleteNoteId(null);
            props.showAlert("Note Deleted Successfully", "success");
        }
    }


    return (
        <>
            <Addnote mode={mode} showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#updateModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{backgroundColor:mode==='dark'?'#333333':'white'}}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5"  id="exampleModalLabel" style={{color:mode==='light'?'black':'white'}}>Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" style={{color:mode==='light'?'black':'white'}}>Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handlechange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" style={{color:mode==='light'?'black':'white'}}>Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={handlechange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" style={{color:mode==='light'?'black':'white'}}>Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handlechange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* delete modal */}
            <button type="button" ref={ref1} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#deleteModal">
                Launch demo modal
            </button>

        
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content" style={{backgroundColor:mode==='dark'?'#212529':'white'}}>
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel" style={{color:mode==='light'?'black':'white'}}>Delete Note</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{color:mode==='light'?'black':'white'}}>
                            <>Are you sure you want to delete the note?</>
                        </div>
                        <div class="modal-footer">
                            <button type="button" ref={ref1Close} class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                            <button type="button" class="btn btn-primary" onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-1">
                <h1 style={{color:mode==='light'?'black':'white'}}>Your notes</h1>
                <div className="container mx-2" style={{color:mode==='light'?'black':'white'}}>
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem mode={mode} key={note._id} showAlert={props.showAlert} deleteTheNote={deleteTheNote} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes

