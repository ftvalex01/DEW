import React from 'react';
import './App.css';
import FormularioPregunta from './components/FormularioPregunta';
import PreguntasCreadas from './components/PreguntasCreadas';
import { QuestionsProvider } from './providers/QuestionsProvider';

function App() {
  return (
    <QuestionsProvider>
      <div className="App">
        <FormularioPregunta />
        <PreguntasCreadas />
      </div>
    </QuestionsProvider>
  );
}

export default App;
