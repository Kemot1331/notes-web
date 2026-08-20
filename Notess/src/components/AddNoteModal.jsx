import React from "react";
import './AddNoteModal.css';
import ColorDotButton from './ColorDotButton';
import { useState } from 'react';

const AddNoteModalButton = ({ children }) => (
    <button className="add-note-modal-button">{children}</button>
);

export default function AddNoteModal({ isOpen,  onClose}){
    const [selectedColor, setSelectedColor] = useState("#ffb3ba");
    if(!isOpen) return null;

    const colors = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="title-container">
                    <input type="text" placeholder="Title of your note..." autoFocus/>
                </div>
                <div className="description-container">
                    <textarea name="" id="" placeholder="Take a note..." rows={23}></textarea>
                </div>
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
                <div className="bottom-buttons">
                    <AddNoteModalButton>Cancel</AddNoteModalButton>
                    <AddNoteModalButton>Save</AddNoteModalButton>
                </div>
            </div>
        </div>
    );
}