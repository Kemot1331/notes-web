import React, { useEffect } from "react";
import './AddNoteModal.css';
import ColorDotButton from './ColorDotButton';
import { useState } from 'react';

const AddNoteModalButton = ({ children }) => (
    <button className="add-note-modal-button">{children}</button>
);

export default function AddNoteModal({ isOpen,  onClose, initialColor }){
    const [selectedColor, setSelectedColor] = useState(initialColor || "#ffb3ba");

    useEffect(() => {
        if(isOpen){
            setSelectedColor(initialColor || "#ffb3ba");
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

    if(!isOpen) return null;

    const colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: selectedColor }}>
                <div className="title-container">
                    <input type="text" placeholder="Title of your note..." autoFocus/>
                </div>
                <div className="description-container">
                    <textarea name="" id="" placeholder="Take a note..." rows={10}></textarea>
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
                            <input type="checkbox"></input>
                            <span className="slider round"></span>
                        </label>
                    </div>   
                </div>
                <div className="bottom-buttons">
                    <AddNoteModalButton>Cancel</AddNoteModalButton>
                    <AddNoteModalButton>Save</AddNoteModalButton>
                </div>
            </div>
        </div>
    );
}