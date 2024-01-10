
import { useState } from 'react';
import './App.css';
import FormularioPregunta from './components/FormularioPregunta';
import PreguntasCreadas from './components/PreguntasCreadas';
function App() {

const [preguntas, setPreguntas] = useState([]);

const addQuestion = (nueva) =>{
nueva.id = preguntas.length + 1;

setPreguntas([...preguntas,nueva]);
}
const deleteQuestion = (id) => {
  setPreguntas(preguntas.filter(pregunta => pregunta.id !== id));
};
 
  return (
    <div className="App">
    <FormularioPregunta objetoPregunta ={addQuestion}></FormularioPregunta>
    <PreguntasCreadas preguntas={preguntas} borrarPregunta={deleteQuestion}></PreguntasCreadas>
    </div>
  );
}

export default App;
