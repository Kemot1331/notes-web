import { useEffect, useState } from 'react';
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AddNoteModal from './components/AddNoteModal';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const API_URL = 'http://localhost:8080/api/notes';

function App(){
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffb3ba");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    finally{
      setIsLoading(false);
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
      {isLoading &&
        <div className='loading'>
          <p>Loading notes...</p>
          <Oval
          height={80}
          width={80}
          color="#000"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#5a5e5a"
          strokeWidth={2}
          strokeWidthSecondary={2}
          />
        </div>
      }
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