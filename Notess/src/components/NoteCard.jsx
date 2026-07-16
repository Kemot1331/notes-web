
export default function NoteCard({title, color, dateAdded, isPinned}){
    return(
        <div className="note-conatiner" style={{ backgroundColor: color }}>
            <div className="note-title">
                <p>Przykładowy tytuł notatki</p>
            </div>
        </div>
    );
}