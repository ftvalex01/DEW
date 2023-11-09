document.addEventListener("DOMContentLoaded", function () {
    const messageForm = document.getElementById("message-form");
    const messageText = document.getElementById("message-text");
    const messageList = document.getElementById("message-list");

    messageForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const tweet = messageText.value.trim();

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
        messageText.value = "";

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
        messageList.appendChild(listItem);

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
