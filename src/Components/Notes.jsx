import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { v4 as uuid } from 'uuid';
import Note from './Note';

export default function Notes() {
    const [inputtext, setInputText] = useState('');
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem('notes');
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

    const handleSave = () => {
        if (inputtext.trim() !== '') {
            const newNote = {
                id: uuid(),
                text: inputtext.trim()
            };
            setNotes((prevNotes) => [...prevNotes, newNote]);
            setInputText('');
        }
    };

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };

    const handleEdit = (id, editedText) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === id ? { ...note, text: editedText } : note))
        );
    };

    useEffect(() => {
        window.localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    return (
        <div className=''>
            <div className='notes'>

                <div className='note'>
                    <textarea
                        cols={30}
                        rows={7}
                        placeholder='Write Here ..'
                        value={inputtext}
                        onChange={(e) => setInputText(e.target.value)}
                    ></textarea>
                    <div className='notefooter'>
                        <button className='Save' onClick={handleSave}>
                            Save
                        </button>
                    </div>
                </div>
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        id={note.id}
                        text={note.text}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
}
