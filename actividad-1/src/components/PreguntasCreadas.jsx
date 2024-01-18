import React from 'react';
import Pregunta from './Pregunta';
import { useQuestions } from '../providers/QuestionsProvider';

const PreguntasCreadas = () => {
  const { questions, deleteQuestion } = useQuestions();

  return (
    <div>
        <ul className='group-list'>
            {questions.map((pregunta, index) => (
                <li key={index}>
                    <Pregunta pregunta={pregunta} borrarPregunta={deleteQuestion} />
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PreguntasCreadas;
