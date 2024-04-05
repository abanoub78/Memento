import React, { useState } from 'react';

export default function Note({ id, text, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleDelete = () => {
        onDelete(id);
    };

    const handleEdit = () => {
        onEdit(id, editedText);
        setIsEditing(false);
    };

    return (
        <div className='note'>
            {isEditing ? (
                <div className='notebody'>
                    <textarea
                        cols={30}
                        rows={7}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    ></textarea>
                </div>
            ) : (
                <div className='notebody'>{text}</div>
            )}
            <div className='notefooter'>
                {isEditing ? (
                    <button className='Save' onClick={handleEdit}>
                        Save
                    </button>
                ) : (
                    <>
                        <button className='del' onClick={handleDelete}>
                            Delete
                        </button>
                        <button className='edite' onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
