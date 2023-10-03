class AppElement extends HTMLElement {

    constructor() {
      super();
      console.log("Este componente tiene los atributos: ", this.getAttributeNames());
      console.log("El valor del atributo «value» es ", this.getAttribute("value"));
      console.log("¿El atributo «is-enabled» existe? ", this.hasAttribute("is-enabled"));
    }
  }
  customElements.define("app-element", AppElement);