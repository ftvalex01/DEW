import {useRef} from "react";
 const NoControlado = () => {

    const form = useRef(null); //lo empezamos en null porque al crearlo no esta creada todavia el form
    //la diferencia con usar document.querySelector es que trabajamos con el DOM, y con useREF con el virtualDOM
    //Por lo tanto usamos useRef para hacer una referencia a nuestro código de REACT

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Click")
        console.log(form.current)
        //Usaremos FormData y es importante que nuestros elementos tengan el atributo name 
        let data= new FormData(form.current);
        console.log(...data.entries()) // el método entries devuelve una matriz de pares clave-valor de un objeto proporcionado
        //data entries nos proporciona los name con el valor
        //pero para que sea más cómodo de trabajar vamos a convertirlos en objetos
        const dataObject = Object.fromEntries([...data.entries()]); //el método .fromEntries convierte una lista de pares con clave-valor en un objeto
        console.log(dataObject);
        console.log(dataObject.state); // Podemos acceder directamente como atributos

        //Siempre podemos desestructurar los datos 
        const { title, description, state} = Object.fromEntries([...data.entries()]);
        console.log(title, description,state);

        //Haríamos validación de los campos
        if(!title.trim())
            console.log("Enviamos los datos");

        //Los formularios no controlados se controlan una vez el cliente pulsa el botón de Enviar, con los
        // formularios controlados podremos hacerlo en tiempo real
    }

    return (
        //react por defecto pasa el e del evento     
        //si ponemos id="form" manipulariamos el DOM directamente en lugar del DOM Virtual, y eso haría que se equivoque React
        <form onSubmit={handleSubmit} ref={form}>        
            <input
                type="text"
                placeholder= "Ingrese todo"
                className= "form-control mb-2"
                name="title"
            />
            <textarea
                className="form-control mb-2"
                placeholder="ingrese description"
                name="description"
            />
            <select className="form-select mb-2" name="state">
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completo</option>
            </select>
            <button type="submit" className="btn btn-priamry"> 
                Procesar
            </button>
        </form>
    )
}

export default NoControlado;
