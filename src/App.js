import React from 'react';
import PacienteList from './components/PacienteList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/medical.png" alt="Medical Icon" className="App-icon" />
        <h1>Gestão de Pacientes</h1>
      </header>
      <main>
        <PacienteList />
      </main>
    </div>
  );
}

export default App;

