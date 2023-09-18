import React, { useState } from 'react';
import maisImg from '../../assets/mais.png'
import axios from 'axios';
import './newcard.css'

const API_URL = 'https://arnia-kanban.vercel.app';
const API_KEY = '52a8b954-e25d-4cc5-86e5-c32e92f994bb';

const NewCardComponent: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddCard = async () => {
        try {
            await axios.post(`${API_URL}/api/card`, {
                title,
                content,
                status: 'to-do'
            }, {
                headers: {
                    'x-api-key': API_KEY
                }
            });
            
            window.location.reload();
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    return (
        <div className="new-card-container">
            <input className='newcard'
                type="text" 
                placeholder="Título" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea className='conteudoTexto'
                placeholder="Conteúdo" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
            />
            <div className='imagemMeio'>
                <img src={maisImg} alt="Add Card" onClick={handleAddCard} />
            </div>
            
        </div>
    );
};

export default NewCardComponent;