import './Sidebar.css';

const Sidebar = (props) => {
  const noteElements = props.notes.map((note, index) => {
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.currentNote.id ? 'selected-note' : ''
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className='text-snippet'>Nota {index + 1}</h4>
        </div>
      </div>
    );
  });
  return (
    <section className='pane sidebar'>
      <div className='sidebar--header'>
        <h3>Notas</h3>
        <button className='new-note' onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
};

export default Sidebar;
