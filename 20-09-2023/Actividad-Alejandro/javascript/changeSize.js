var tamano = 1;
var tamanoOriginal = 1;
function modificarTexto(elEvento, pixel, parrafo ){
 var elemento = document.getElementById(parrafo);
 switch(elEvento){
 case 'aumentar':
     if(tamano > 2){
     alert('superado el tamaño máximo');
     break;
     }else{
     tamano = tamano + pixel;
     break;
     }
 case 'reducir':
     if(tamano < .9){
     alert('superado el tamaño minimo');
     break;
     }else{
     tamano = tamano - pixel;
     break;
     }
 case 'original':
     tamano = tamanoOriginal;
     break;
 }
 elemento.style.fontSize = tamano+'em';
   }
