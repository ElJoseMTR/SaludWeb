document.addEventListener('DOMContentLoaded', function () {
    const user = localStorage.getItem('user');
    if (user) {
        fetch(`https://api-base-de-datos.onrender.com/getmensajesuserAdmin/${user}`)
            .then(response => response.json())
            .then(data => {
                const messagesContainer = document.getElementById('admin-messages');
                if (data.error) {
                    messagesContainer.innerHTML = `<p>${data.error}</p>`;
                } else {
                    const groupedMessages = {};
                    const gropedAsunto = {};
                    data.forEach(message => {
                        const admin = message[0];
                        const asunto = message[3];
                        if (!groupedMessages[admin]) {
                            groupedMessages[admin] = [];
                            gropedAsunto[asunto] = [];
                        }
                        gropedAsunto[asunto].push(message);
                        groupedMessages[admin].push(message);
                    });

                    let messageHtml = '';
                    for (const admin in groupedMessages) {
                        for (const asunto in gropedAsunto) {
                            const adminId = admin.replace(/\s+/g, '-'); // Replace spaces with hyphens for IDs
                            messageHtml += `
                            <div class="card">
                                <div class="card-header" id="heading-${adminId}">
                                    <h5 class="mb-0">
                                        <div style="user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none;" data-toggle="collapse" data-target="#collapse-${adminId}" aria-expanded="true" aria-controls="collapse-${adminId}">
                                            Destinatario: ${admin} - Asunto: ${asunto} 
                                        </div>

                                    </h5>
                                </div>
                                <div id="collapse-${adminId}" class="collapse" aria-labelledby="heading-${adminId}" data-parent="#admin-messages">
                                    <div class="card-body">
                                    ${groupedMessages[admin].map(msg => `
                                        <div class="card mb-2">
                                            <div class="card-body">
                                                <p class="card-text"><strong>Asunto:</strong> ${msg[3]}</p>
                                                <p class="card-text"><strong>Mensaje:</strong> ${msg[2]}</p>
                                                <button class="btn btn-secondary" data-toggle="collapse" data-target="#response-${msg[0]}" aria-expanded="false" aria-controls="response-${msg[0]}">Responder</button>
                                                <button class="btn btn-secondary" onclick="viewResponses('${msg[3]}')">Ver Respuestas</button>
                                                <div id="response-${msg[0]}" class="collapse mt-2">
                                                    <div class="card card-body">
                                                        <form id="response-form-${msg[0]}" onsubmit="submitResponse(event, '${admin}', '${msg[3]}')">
                                                            <div class="form-group">
                                                                <label for="response-text-${msg[0]}">Escribe la respuesta:</label>
                                                                <textarea class="form-control" id="response-text-${msg[0]}" rows="3" required></textarea>
                                                            </div>
                                                            <button type="submit" class="btn btn-primary">Enviar</button>
                                                        </form>
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
                    }
                    messagesContainer.innerHTML = messageHtml;
                }
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    } else {
        const messagesContainer = document.getElementById('admin-messages');
        messagesContainer.innerHTML = `<p>No se encontró el usuario en localStorage.</p>`;
    }
});

function submitResponse(event, admin, asunto) {
    event.preventDefault();
    const user = localStorage.getItem('user');
    const responseText = document.getElementById(`response-text-${admin}`).value;

    fetch('https://api-base-de-datos.onrender.com/add_respuesta_admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: admin, usersdmin: user, asunto: asunto, mensaje: responseText })
    })
    .then(response => response.json())
    .then(data => {
        if (data.informacion === "Registro exitoso") {
            console.log('Respuesta enviada con éxito');
            // Aquí puedes agregar lógica adicional después de enviar la respuesta, como mostrar un mensaje de éxito
        } else {
            console.error('Error en el registro:', data.informacion);
        }
    })
    .catch(error => {
        console.error('Error enviando la respuesta:', error);
    });

    // Restablecer el formulario después de enviar la respuesta
    document.getElementById(`response-form-${admin}`).reset();
}

function viewResponses(asunto) {
    fetch(`https://api-base-de-datos.onrender.com/getrespuestasadmin/${asunto}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('responsesModalBody').innerHTML = `<p>${data.error}</p>`;
            } else {
                let responsesHtml = '<ul>';
                data.forEach(response => {
                    responsesHtml += `<li>${response[0]}</li>`;
                });
                responsesHtml += '</ul>';
                document.getElementById('responsesModalBody').innerHTML = responsesHtml;
            }
            $('#responsesModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching responses:', error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    // Event listener para el botón de recarga
    document.getElementById('reloadButton').addEventListener('click', function() {
        location.reload(); // Recarga la página
    });
});
