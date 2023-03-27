import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Split from 'react-split';
import './App.css';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';

/*Features to add
 * Sync notes with localStorage (done!)
 * Add note summary titles
 * Move modified notes to the top of the list
 * Delete notes
 */

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: '# Escribe el titulo de tu nota aquí',
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function findCurrentNode() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  return (
    <div className='App'>
      <main>
        {notes.length > 0 ? (
          <Split sizes={[20, 80]} direction='horizontal' className='split'>
            <Sidebar
              notes={notes}
              currentNote={findCurrentNode()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNode()} updateNote={updateNote} />
            )}
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
