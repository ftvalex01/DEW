import React from "react";
import {  NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container">
        <NavLink className="btn btn-outline-primary" to="/">home</NavLink>
        <br></br>
        <NavLink className="btn btn-outline-primary" to="/contacto">contacto</NavLink>
        <br></br>
        <NavLink className="btn btn-outline-primary" to="/blog">blog</NavLink>
      </div>
    </div>
  );
};

export default NavBar;
