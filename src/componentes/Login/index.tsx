import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

interface DataValues {
    email: string;
    password: string;
}

const API_URL = 'https://arnia-kanban.vercel.app/';
const API_KEY = '52a8b954-e25d-4cc5-86e5-c32e92f994bb';

const Login: React.FC = () => {
    const [data, setData] = useState<DataValues>({
        email: "",
        password: "",
    });
    const [tentativas, setTentativas] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    const handleLogin = async () => {
        if (!data.email || !data.password) {
            setTentativas((prev) => prev + 1);
            return;
        }
        
        try {
            const response = await axios.post(`${API_URL}api/user/login`, data, {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && response.data.token) {
                localStorage.setItem('USER_TOKEN', response.data.token);
                navigate('/kanban');
            } else {
                setErrorMessage('Login falhou.');
            }
        } catch (error) {
            setErrorMessage('Login falhou.');
        }
    };

    return (
        <div className="login-container">
            <h1>Arnia Trello</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <label>
                E-mail:
                <div>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData((prevData) => ({
                            ...prevData,
                            email: e.target.value
                        }))}
                    />
                </div>
            </label>

            <div>
                <label>
                    Senha:
                    <div>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData((prevData) => ({
                                ...prevData,
                                password: e.target.value
                            }))}
                        />
                    </div>
                </label>
            </div>

            <div className='entrar-Cadastro'>
                <button onClick={handleLogin} className='entrar'>ENTRAR</button>
                {tentativas >= 10 && <p>Limite Excedido</p>}
                <div>
                    <Link to="/cadastro">Cadastre-se</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;