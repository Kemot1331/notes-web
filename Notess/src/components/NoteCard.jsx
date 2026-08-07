import Button from './Button';
import "./NoteCard.css";
import { useState } from 'react';

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

const TrashIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: "50%", height: "50%" }}
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0 1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PinIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ width: "50%", height: "50%" }}
  >
    <path d="M12 17v5" />
    <path d="M9 4h6" />
    <path d="M15 4v6.5l2 3.5H7l2-3.5V4" />
  </svg>
);

export default function NoteCard({title, color, isPinned, date}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <div className="note-card" style={{backgroundColor: color}}>
            <div className="note-top-container">
                <p className="note-title">{title}</p>
            </div>
            <div className="note-footer">
                <span className="note-date">{date || "No date"}</span>

                {isMenuOpen && <div className="note-actions-wrapper">
                    <div className='action-menu'>
                        <Button 
                            content={<TrashIcon />}
                            size={"5vh"}
                        />
                        <Button 
                            content={<PinIcon />}
                            size={"5vh"}
                        />
                    </div>
                </div>
                }

                <Button
                    content={<PencilIcon />}
                    size={"5vh"}
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                    }}
                />

                
            </div>
        </div>
    );
}