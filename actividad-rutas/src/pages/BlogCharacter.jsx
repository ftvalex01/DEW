import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCharacters } from '../components/CharactersProvider'; // Asegúrate de importar correctamente

const BlogCharacter = () => {
    const { characters } = useCharacters();
    const { id } = useParams();

    // Buscar el personaje específico en el array de personajes
    const character = characters.find(character => character.id === parseInt(id));

    if (!character) return (<h3>Personaje no encontrado...</h3>);

    return (
        <div className="card">
            <img src={character.image} className='card-img-top' alt="imagen"></img>
            <div className='card-body'>
                <h5 className='card-title'>{character.name}</h5>
                <p className='card-text'>{character.species}</p>
            </div>
            <Link to="/blog" className="btn btn-primary">Volver a Blog</Link>
        </div>
    );
};

export default BlogCharacter;
