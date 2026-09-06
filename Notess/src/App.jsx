import { useEffect, useState } from 'react';
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import AddNoteModal from './components/AddNoteModal';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

const API_URL = 'http://localhost:8080/api/notes';

function App(){
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ffb3ba");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const notify = () => toast(toastMessage);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);

    try{
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error){
      console.error("Server error: ", error);
      setError("Failed to connect to the server. Please try again later.")
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
      setToastMessage("Note added successfully!")
      notify();
    } catch (error){
      console.log("An error corrupted after adding a note: ", error);
    }
  }

  const handleDeleteNote = async (id) => {
    try{
      await axios.delete(`${API_URL}/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error){
      console.error("An error occurred while deleting a note: ", error);
    }
  }

  const handleTogglePin = async (noteToToggle) => {
    try{
      const updatedNote = {
        title: noteToToggle.title,
        description: noteToToggle.description,
        color: noteToToggle.color,
        pinned: !noteToToggle.pinned
      };

      const response = await axios.put(`${API_URL}/${noteToToggle.id}`, updatedNote);

      setNotes((prevNotes) => prevNotes.map((note) => note.id === noteToToggle.id ? response.data : note));
    } catch (error){
      console.error("An error occurred while toggling pin status: ", error);
    }
  }
  return(
    <div className="app-container">
      {/*1.loading notes */}
      {isLoading && (
        <div className='handle-loading-and-error'>
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
        )
      }
      {/*2.server error*/}
      {error && (
        <div className='handle-loading-and-error'>
          <p style={{color: "#d9534f"}}>{error}</p>
        </div>
      )}
      {/* 3.no notes in db */}
      {!error && notes.length === 0 && isLoading == false && (
        <div className='handle-loading-and-error'>
          <p>No notes in the database. Click + to add the first one</p>
        </div>
      )}

     <Sidebar onColorSelect={handleColorSelect}/>
      <main>
        <button onClick={notify}>ttt</button>
        <SearchBar 
          value={searchQuery} onChange={setSearchQuery}
        />
        <div className="main-title"><h1>Notes</h1></div>
        {!error && notes.length > 0 && filterNotes.length === 0 && (
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
                  onDelete={() => handleDeleteNote(pinnedNote.id)}
                  onTogglePin={() => handleTogglePin(pinnedNote)}
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
                  onDelete={() => handleDeleteNote(note.id)}
                  onTogglePin={() => handleTogglePin(note)}
                />
              ))}
            </div>
          </>
        )}
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
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