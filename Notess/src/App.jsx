
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
      <div className="side-bar">
        <div className="logo">Notess</div>
        <button className="add-btn">+</button>
        <div className="color-dots">
          <span className="dot" style={{ backgroundColor: '#ffb3ba' }}></span>
          <span className="dot" style={{ backgroundColor: '#ffdfba' }}></span>
          <span className="dot" style={{ backgroundColor: '#ffffba' }}></span>
          <span className="dot" style={{ backgroundColor: '#baffc9' }}></span>
          <span className="dot" style={{ backgroundColor: '#bae1ff' }}></span>
        </div>
      </div>
      <div className="search-bar-container">
        <input type="text" className="search-input" placeholder={'\ud83d\udd0e\ufe0e Search'}/>
      </div>
    </div>
  )
}

export default App