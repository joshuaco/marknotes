import { useState } from 'react';
import Showdown from 'showdown';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import './Editor.css';

const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState('write');

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde 
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) => 
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={92}
        heightUnits="vh"
      />
    </section>
  )
};

export default Editor;
