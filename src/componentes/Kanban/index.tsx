import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './kanban.css';
import NewCardComponent from './newcard';

const API_URL = 'https://arnia-kanban.vercel.app'; 

interface Card {
    id: number;
    title: string;
    status: 'new' | 'to-do' | 'doing' | 'done';
}

const Kanban = () => {
    const [userName, setUserName] = useState<string | null>(null);
    const [cards, setCards] = useState<Card[]>([]); 

    useEffect(() => {
        const name = localStorage.getItem('USER_NAME');
        if (name) {
            setUserName(name);
        }

        axios.get<Card[]>(`${API_URL}/api/card`, {
            headers: {
                'x-api-key': '52a8b954-e25d-4cc5-86e5-c32e92f994bb'
            }
        })
        .then(response => {
            setCards(response.data);
        })
        .catch(error => {
            console.error("Error fetching cards:", error);
        });
    }, []);

    const renderCards = (status: 'new' | 'to-do' | 'doing' | 'done') => {
        return cards.filter(card => card.status === status).map(card => (
            <div key={card.id} className='card'>
                {card.title}
            </div>
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
                    <NewCardComponent />  {}
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