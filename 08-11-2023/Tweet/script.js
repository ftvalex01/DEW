document.addEventListener("DOMContentLoaded", function () {
    const tweetForm = document.getElementById("message-form");
    const tweetText = document.getElementById("message-text");
    const listaTweets = document.getElementById("message-list");

    tweetForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const tweet = tweetText.value.trim();

        if (tweet === "") {
            alert("Debe introducir el texto a añadir");
            return;
        }

        const tweetObj = {
            id: Date.now(),
            texto: tweet
        };

        // Guardar el mensaje en LocalStorage
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(tweetObj);
        localStorage.setItem("messages", JSON.stringify(messages));

        // Limpiar el formulario
        tweetText.value = "";

        // Mostrar el mensaje en la lista
        displayMessage(tweetObj);

    });

    // Cargar mensajes de LocalStorage al cargar la página
    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.forEach(displayMessage);

    function displayMessage(tweetObj) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${tweetObj.texto}
            <span class="delete-button" data-id="${tweetObj.id}">X</span>
        `;
        listaTweets.appendChild(listItem);

        // Agregar evento para borrar mensajes
        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            deleteMessage(tweetObj.id);
            listItem.remove();
        });
    }

    function deleteMessage(id) {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        const updatedMessages = messages.filter(message => message.id !== id);
        localStorage.setItem("messages", JSON.stringify(updatedMessages));
    }
});
