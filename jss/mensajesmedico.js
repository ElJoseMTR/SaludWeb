document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('user');
    if (user) {
        fetch(`https://api-base-de-datos.onrender.com/getmensajesmedicos/${user}`)
            .then(response => response.json())
            .then(data => {
                const messagesContainer = document.getElementById('medico-messages');
                if (data.error) {
                    messagesContainer.innerHTML = `<p>${data.error}</p>`;
                } else {
                    const groupedMessages = {};
                    data.forEach(message => {
                        const medico = message[1];
                        if (!groupedMessages[medico]) {
                            groupedMessages[medico] = [];
                        }
                        groupedMessages[medico].push(message);
                    });

                    let messageHtml = '';
                    for (const medico in groupedMessages) {
                        const medicoId = medico.replace(/\s+/g, '-'); // Replace spaces with hyphens for IDs
                        messageHtml += `
                            <div class="card">
                                <div class="card-header" id="heading-${medicoId}">
                                    <h5 class="mb-0">
                                        <button class="bts" data-toggle="collapse" data-target="#collapse-${medicoId}" aria-expanded="true" aria-controls="collapse-${medicoId}">
                                            ${medico}
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapse-${medicoId}" class="collapse" aria-labelledby="heading-${medicoId}" data-parent="#medico-messages">
                                    <div class="card-body">
                                        ${groupedMessages[medico].map(msg => `
                                            <div class="card mb-2">
                                                <div class="card-body">
                                                    <p class="card-text"><strong>Asunto:</strong> ${msg[3]}</p>
                                                    <p class="card-text"><strong>Mensaje:</strong> ${msg[2]}</p>
                                                    <button class="btn btn-secondary" data-toggle="collapse" data-target="#response-${msg[0]}" aria-expanded="false" aria-controls="response-${msg[0]}" onclick="loadResponses('${msg[3]}', '${msg[0]}')">Respuestas</button>
                                                    <div id="response-${msg[0]}" class="collapse mt-2">
                                                        <div class="card card-body" id="responses-container-${msg[0]}">
                                                            <!-- Aquí se mostrarán las respuestas -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                    messagesContainer.innerHTML = messageHtml;
                }
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    } else {
        const messagesContainer = document.getElementById('medico-messages');
        messagesContainer.innerHTML = `<p>No se encontró el usuario en localStorage.</p>`;
    }
});

function loadResponses(asunto, messageId) {
    fetch(`https://api-base-de-datos.onrender.com/getrespuestasmedico/${asunto}`)
        .then(response => response.json())
        .then(data => {
            const responsesContainer = document.getElementById(`responses-container-${messageId}`);
            if (data.error) {
                responsesContainer.innerHTML = `<p>${data.error}</p>`;
            } else {
                const responsesHtml = data.map(response => `
                    <div class="card mb-2">
                        <div class="card-body">
                            <p class="card-text">${response[0]}</p>
                            <p>¿La respuesta te ayudó?</p>
                            <button class="btn btn-success" onclick="submitFeedback('${response[0]}', 'si', '${messageId}', '${asunto}')">Sí</button>
                            <button class="btn btn-danger" onclick="submitFeedback('${response[0]}', 'no', '${messageId}', '${asunto}')">No</button>
                        </div>
                    </div>
                `).join('');
                responsesContainer.innerHTML = responsesHtml;
            }
        })
        .catch(error => {
            console.error('Error fetching responses:', error);
        });
}

function submitFeedback(response, feedback, messageId, asunto) {
    if (feedback === 'si') {
        // Mostrar mensaje emergente para "sí"
        showModal('Perfecto, si necesitas algo no dudes en enviar mensaje.');

        // Eliminar respuesta y mensaje
        fetch(`https://api-base-de-datos.onrender.com/deleterespuestasmedico/${asunto}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return fetch(`https://api-base-de-datos.onrender.com/deletemensajesmedico/${asunto}`, { method: 'DELETE' });
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Eliminar el mensaje de la interfaz
                document.getElementById(`response-${messageId}`).parentElement.remove();
            })
            .catch(error => {
                console.error('Error deleting response or message:', error);
            });
    } else {
        // Mostrar mensaje emergente para "no"
        showModal('Ok, para solucionarte debes de enviar otro mensaje o al mismo administrador explicandole el caso o a otro administrador.');
        fetch(`https://api-base-de-datos.onrender.com/deleterespuestasmedico/${asunto}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                return fetch(`https://api-base-de-datos.onrender.com/deletemensajesmedico/${asunto}`, { method: 'DELETE' });
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Eliminar el mensaje de la interfaz
                document.getElementById(`response-${messageId}`).parentElement.remove();
            })
            .catch(error => {
                console.error('Error deleting response or message:', error);
            });
    }
}

function showModal(message) {
    const modalHtml = `
        <div class="modal" tabindex="-1" role="dialog" id="feedbackModal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mensaje</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    $('#feedbackModal').modal('show');
}
