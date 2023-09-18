import './App.css';
import Login from './componentes/Login';
import Cadastro from './componentes/Cadastro';
import Kanban from './componentes/Kanban';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;