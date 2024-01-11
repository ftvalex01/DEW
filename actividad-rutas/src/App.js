import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Blog from "./pages/Blog";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import BlogCharacter from "./pages/BlogCharacter";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CharactersProvider } from './components/CharactersProvider';

function App() {
  return (
    <div className="App">
      <NavBar />

      <h1>APP</h1>
      <CharactersProvider> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogCharacter />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CharactersProvider>
    </div>
  );
}

export default App;
