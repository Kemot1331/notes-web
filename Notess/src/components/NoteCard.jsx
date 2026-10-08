import Button from './ui/Button';
import "./NoteCard.css";
import { useEffect, useRef, useState } from 'react';

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

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-EN', {day: 'numeric', month: 'short', year: 'numeric'});
}

export default function NoteCard({title, description, color, isPinned, date, onDelete, onTogglePin, createdAt, updatedAt}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cardRef = useRef(null);

    const dateToShow = updatedAt || createdAt;

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return(
        <div className="note-card" ref={cardRef} style={{backgroundColor: color}}>
            <div className="note-top-container">
                <p className="note-title">{title}</p>
            </div>
            {description && <p className="note-description">{description}</p>}
            <div className="note-footer">
                <span className="note-date">{dateToShow ? formatDate(dateToShow) : "No date"}</span>

                {isMenuOpen && <div className="note-actions-wrapper">
                    <div className='action-menu'>
                        <Button 
                            content={<TrashIcon />}
                            size={"5vh"}
                            onClick={onDelete}
                        />
                        <Button 
                            content={<PinIcon />}
                            size={"5vh"}
                            onClick={onTogglePin}
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