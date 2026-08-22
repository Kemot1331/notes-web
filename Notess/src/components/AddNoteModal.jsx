import { useEffect, useRef, useState } from "react";
import './AddNoteModal.css';
import ColorDotButton from './ColorDotButton';
 
const AddNoteModalButton = ({ children, onClick, disabled }) => (
    <button className="add-note-modal-button" onClick={onClick} disabled={disabled}>{children}</button>
);
 
const CLOSE_ANIMATION_MS = 200;
 
export default function AddNoteModal({ isOpen, initialColor, onClose, onSave }){
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedColor, setSelectedColor] = useState(initialColor || "#ffb3ba");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPinned, setIsPinned] = useState(false);
    const mouseDownOnOverlay = useRef(false);
 

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            setSelectedColor(initialColor || "#ffb3ba");
            setTitle('');
            setDescription('');
            setIsPinned(false);
        } else if (shouldRender) {
            setIsClosing(true);
            const timeout = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, CLOSE_ANIMATION_MS);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, initialColor]);

    useEffect(() => {
        if(!isOpen) return;
        const handleKeyDown = (e) => {
            if(e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);
 
    if (!shouldRender) return null;
 
    const colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];
 
    const handleSave = () => {
        if (!title.trim()) return;
        onSave({
            title: title.trim(),
            description: description.trim(),
            color: selectedColor,
            isPinned,
        });
    };
    const handleOverlayMouseDown = (e) => {
        mouseDownOnOverlay.current = e.target === e.currentTarget;
    };
 
    const handleOverlayMouseUp = (e) => {
        if (mouseDownOnOverlay.current && e.target === e.currentTarget) {
            onClose();
        }
        mouseDownOnOverlay.current = false;
    };
 
    return(
        <div
            className={`modal-overlay ${isClosing ? 'closing' : ''}`}
            onMouseDown={handleOverlayMouseDown}
            onMouseUp={handleOverlayMouseUp}
        >
            <div
                className={`modal-content ${isClosing ? 'closing' : ''}`}
                style={{ backgroundColor: selectedColor }}
            >
                <div className="title-container">
                    <input
                        type="text"
                        placeholder="Title of your note..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className="description-container">
                    <textarea
                        placeholder="Take a note..."
                        rows={10}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="switch-buttons-container">
                    <div className="color-dots-picker">
                        {colors.map((color) => (
                            <ColorDotButton 
                                key={color}
                                color={color}
                                onClick={() => setSelectedColor(color)}
                                style={{
                                    border : selectedColor === color ? '1px solid black' : 'none',
                                    height: '25px',
                                    width: '25px'
                                }}
                            />
                        ))}          
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isPinned}
                                onChange={(e) => setIsPinned(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>   
                </div>
                <div className="bottom-buttons">
                    <AddNoteModalButton onClick={onClose}>Cancel</AddNoteModalButton>
                    <AddNoteModalButton onClick={handleSave} disabled={!title.trim()}>Save</AddNoteModalButton>
                </div>
            </div>
        </div>
    );
}