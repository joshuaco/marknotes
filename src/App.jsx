import { nanoid } from 'nanoid';
import { useState } from 'react';
import Split from 'react-split';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: '# Escribe el titulo de tu nota aquí',
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  function findCurrentNode() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <div className='App'>
      <main>
        {notes.length > 0 ? (
          <Split 
          sizes={[20, 80]} 
          direction='horizontal' 
          className='split'
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNode()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor 
                currentNote={findCurrentNode()}
                updateNote={updateNote}
              />
            }
          </Split>
        ) : (
          <div className='no-notes'>
            <h1>No tienes notas creadas</h1>
            <button className='first-note' onClick={createNewNote}>
              Crear nota
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
