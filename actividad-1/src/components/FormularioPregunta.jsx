import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useQuestions } from '../providers/QuestionsProvider';

const FormularioPregunta = () => {
    const { addQuestion } = useQuestions();

    const [pregunta, setPregunta] = useState({
        enunciado: "Enunciado de la pregunta",
        respuesta1: "Respuesta 1",
        respuesta2: "Respuesta 2",
        respuesta3: "Respuesta 3",
        respuesta4: "Respuesta 4",
        respuestaCorrecta: -1,
        favorita: false
    });

    const handleChange = (e) => {
        let nuevoValor;
        if (e.target.type === 'checkbox') {
            nuevoValor = e.target.checked;
        } else if (e.target.type === 'radio') {
            nuevoValor = parseInt(e.target.value);
        } else {
            nuevoValor = e.target.value;
        }

        setPregunta({
            ...pregunta,
            [e.target.name]: nuevoValor
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addQuestion({...pregunta});
        Swal.fire({
            position: 'top-end',
            title: 'Pregunta añadida correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 1200
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="form-control mb-2"
                placeholder="Enunciado pregunta"
                name="enunciado"
                value={pregunta.enunciado}
                onChange={handleChange}
            />

         
            <div className="form-check mb-2">
                <input
                    type="radio"
                    name="respuestaCorrecta"
                    className="form-check-input"
                    id="inputCheck1"
                    value={1}
                    onChange={handleChange}
                    checked={pregunta.respuestaCorrecta === 1}
                />
                <input
                    type="text"
                    placeholder="Respuesta 1"
                    className="form-control mb-2"
                    name="respuesta1"
                    value={pregunta.respuesta1}
                    onChange={handleChange}
                />
            </div>
            <div className="form-check mb-2">
                <input
                    type="radio"
                    name="respuestaCorrecta"
                    className="form-check-input"
                    id="inputCheck2"
                    value={2}
                    onChange={handleChange}
                    checked={pregunta.respuestaCorrecta === 2}
                />
                <input
                    type="text"
                    placeholder="Respuesta 1"
                    className="form-control mb-2"
                    name="respuesta2"
                    value={pregunta.respuesta2}
                    onChange={handleChange}
                />
            </div>
            <div className="form-check mb-2">
                <input
                    type="radio"
                    name="respuestaCorrecta"
                    className="form-check-input"
                    id="inputCheck3"
                    value={3}
                    onChange={handleChange}
                    checked={pregunta.respuestaCorrecta === 3}
                />
                <input
                    type="text"
                    placeholder="Respuesta 3"
                    className="form-control mb-2"
                    name="respuesta3"
                    value={pregunta.respuesta3}
                    onChange={handleChange}
                />
            </div>
            <div className="form-check mb-2">
                <input
                    type="radio"
                    name="respuestaCorrecta"
                    className="form-check-input"
                    id="inputCheck4"
                    value={4}
                    onChange={handleChange}
                    checked={pregunta.respuestaCorrecta === 4}
                />
                <input
                    type="text"
                    placeholder="Respuesta 4"
                    className="form-control mb-2"
                    name="respuesta4"
                    value={pregunta.respuesta4}
                    onChange={handleChange}
                />
            </div>
           

            <div className="form-check form-switch form-check-reverse mb-2">
                <input
                    type="checkbox"
                    name="favorita"
                    className="form-check-input"
                    id="inputCheckFavourite"
                    checked={pregunta.favorita}
                    onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="inputCheckFavourite">Favorita</label>
            </div>

            <button type="submit" className="btn btn-primary">
                Agregar
            </button>
        </form>
    );
};

export default FormularioPregunta;
