import React from 'react';
import Pregunta from './Pregunta';

const PreguntasCreadas = ({ preguntas,borrarPregunta }) => {

  return (
    <div>
        <ul className='group-list'>
            {preguntas.map((pregunta, index) => (
                <li key={index}>
                    <Pregunta pregunta={pregunta}  borrarPregunta={borrarPregunta}/>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PreguntasCreadas;
