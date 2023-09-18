import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './kanban.css';
import NewCardComponent from './newcard';
import TodoCard from './todocard';

const API_URL = 'https://arnia-kanban.vercel.app'; 

interface Card {
    id: number;
    title: string;
    content: string;
    status: 'new' | 'to-do' | 'doing' | 'done';
}

const Kanban = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [cards, setCards] = useState<Card[]>([]);
    const navigate = useNavigate();

    const fetchCards = useCallback(async () => {
        const token = localStorage.getItem('USER_TOKEN');
        if (!token) {
            console.error("No authorization token found. Redirecting to login...");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.get<Card[]>(`${API_URL}/api/card`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCards(response.data);
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    }, [navigate]);

    useEffect(() => {
        const name = localStorage.getItem('USER_NAME');
        if (name) {
            setUserName(name);
        }

        fetchCards();
    }, [fetchCards]);

    const handleEdit = async () => {
        fetchCards(); 
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/api/card/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('USER_TOKEN')
                }
            });
            // Update the local state by removing the deleted card
            setCards(prevCards => prevCards.filter(card => card.id !== id));
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleMove = async (id: number) => {
        try {
            await axios.put(`${API_URL}/api/card/${id}`, {
                status: 'doing'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('USER_TOKEN')
                }
            });
            fetchCards();
        } catch (error) {
            console.error('Error moving card:', error);
        }
    };

    const renderCards = (status: 'new' | 'to-do' | 'doing' | 'done') => {
        return cards.filter(card => card.status === status).map(card => (
            <TodoCard 
                key={card.id} 
                id={card.id} 
                title={card.title} 
                content={card.content}
                onEdit={handleEdit}
                onDelete={() => handleDelete(card.id)}
                onMove={() => handleMove(card.id)}
            />
        ));
    };

    return (
        <div className="kanban-container">
            <div className='topo'>
                <div>
                    <h1>Arnia Trello</h1>
                </div>
                <div className='menu'>
                    <div className='ola'>Olá, {userName ? userName : 'Visitante'}</div>
                    <div className='sair'>
                        <Link to="/login">Sair</Link>
                    </div>
                </div>
            </div>

            <div className='containers-bloco'>
                <div className='new containers'>
                    <div className='titulos'>New</div>
                    <NewCardComponent onCardAdded={fetchCards} />
                    {renderCards('new')}
                </div>

                <div className='to-do containers'>
                    <div className='titulos'>To Do</div>
                    {renderCards('to-do')}
                </div>

                <div className='doing containers'>
                    <div className='titulos'>Doing</div>
                    {renderCards('doing')}
                </div>

                <div className='done containers'>
                    <div className='titulos'>Done</div>
                    {renderCards('done')}
                </div>
            </div>
        </div>
    );
}

export default Kanban;