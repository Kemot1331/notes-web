import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

function App(){
const dummyNotes = [
    { id: 1, title: 'This is Docket note.', color: '#ffb3ba' },
    { id: 2, title: 'The beginning of screenless design: UI jobs to be taken over by Solution Architect', color: '#ffdfba', date: 'May 21, 2020' },
    { id: 3, title: '13 Things You Should Give Up If You Want To Be a Successful UX Designer', color: '#ffffba', date: 'May 25, 2020' },
    { id: 4, title: '10 UI & UX Lessons from Designing My Own Product', color: '#baffc9' },
    { id: 5, title: '52 Research Terms you need to know as a UX Designer', color: '#bae1ff' },
  ];

  return(
    <div className="app-container">
     <Sidebar />
      <main>
        <SearchBar />
        <div className="main-title"><h1>Notes</h1></div>
        <div className="notes-grid">
          <NoteCard />
        </div>
      </main>
    </div>
  )
}

export default App