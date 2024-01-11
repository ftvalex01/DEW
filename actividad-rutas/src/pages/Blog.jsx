import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from '../components/CharactersProvider';

const Blog = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { characters, setCharacters } = useCharacters();
  const { data, error, loading } = useFetch(

    "https://rickandmortyapi.com/api/character",

  );

  // Actualiza el contexto cuando los datos se cargan
  useEffect(() => {
    if (data && data.results) {
      setCharacters(data.results);
    }
  }, [data, setCharacters]);

  if (loading) return <h3>Estamos cargando los datos....</h3>;
  if (error) return <h3>Error al cargar los datos...</h3>;

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ filter: value });
    } else {
      setSearchParams({});
    }
  };

  // Usa characters del contexto para filtrar
  const filteredData = characters.filter(item => 
    item.name.toLowerCase().includes(searchParams.get("filter")?.toLowerCase() || "")
  );

  return (
    <>
      <h1>Blog - Elige tu personaje favorito.</h1>
      <input
        type="text"
        name="filter"
        placeholder="busqueda"
        onChange={handleInputChange}
        className="form-control my-3"
        alt="buscador"
        value={searchParams.get("filter") || ""}
      />
      <ul className="list-group">
        {filteredData.map((item) => (
          <Link
            className="list-group-item"
            key={item.id}
            to={`/blog/${item.id}`}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </>
  );
};

export default Blog;
