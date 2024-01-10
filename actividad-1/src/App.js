
import { useState } from 'react';
import './App.css';
import FormularioPregunta from './components/FormularioPregunta';
import PreguntasCreadas from './components/PreguntasCreadas';
import Swal from 'sweetalert2';
function App() {

const [preguntas, setPreguntas] = useState([]);

const addQuestion = (nueva) =>{
nueva.id = preguntas.length + 1;

setPreguntas([...preguntas,nueva]);
}
const deleteQuestion = (id) => {
  Swal.fire({
    title: "BORRAR",
    text: "deseas borrar la pregunta",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "TU PREGUNTA HA SIDO BORRADO",
        icon: "success"
      });
      setPreguntas(preguntas.filter(pregunta => pregunta.id !== id));
    }
  });
};
 
  return (
    <div className="App">
    <FormularioPregunta objetoPregunta ={addQuestion}></FormularioPregunta>
    <PreguntasCreadas preguntas={preguntas} borrarPregunta={deleteQuestion}></PreguntasCreadas>
    </div>
  );
}

export default App;
