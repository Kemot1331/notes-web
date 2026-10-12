import { useEffect, useRef, useState } from "react";
import "./AddNoteModal.css";
import "./NoteDetailModal.css";
import ColorDotButton from "./ui/ColorDotButton";

const COLORS = ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9", "#bae1ff"];
const CLOSE_ANIMATION_MS = 200;

const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-EN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export default function NoteDetailModal({ isOpen, note, onClose, onSave }) {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [isClosing, setIsClosing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState(COLORS[0]);
    const [isPinned, setIsPinned] = useState(false);
    const [titleBlankError, setTitleBlankError] = useState(false);
    const mouseDownOnOverlay = useRef(false);

    // Fill the form with the selected note every time the modal opens
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            setTitle(note?.title ?? "");
            setDescription(note?.description ?? "");
            setColor(note?.color ?? COLORS[0]);
            setIsPinned(Boolean(note?.pinned));
            setTitleBlankError(false);
        } else if (shouldRender) {
            setIsClosing(true);
            const timeout = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, CLOSE_ANIMATION_MS);
            return () => clearTimeout(timeout);
        }
    }, [isOpen, note]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!shouldRender) return null;

    const hasChanges =
        Boolean(note) &&
        (title.trim() !== (note.title ?? "") ||
            description.trim() !== (note.description ?? "") ||
            color !== note.color ||
            isPinned !== Boolean(note.pinned));

    const showEdited = note?.updatedAt && note.updatedAt !== note.createdAt;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        if (titleBlankError) setTitleBlankError(false);
    };

    const handleSave = () => {
        if (!title.trim()) {
            setTitleBlankError(true);
            return;
        }
        // Nothing changed -> just close, no pointless PUT (and no updatedAt bump)
        if (!hasChanges) {
            onClose();
            return;
        }
        onSave(note.id, {
            title: title.trim(),
            description: description.trim(),
            color,
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

    return (
        <div
            className={`modal-overlay ${isClosing ? "closing" : ""}`}
            onMouseDown={handleOverlayMouseDown}
            onMouseUp={handleOverlayMouseUp}
        >
            <div
                className={`modal-content detail-modal ${isClosing ? "closing" : ""}`}
                style={{ backgroundColor: color }}
                role="dialog"
                aria-modal="true"
                aria-label="Note details"
            >
                <div className="title-container">
                    <input
                        type="text"
                        placeholder="Title of your note..."
                        value={title}
                        onChange={handleTitleChange}
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

                {note?.createdAt && (
                    <div className="note-meta">
                        <span>Created: {formatDateTime(note.createdAt)}</span>
                        {showEdited && <span>Edited: {formatDateTime(note.updatedAt)}</span>}
                    </div>
                )}

                <div className="switch-buttons-container">
                    <div className="color-dots-picker">
                        {COLORS.map((c) => (
                            <ColorDotButton
                                key={c}
                                color={c}
                                onClick={() => setColor(c)}
                                style={{
                                    border: color === c ? "2px solid #6b6868" : "none",
                                    height: "25px",
                                    width: "25px",
                                }}
                            />
                        ))}
                    </div>
                    <div className="switch-container">
                        <label className="switch">
                            <input
                                type="checkbox"
                                aria-label="Pinned"
                                checked={isPinned}
                                onChange={(e) => setIsPinned(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div className="bottom-buttons">
                    <button className="add-note-modal-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="add-note-modal-button" onClick={handleSave}>
                        Save changes
                    </button>
                </div>
                {titleBlankError && (
                    <div className="no-title-error">
                        <p>Title can't be blank!</p>
                    </div>
                )}
            </div>
        </div>
    );
}