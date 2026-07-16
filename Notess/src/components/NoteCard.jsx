import Button from './Button';
import "./NoteCard.css";

const PencilIcon = () => (
<svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: "50%", height: "50%"}}
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const StarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="#ffd700"
    stroke="#ffd700" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: "60%", height: "60%" }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function NoteCard({title, color, isPinned, date}){
    return(
        <div className="note-card" style={{backgroundColor: color}}>
            <div className="note-top-container">
                <p className="note-title">{title}</p>
                {isPinned && (
                    <Button 
                        content={<StarIcon />}
                        size={"4vh"}
                    />
                )}
            </div>
            <div className="note-footer">
                <span className="note-date">{date || "No date"}</span>
                <Button
                    content={<PencilIcon />}
                    size={"5vh"}
                />
            </div>
        </div>
    );
}