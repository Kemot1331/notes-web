import { useEffect, useState } from 'react';
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AddNoteModal from './components/AddNoteModal';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes';

function App(){
// const dummyNotes = [
//     { id: 1, title: 'This is Docket note.', description: "Tymczasowa treść notatki...", color: '#ffb3ba', date: 'May 22, 2022', isPinned: false},
//     { id: 2, title: 'The beginning of screenless design: UI jobs to be taken over by Solution Architect', description: "Tymczasowa treść notatki...", color: '#ffdfba', date: 'May 21, 2020', isPinned: false },
//     { id: 3, title: '13 Things You Should Give Up If You Want To Be a Successful UX Designer', description: "Tymczasowa treść notatki...", color: '#ffffba', date: 'May 25, 2020', isPinned: false },
//     { id: 4, title: '10 UI & UX Lessons from Designing My Own Product', description: "Tymczasowa treść notatki...", color: '#baffc9', date: 'May 22, 2022', isPinned: false },
//     { id: 5, title: '52 Research Terms you need to know as a UX Designer', description: "Tymczasowa treść notatki...", color: '#bae1ff', isPinned: true},
//   ];

  const [notes, setNotes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffb3ba");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try{
      const response = await axios.get(API_URL);
      console.log(response.data);
      setNotes(response.data);
    } catch (error){
      console.error("Server error: ", error);
    }
  };

const filterNotes = notes.filter(note => {
    const lowerCaseQuery = searchQuery.trim().toLowerCase();
    return(
      note.title?.toLowerCase().includes(lowerCaseQuery) || 
      note.description?.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const pinnedNotes = filterNotes.filter((note) => note.pinned);
  const otherNotes = filterNotes.filter((note) => !note.pinned);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setModalOpen(true);
  }

  const handleAddNote = async ({title, description, color, isPinned}) => {
    try{
      const newNote = {
        title,
        description,
        color,
        pinned: isPinned
      };

      const response = await axios.post(API_URL, newNote);

      setNotes((prevNotes) => [response.data, ...prevNotes]);
      setModalOpen(false);
    } catch (error){
      console.log("An error corrupted after adding a note: ", error);
    }
  }

  return(
    <div className="app-container">
     <Sidebar onColorSelect={handleColorSelect}/>
      <main>
        <SearchBar 
          value={searchQuery} onChange={setSearchQuery}
        />
        <div className="main-title"><h1>Notes</h1></div>
        {filterNotes.length === 0 && (
          <p className='note-classification'>No notes match "{searchQuery}"</p>
        )}
        {pinnedNotes.length > 0 && (
          <>
            <p className='note-classification'>Pinned</p>
            <div className='notes-grid'>
              {pinnedNotes.map((pinnedNote) => (
                <NoteCard
                  key={pinnedNote.id}
                  title={pinnedNote.title}
                  description={pinnedNote.description}
                  color={pinnedNote.color}
                  date={pinnedNote.date}
                  isPinned={pinnedNote.isPinned}
                />
              ))}
            </div>
          </>
        )}
        {otherNotes.length > 0 && (
          <>
            {pinnedNotes.length > 0 && <p className='note-classification'>Other</p>}
            <div className="notes-grid">
              {otherNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  description={note.description}
                  color={note.color}
                  date={note.date}
                  isPinned={note.isPinned}
                />
              ))}
            </div>
          </>
        )}
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