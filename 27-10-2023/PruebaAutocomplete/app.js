var countries = [];
var inputElem = null;
var resultsElem = null;

function init() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => (countries = data));

  resultsElem = document.querySelector("ul");
  inputElem = document.querySelector("input");

  resultsElem.addEventListener("click", (event) => {
    handleResultClick(event);
  });
  inputElem.addEventListener("keyup", (event) => {
      autocomplete(event);
  });
}

function marcarCoincidencias(textoCompleto, inputUser) {
  const inputLower = inputUser.toLowerCase();
  const partesTexto = textoCompleto.split(new RegExp(`(${inputUser})`, 'i'));
  return partesTexto.map(part => {
      if (part.toLowerCase() === inputLower) {
          return `<strong>${part}</strong>`;
      } else {
          return part;
      }
  }).join('');
} 



function autocomplete(event) {
  const value = inputElem.value;
  if (!value) {
    hideResults();
    inputElem.value = "";
    return;
  }
  const results = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(value.toLowerCase());
  })

  resultsElem.innerHTML = results
  .map((result, index) => {
    const isSelected = index === 0;
    return `
        <li
          id='autocomplete-result-${index}'
          class='autocomplete-result${isSelected ? " selected" : ""}'
          role='option'
          ${isSelected ? "aria-selected='true'" : ""}
        >
        ${marcarCoincidencias(result['name']['common'],value)}
        </li>
      `;
    })
    .join("");
  resultsElem.classList.remove("hidden");
}



function handleResultClick() {
  if (event.target && event.target.nodeName === "LI") {
    selectItem(event.target);
  }
}
function handleResultKeyDown(event) {
  const { key } = event;
  switch (key) {
    case "Backspace":
      return;
    default:
      selectFirstResult();
  }
}

function selectFirstResult() {
  const value = inputElem.value;
  const autocompleteValue = resultsElem.querySelector(".selected");
  if (!value || !autocompleteValue) {
    return;
  }
  if (value !== autocompleteValue.innerText) {
    inputElem.value = autocompleteValue.innerText;
    inputElem.setSelectionRange(
      value.length,
      autocompleteValue.innerText.length
    );
  }
}
function selectItem(node) {
  if (node) {
    inputElem.value = node.innerText;
    hideResults();
  }
}

function hideResults() {
  this.resultsElem.innerHTML = "";
  this.resultsElem.classList.add("hidden");
}



init();