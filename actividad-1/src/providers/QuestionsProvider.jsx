import React, { createContext, useReducer, useContext } from 'react';
import { QuestionsReducer } from './QuestionsReducer';
const QuestionsContext = createContext();




export const useQuestions = () => useContext(QuestionsContext);

export const QuestionsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuestionsReducer, { questions: [], nextId: 1 });

  const addQuestion = nuevaPregunta => {
    dispatch({ type: 'AGREGAR_PREGUNTA', payload: nuevaPregunta });
  };

  const deleteQuestion = id => {
    dispatch({ type: 'BORRAR_PREGUNTA', payload: id });
  };

  return (
    <QuestionsContext.Provider value={{ questions: state.questions, addQuestion, deleteQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
};