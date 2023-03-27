import './Sidebar.css';

const Sidebar = (props) => {
  const noteElements = props.notes.map((note, index) => {
    const title = note.body.split("\n")[0].split("#");
    return (
      <div key={note.id}>
        <div
          className={`title ${
            note.id === props.currentNote.id ? 'selected-note' : ''
          }`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className='text-snippet'>{title}</h4>
          <button 
            className="delete-btn"
            onClick={(event) => props.deleteNote(event, note.id)}>
            <i className="gg-trash trash-icon"></i>
          </button>
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
