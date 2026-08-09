import React from "react";
import './AddNoteModal.css';

export default function AddNoteModal({ isOpen,  onClose}){
    if(!isOpen) return null;

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                
            </div>
        </div>
    );
}