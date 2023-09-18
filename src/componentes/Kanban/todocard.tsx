import React, { useState } from 'react';
import editarImg from '../../assets/editar.png';
import setaDireitaImg from '../../assets/setaDireita.png';
import lixeiraImg from '../../assets/lixeira.png';
import axios from 'axios';

const API_URL = 'https://arnia-kanban.vercel.app';

interface TodoCardProps {
    id: number;
    title: string;
    content: string;
    onEdit: () => void;
    onDelete: () => void;
    onMove: (newStatus: 'doing') => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ id, title, content, onEdit, onDelete, onMove }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);

    const handleEdit = async () => {
        try {
            await axios.put(`${API_URL}/api/card/${id}`, {
                title: editedTitle,
                content: editedContent,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('USER_TOKEN')
                }
            });
            setIsEditing(false);
            onEdit();
        } catch (error) {
            console.error('Error editing card:', error);
        }
    };

    return (
        <div className="todo-card-container">
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={editedTitle} 
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea 
                        value={editedContent} 
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button onClick={handleEdit}>Salvar</button>
                </div>
            ) : (
                <div>
                    <h3>{title}</h3>
                    <p>{content}</p>
                    <img src={editarImg} alt="Editar" onClick={() => setIsEditing(true)} />
                    <img src={setaDireitaImg} alt="Mover" onClick={() => onMove('doing')} />
                    <img src={lixeiraImg} alt="Deletar" onClick={onDelete} />
                </div>
            )}
        </div>
    );
};

export default TodoCard;
