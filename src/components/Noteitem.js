import React from 'react'

const Noteitem = (props) => {
    const { note, updateNote, deleteTheNote,mode } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-2"  style={{backgroundColor:mode==='light'?'white':'#212529'}}>
                    <div className="card-body">
                        <h5 className="card-title" style={{color:mode==='light'?'black':'white'}}>{note.title}</h5>
                        <p className="card-text" style={{color:mode==='light'?'black':'white'}}>{note.description} </p>
                        <i className="fa-solid fa-trash-can mx-2" style={{color:mode==='light'?'black':'white'}} onClick={()=>{deleteTheNote(note._id)}}></i>
                        <i className="fa-regular fa-pen-to-square mx-2" style={{color:mode==='light'?'black':'white'}} onClick={()=>{updateNote(note);}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
