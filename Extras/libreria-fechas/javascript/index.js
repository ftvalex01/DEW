document.getElementById("formulario").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const dateInput = document.getElementById("date");
    const nombreInput = document.getElementById("nombre");
    const resultadoElement = document.getElementById("resultado");
  
    const fechaNacimiento = moment(dateInput.value);
    const nombreCompleto = nombreInput.value;
    const edad = moment().diff(fechaNacimiento, "years");
  
    resultadoElement.innerHTML = `Nombre completo: ${nombreCompleto}<br>Año de nacimiento: ${fechaNacimiento.format("YYYY")}`;
  
    if (edad < 18) {
      const fecha18 = fechaNacimiento.add(18, "years").format("YYYY");
      resultadoElement.innerHTML += `<br>Eres menor de edad, no podemos darte de alta hasta ${fecha18}`;
    } else if (edad === 18 || edad === 25) {
      resultadoElement.innerHTML += "<br>Premio, tienes un descuento especial del 20%";
    } else if (edad < 25) {
      resultadoElement.innerHTML += "<br>Tienes un 10% de descuento";
    } else {
      resultadoElement.innerHTML += "<br>Lo sentimos, pero no tienes descuento";
    }
  });
  