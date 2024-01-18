import React, { createContext, useState, useContext } from 'react';

const QuestionsContext = createContext();

export const useQuestions = () => useContext(QuestionsContext);

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addQuestion = (newQuestion) => {
    newQuestion.id = nextId;
    setNextId(nextId + 1);
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion, deleteQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
};
