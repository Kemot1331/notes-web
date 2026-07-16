import Button from './Button';
import "./NoteCard.css";

export default function NoteCard(){
    return(
        <div className="note-card">
            <div className="note-title">
                <p>Tymczasowy tytuł notatki</p>
            </div>
            <div className="note-footer">
                <span className="note-date">21 may 2022</span>
                <Button
                    content={"o"}
                    size={"2.5vh"}
                />
            </div>
        </div>
    );
}