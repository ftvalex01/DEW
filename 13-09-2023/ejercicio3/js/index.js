let idiomaUsuario = prompt('¿Cual es tu idioma , español , ruso o inglés?');
    
    function mostrarMensaje(idiomaUsuario) {
            let mensaje = "";
            let color = "";

            switch (idiomaUsuario) {
                case 'español':
                    mensaje = "¡Viva el ron arehucas!";
                    color = "blue";
                    break;
                case 'ruso':
                    mensaje = "да здравствует водка!";
                    color = "red";
                    break;
                case 'inglés':
                    mensaje = "Paso las vacaciones en canarias.";
                    color = "green";
                    break;
                default:
                    mensaje = "Aqui solo hablamos ruso , inglés y español";
                    color = "black";
                    break;
            }

            document.getElementById("mensaje").textContent = mensaje;
            document.getElementById("mensaje").style.color = color;

            alert(mensaje);
            console.log(mensaje);
        }

        mostrarMensaje(idiomaUsuario);