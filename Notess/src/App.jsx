import { use, useState } from 'react';
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AddNoteModal from './components/AddNoteModal';

function App(){
const dummyNotes = [
    { id: 1, title: 'This is Docket note.', description: "Tymczasowa treść notatki...", color: '#ffb3ba', date: 'May 22, 2022', isPinned: false},
    { id: 2, title: 'The beginning of screenless design: UI jobs to be taken over by Solution Architect', description: "Tymczasowa treść notatki...", color: '#ffdfba', date: 'May 21, 2020', isPinned: true },
    { id: 3, title: '13 Things You Should Give Up If You Want To Be a Successful UX Designer', description: "Tymczasowa treść notatki...", color: '#ffffba', date: 'May 25, 2020', isPinned: false },
    { id: 4, title: '10 UI & UX Lessons from Designing My Own Product', description: "Tymczasowa treść notatki...", color: '#baffc9', date: 'May 22, 2022', isPinned: true },
    { id: 5, title: '52 Research Terms you need to know as a UX Designer', description: "Tymczasowa treść notatki...", color: '#bae1ff', isPinned: true},
  ];

  const [notes, setNotes] = useState(dummyNotes);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffb3ba");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setModalOpen(true);
  }

  const handleAddNote = ({title, description, color, isPinned}) => {
    const newNote = {
      id: Date.now(),
      title,
      description,
      color,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'}),
      isPinned,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setModalOpen(false);
  }

  return(
    <div className="app-container">
     <Sidebar onColorSelect={handleColorSelect}/>
      <main>
        <SearchBar />
        <div className="main-title"><h1>Notes</h1></div>
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              color={note.color}
              date={note.date}
              isPinned={note.isPinned}
            />  
          ))}
        </div>
      </main>
      <AddNoteModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialColor={selectedColor}
        onSave={handleAddNote}
      />
    </div>
  )
}

export default App