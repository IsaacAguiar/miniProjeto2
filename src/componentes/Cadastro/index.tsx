import React, { useState } from 'react';
import axios from 'axios';
import './cadastro.css';
import { useNavigate } from 'react-router-dom';

interface ServerError {
    message: string;
}

const Cadastro: React.FC = () => {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repetirSenha, setRepetirSenha] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };

    const handleCadastro = async () => {
        setFeedbackMessage(null);

        if (!validateEmail(email)) {
            setFeedbackMessage('Por favor, insira um e-mail válido.');
            return;
        }

        if (senha.length < 6) {
            setFeedbackMessage('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (senha !== repetirSenha) {
            setFeedbackMessage('As senhas não são iguais!');
            return;
        }

        try {
            const API_URL = "https://arnia-kanban.vercel.app/";
            const API_KEY = "52a8b954-e25d-4cc5-86e5-c32e92f994bb";

            const response = await axios.post(`${API_URL}api/user`, {
                email: email,
                password: senha,
                name: nomeUsuario
            }, {
                headers: {
                    "x-api-key": API_KEY
                }
            });

            if (response.status === 200) {
                setFeedbackMessage('Usuário cadastrado com sucesso!');
                navigate('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error.response?.data as ServerError;
                if (serverError?.message) {
                    setFeedbackMessage(`Erro ao cadastrar o usuário! ${serverError.message}`);
                } else {
                    setFeedbackMessage('Erro ao cadastrar o usuário! Por favor, tente novamente mais tarde.');
                }
            } else {
                setFeedbackMessage('Erro desconhecido ao cadastrar o usuário.');
            }
        }
    }

    return (
        <div className="cadastro-container">
            <h1>Arnia Trello</h1>
            <h3>Cadastro</h3>
            <label>
                Nome Completo:
                <div>
                    <input
                        type="text"
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                    />
                </div>
            </label>
            <label>
                E-mail:
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </label>
            <label>
                Senha:
                <div>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
            </label>
            <label>
                Repetir Senha:
                <div>
                    <input
                        type="password"
                        value={repetirSenha}
                        onChange={(e) => setRepetirSenha(e.target.value)}
                    />
                </div>
            </label>

            <div className='entrar-Cadastro'>
            <button onClick={handleCadastro} className='cadastrar'>Cadastrar</button>
            </div>

            {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
        </div>
    );
}

export default Cadastro;