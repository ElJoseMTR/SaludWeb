var contenedor_login_register = document.querySelector(".contenedor__login-register");
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var caja_trasera_login = document.querySelector(".caja__trasera-Login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");
var menuclicks = document.querySelector(".sidebar");

//boton ver contraseña
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('toggle-icon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function enviarMensajemedico() {
    const user = localStorage.getItem("user");
    const usermedico = document.getElementById("destinatario").value;
    const mensaje = document.getElementById("message").value;
    const asunto = document.getElementById("subject").value;

    if (!user || !usermedico || !mensaje || !asunto) {
        alert("Por favor complete todos los campos.");
        return;
    }

    const data = {
        user: user,
        usermedico: usermedico,
        mensaje: mensaje,
        asunto: asunto
    };

    fetch('https://api-base-de-datos.onrender.com/add_mensaje_medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.informacion);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al enviar el mensaje.");
        });
}
function enviarMensaje() {
    const user = localStorage.getItem("user");
    const userAdmin = document.getElementById("destinatario").value;
    const mensaje = document.getElementById("message").value;
    const asunto = document.getElementById("subject").value;

    if (!user || !userAdmin || !mensaje || !asunto) {
        alert("Por favor complete todos los campos.");
        return;
    }

    const data = {
        user: user,
        userAdmin: userAdmin,
        mensaje: mensaje,
        asunto: asunto
    };

    fetch('https://api-base-de-datos.onrender.com/add_mensaje_admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.informacion);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Hubo un error al enviar el mensaje.");
        });
}
//slap bar de principio1
document.addEventListener("DOMContentLoaded", function () {


    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('sidebar').style.display = 'block';
    });

    document.getElementById('menu-close').addEventListener('click', function () {
        document.getElementById('sidebar').style.display = 'none';
    });
});

//codigo para la parte del boton de salir de la sección

document.getElementById("salir").addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace navegue a otra página
    var confirmacion = confirm("¿Estás seguro que quieres salir?");
    if (confirmacion) {
        localStorage.removeItem('user');
        localStorage.removeItem('inicio')
        window.location.href = "../../index.html";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sendButton = document.getElementById('send-btn');

    if (!sendButton.getAttribute('data-event-click-registered')) {
        sendButton.addEventListener('click', sendMessage);
        sendButton.setAttribute('data-event-click-registered', 'true');
    }
});
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const user = localStorage.getItem('user'); // Obtener el nombre del usuario desde localStorage

    console.log('Usuario en localStorage:', user); // Mensaje de depuración

    if (userInput.trim() !== "") {
        addUserMessage(userInput, user); // Pasar el nombre del usuario
        document.getElementById('user-input').value = '';

        fetch('https://api-base-de-datos.onrender.com/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput, sender: user }) // Enviar el nombre del usuario
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data); // Mensaje de depuración
                if (data && data.length > 0) {
                    const botResponse = data[0].text;
                    addBotMessage(botResponse);

                    // Verifica si el mensaje del bot debe mostrar el modal
                    if (data[0].text === "Me alegra que estes bien, veo que aún no has completado las preguntas sobre tu salud. Voy a comenzar con algunas preguntas.") {
                        $('#preguntasModal').modal('show'); // Mostrar el modal de preguntas
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

//data table 
$(document).ready(function() {
    $('#tablaUsuarios').DataTable({
        // Configuración opcional
        "paging": true,         // Activar paginación
        "searching": true,      // Activar búsqueda
        "ordering": true,       // Activar organización por columnas
        "order": [[3, 'desc']], // Ordenar inicialmente por la cuarta columna (Fecha de Registro)
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/Spanish.json" // Cambiar el idioma a español
        }
    });
});


// Función para agregar el mensaje del usuario al chat
function addUserMessage(message, user) {
    const chatContainer = document.getElementById('chat-box');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message'; // Usa la clase para el estilo del mensaje del usuario
    userMessageElement.innerHTML = `<strong>${user}:</strong> ${message}`; // Usar el nombre del usuario
    chatContainer.appendChild(userMessageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para agregar el mensaje del bot al chat
function addBotMessage(message) {
    const chatContainer = document.getElementById('chat-box');
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'bot-message'; // Usa la clase para el estilo del mensaje del bot
    botMessageElement.innerHTML = `<strong>CHAT:</strong> ${message}`;
    chatContainer.appendChild(botMessageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Función para manejar el envío del formulario en el modal
function registerformulario(event) {
    event.preventDefault(); //

    const formData = new FormData(document.getElementById('myform'));

    fetch('', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            $('#myModal').modal('hide'); // Cierra el modal si el formulario se envió correctamente
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('send-btn').addEventListener('click', sendMessage);

// Asegúrate de que los elementos del DOM estén listos
document.addEventListener('DOMContentLoaded', () => {
    // Código a ejecutar cuando el DOM esté completamente cargado
});
//Termina codigo de ChatBot

function register() {
    if (window.innerWidth > 850) {
        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "410px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.opacity = "0";
        caja_trasera_login.style.opacity = "1";
    } else {

        formulario_register.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_login.style.display = "none";
        caja_trasera_register.style.display = "none";
        caja_trasera_login.style.display = "block";
        caja_trasera_login.style.opacity = "1";
    }

}


function enviarPreguntas() {
    const user = localStorage.getItem('user');
    const frecuencia_ejercicio = document.getElementById('F_ejercicio').value;
    const tiempo_ejercicio = document.getElementById('T_ejercicio').value;
    const comer_frutas = document.getElementById('C_frutas').value;
    const comer_comida_chatarra = document.getElementById('C_chatarras').value;
    const tiempo_dormir = document.getElementById('T_dormir').value;
    const fumas = document.getElementById('Fumas').value;
    const alcohol = document.getElementById('alcohol').value;
    const frecuencia_medico = document.getElementById('F_medico').value;
    const enfermedades = document.getElementById('enfermedad').value;

    const data = {
        user: user,
        frecuencia_ejercicio: frecuencia_ejercicio,
        tiempo_ejercicio: tiempo_ejercicio,
        comer_frutas: comer_frutas,
        comer_comida_chatarra: comer_comida_chatarra,
        tiempo_dormir: tiempo_dormir,
        fumas: fumas,
        alcohol: alcohol,
        frecuencia_medico: frecuencia_medico,
        enfermedades: enfermedades
    };

    fetch('https://api-base-de-datos.onrender.com/setPreguntasUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Éxito:', data);
            $('#preguntasModal').modal('hide'); // Cerrar el modal al enviar los datos
            agregar_recomendaciones();

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
//bot respuesta
async function agregar_recomendaciones() {
    const user = localStorage.getItem('user');
    fetch(`https://api-base-de-datos.onrender.com/verrespuestas_a_preguntas/${user}`)
        .then(response => response.json())
        .then(data => {
            if (data.informacion) {
                console.log(data.informacion);
                alert(data.informacion);
            } else {
                data.forEach(respuesta => {
                    const frecuenciaEjercicio = respuesta.frecuencia_ejercicio;
                    const tiempoEjercicio = respuesta.tiempo_ejercicio;
                    const comerFrutas = respuesta.comer_frutas;
                    const comerComidaChatarra = respuesta.comer_comida_chatarra;
                    const tiempoDormir = respuesta.tiempo_dormir;
                    const fumas = respuesta.fumas;
                    const alcohol = respuesta.alcohol;
                    const frecuenciaMedico = respuesta.frecuencia_medico;
                    const enfermedades = respuesta.enfermedades;

                    let recomendaciones;
                let diagnostico;
                if (frecuenciaEjercicio === "diariamente" && tiempoEjercicio === "2 horas" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas == "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades === "No") {
                    diagnostico = "Tu rutina de ejercicio es excelente, ya que realizas actividad física diariamente durante 2 horas, lo cual es muy beneficioso para tu salud cardiovascular y general. Comer frutas casi siempre es muy positivo y proporciona una buena dosis de vitaminas y antioxidantes. Limitar la comida chatarra a muy pocas veces ayuda a mantener una dieta equilibrada y saludable. Dormir 10 horas por noche es más de lo necesario para la mayoría de las personas, y puede ser beneficioso para la recuperación, pero si te sientes bien, podrías considerar ajustar el tiempo a 7-8 horas para optimizar tu ciclo de sueño. No fumar y no consumir alcohol son hábitos saludables que reducen el riesgo de enfermedades. Visitar al médico mensualmente es una excelente práctica para mantener un control regular de tu salud, aunque si te sientes bien, podrías ajustar la frecuencia a cada 6-12 meses, dependiendo de tus necesidades y recomendaciones del médico.";
                    recomendaciones = "Mantén tu rutina diaria de ejercicio y considera diversificar los tipos de actividad para seguir desafiando a tu cuerpo y mantener el interés. Continúa con tu excelente dieta, consumiendo frutas y evitando la comida chatarra, y asegúrate de que tu alimentación sea variada y balanceada para cubrir todos los grupos de nutrientes necesarios. Aunque 10 horas de sueño es suficiente, si te sientes bien, podrías considerar ajustar tu horario de sueño a 7-8 horas para mejorar tu rutina diaria y alinearte con las recomendaciones generales para la mayoría de las personas. Sigue con tus hábitos saludables de no fumar y no beber alcohol. La frecuencia de tus visitas al médico es adecuada, pero asegúrate de mantener un seguimiento regular con tu proveedor de salud para cualquier control adicional. Tu enfoque en el bienestar general es ejemplar y te ayudará a mantenerte en óptimas condiciones."
                } else if (frecuenciaEjercicio === "3 veces a la semana" && tiempoEjercicio === "2 horas" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades === "No") {
                    diagnostico = "Tu rutina de ejercicio es sólida, realizando actividad física 3 veces a la semana durante 2 horas cada sesión, lo cual es excelente para mantener un buen nivel de condición física. Comer frutas casi siempre y limitar el consumo de comida chatarra son prácticas muy positivas para tu salud general. Dormir 10 horas es adecuado, aunque la mayoría de las personas se benefician de 7 a 8 horas. No fumar y no consumir alcohol son hábitos muy beneficiosos para tu salud a largo plazo. Visitar al médico mensualmente para chequeos es una buena práctica para mantener un control preventivo. No tienes enfermedades, lo cual es excelente.";
                    recomendaciones = "Continúa con tu rutina de ejercicio de 3 veces a la semana y considera incluir una variedad de actividades para mantener el interés y trabajar diferentes grupos musculares. Asegúrate de que tu dieta sea balanceada, complementando las frutas con vegetales, proteínas y granos integrales para obtener todos los nutrientes necesarios. Aunque 10 horas de sueño es suficiente, podrías intentar ajustar tu horario de sueño a 7-8 horas para alinear mejor tu descanso con las recomendaciones generales y mejorar tu rutina diaria. Mantén tus hábitos de no fumar y no beber alcohol. Sigue con tus visitas mensuales al médico para asegurar un monitoreo continuo de tu salud. Estás en un excelente camino hacia un estilo de vida saludable.";
                } else if (frecuenciaEjercicio === "1 vez a la semana" && tiempoEjercicio === "2 horas" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades === "No") {
                    diagnostico = "Realizas ejercicio solo 1 vez a la semana durante 2 horas, lo cual es un buen comienzo, pero podría no ser suficiente para mantener una salud óptima. Comer frutas casi siempre y limitar la comida chatarra son hábitos positivos. Dormir 10 horas es adecuado, aunque la mayoría de las personas se benefician de 7 a 8 horas por noche. No fumar y no consumir alcohol son hábitos muy favorables para tu salud. Visitar al médico mensualmente es excelente para realizar un seguimiento preventivo. No tienes enfermedades, lo cual es una buena noticia.";
                    recomendaciones = "Te recomendaría aumentar la frecuencia de tus ejercicios. Intenta incorporar al menos 150 minutos de actividad moderada o 75 minutos de actividad intensa a la semana, distribuidos en más sesiones para mejorar tu condición física general. Mantén tu dieta rica en frutas y minimiza el consumo de comida chatarra, complementando con proteínas magras, vegetales y granos enteros. Aunque 10 horas de sueño son suficientes, considera ajustar tu horario de sueño a 7-8 horas para alinear mejor con las recomendaciones generales y mejorar tu energía diaria. Continúa con tus hábitos saludables de no fumar y no beber alcohol, y sigue realizando tus visitas mensuales al médico para monitorear tu salud de forma continua. Estás en un buen camino hacia un estilo de vida saludable, solo con algunos ajustes podrás optimizar aún más tu bienestar.";
                } else if (frecuenciaEjercicio === "nunca" && tiempoEjercicio === "0" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades === "No") {
                    diagnostico = "No realizar ejercicio en absoluto y no dedicar tiempo a la actividad física es un riesgo significativo para tu salud a largo plazo, incluso si tu tiempo de sueño es adecuado y tienes buenos hábitos alimenticios. Comer frutas casi siempre y limitar la comida chatarra son hábitos positivos que benefician tu salud. Dormir 10 horas puede ser adecuado, aunque generalmente se recomienda entre 7 y 8 horas para un descanso óptimo. No fumar ni consumir alcohol son prácticas excelentes. La frecuencia mensual de tus visitas al médico es ideal para mantener un control regular sobre tu salud, y el hecho de que no tengas enfermedades es una señal positiva.";
                    recomendaciones = "Es crucial comenzar a incorporar alguna forma de ejercicio en tu rutina diaria. Intenta empezar con actividades ligeras, como caminatas rápidas o ejercicios de bajo impacto, e incrementa gradualmente la intensidad. El objetivo es al menos 150 minutos de actividad moderada a la semana. Mantén tu dieta equilibrada y rica en frutas, y sigue evitando la comida chatarra. Aunque 10 horas de sueño son suficientes, podrías ajustar tu horario a 7-8 horas para mejorar tu energía y estado general. Continúa con tus buenos hábitos de no fumar ni beber alcohol, y sigue con tus visitas mensuales al médico para una vigilancia continua. Estos cambios te ayudarán a mejorar tu bienestar general y reducirás el riesgo de problemas de salud en el futuro.";
                } else if (frecuenciaEjercicio === "diariamente" && tiempoEjercicio === "10 minutos" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades !== "No") {
                    diagnostico = "Dedicar solo 10 minutos al ejercicio es muy limitado para la mayoría de las personas, especialmente si se tienen enfermedades. Aunque el tiempo es bueno para iniciar, no será suficiente para obtener beneficios óptimos para tu salud general. Comer frutas casi siempre y evitar la comida chatarra son buenos hábitos, y dormir 10 horas es positivo si te sientes bien. No fumar ni consumir alcohol es excelente, y la frecuencia mensual de tus visitas al médico es ideal, especialmente si tienes una enfermedad. La condición médica debe ser considerada en tu plan de ejercicio y dieta.";
                    recomendaciones = "Incrementa gradualmente el tiempo dedicado al ejercicio, siempre que tu condición médica lo permita y bajo la supervisión de tu médico. Intenta alcanzar al menos 150 minutos de actividad moderada a la semana, ajustando según tus necesidades y capacidades. Mantén una dieta rica en frutas y evita la comida chatarra, asegurándote de que sea adecuada para tu condición médica. Ajusta tu horario de sueño a 7-8 horas si es posible. Continúa con tus buenos hábitos de no fumar y no beber alcohol, y sigue las recomendaciones de tu médico sobre la frecuencia de visitas. Estos cambios ayudarán a mejorar tu bienestar general.";
                } else if (frecuenciaEjercicio === "diariamente" && tiempoEjercicio === "30 minutos" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades !== "No") {
                    diagnostico = "Dedicar 30 minutos al ejercicio es un buen comienzo, pero puede no ser suficiente para enfrentar problemas de salud específicos. Comer frutas casi siempre y limitar la comida chatarra son prácticas positivas. Dormir 10 horas es más de lo necesario, y podrías beneficiarte de ajustar tu sueño a 7-8 horas. No fumar ni consumir alcohol son hábitos saludables. La frecuencia mensual de tus visitas al médico es adecuada, pero es crucial seguir las indicaciones específicas relacionadas con tu enfermedad.";
                    recomendaciones = "Aumenta gradualmente el tiempo de ejercicio a 150 minutos de actividad moderada a la semana, si tu condición médica lo permite. Asegúrate de que el tipo y la intensidad del ejercicio sean apropiados para tu salud. Mantén una dieta balanceada, rica en frutas y ajustada a tus necesidades médicas. Aunque 10 horas de sueño son suficientes, podrías intentar ajustar a 7-8 horas para optimizar tu descanso. Continúa con tus buenos hábitos de no fumar y no beber alcohol, y sigue realizando visitas regulares al médico para un monitoreo continuo y ajustes específicos a tu condición.";
                } else if (frecuenciaEjercicio === "diariamente" && tiempoEjercicio === "1 hora" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades !== "No") {
                    diagnostico = "Dedicar 1 hora al ejercicio es adecuado y puede ser beneficioso, pero debes tener en cuenta cualquier limitación que tu condición médica pueda imponer. Comer frutas casi siempre y evitar la comida chatarra son hábitos positivos. Dormir 10 horas es más de lo necesario para la mayoría de las personas, considera ajustar a 7-8 horas si es posible. No fumar ni consumir alcohol es favorable para tu salud. La frecuencia mensual de visitas al médico es ideal para un seguimiento adecuado, especialmente si tienes una condición médica.";
                    recomendaciones = "Continúa dedicando 1 hora al ejercicio y ajusta la intensidad según tu condición médica. Mantén una dieta equilibrada, rica en frutas y adecuada para tu condición específica. Ajusta tu horario de sueño a 7-8 horas para mejorar tu energía diaria. Mantén tus hábitos de no fumar y no beber alcohol, y sigue las recomendaciones de tu médico sobre la frecuencia de visitas. Estos ajustes te ayudarán a mantener un estilo de vida saludable y manejar mejor tu condición médica.";
                } else if (frecuenciaEjercicio === "diariamente" && tiempoEjercicio === "2 hora" && comerFrutas === "casi siempre" && comerComidaChatarra === "muy pocas veces" && tiempoDormir === "10 horas" && fumas === "No" && alcohol === "No" && frecuenciaMedico === "mensualmente" && enfermedades !== "No") {
                    diagnostico = "Dedicar 2 horas al ejercicio es excelente, pero si tienes una enfermedad, es importante asegurarse de que la intensidad y el tipo de ejercicio sean adecuados para tu condición. Comer frutas casi siempre y evitar la comida chatarra son hábitos positivos. Dormir 10 horas es suficiente, aunque podrías considerar ajustar tu sueño a 7-8 horas. No fumar ni consumir alcohol es muy beneficioso. La frecuencia mensual de visitas al médico es ideal, especialmente para el seguimiento de tu condición médica.";
                    recomendaciones = "Mantén tu rutina de 2 horas de ejercicio, adaptándola a tus necesidades y condiciones específicas. Diversifica tus actividades para trabajar diferentes áreas del cuerpo y asegúrate de que sean seguras para tu salud. Continúa con una dieta equilibrada y ajustada a tus necesidades médicas. Ajusta tu horario de sueño a 7-8 horas para optimizar tu descanso y energía. Mantén tus buenos hábitos de no fumar y no beber alcohol, y sigue con las visitas regulares al médico para monitorear y ajustar tu plan de salud según sea necesario.";
                } else if (fumas === "si") {
                    diagnostico = "Fumar es un hábito que conlleva riesgos significativos para la salud, incluyendo un aumento en el riesgo de enfermedades respiratorias, enfermedades cardiovasculares, y varios tipos de cáncer. Aunque puedes tener una dieta equilibrada y realizar ejercicio, el tabaquismo contrarresta muchos de los beneficios de estos hábitos saludables. A pesar de tus buenos hábitos alimenticios y de ejercicio, fumar sigue siendo un factor de riesgo importante que puede afectar negativamente tu salud a largo plazo.";
                    recomendaciones = "Deja de fumar para mejorar significativamente tu salud. Fumar está relacionado con numerosos problemas de salud graves, por lo que dejar el hábito es una de las mejores acciones que puedes tomar para reducir riesgos y mejorar tu bienestar general. Considera buscar ayuda profesional, como programas de cesación, apoyo psicológico, o medicamentos específicos para dejar de fumar. Además, continuar con una dieta saludable, mantener un programa de ejercicio regular, y realizar visitas médicas periódicas te ayudará a recuperar y mantener una mejor salud a largo plazo.";
                } else if (alcohol === "si") {
                    diagnostico = "El consumo de alcohol puede tener efectos negativos en tu salud, especialmente si se consume en exceso. Puede contribuir a problemas de salud como enfermedades del hígado, trastornos cardiovasculares, y aumentar el riesgo de varios tipos de cáncer. Aunque mantienes una buena rutina de ejercicio, una dieta saludable y no fumas, el alcohol puede contrarrestar algunos de estos beneficios y afectar tu bienestar general.";
                    recomendaciones = "Modera o elimina el consumo de alcohol para mejorar tu salud y bienestar. Reducir la cantidad de alcohol que consumes o abstenerse completamente puede tener un impacto positivo en tu salud a largo plazo. Considera buscar apoyo o asesoramiento si tienes dificultades para reducir o eliminar el consumo de alcohol. Mantén tu dieta balanceada, sigue con tu rutina de ejercicio, y continúa realizando visitas médicas regulares para monitorear y mejorar tu salud general.";
                } else {
                    diagnostico = "Tu situación actual muestra una mezcla de hábitos saludables y áreas que podrían mejorarse. Aunque mantienes buenos hábitos en términos de dieta, evitar la comida chatarra y no fumar, hay aspectos que podrían beneficiarse de ajustes, como la frecuencia e intensidad del ejercicio y la cantidad de sueño. Es importante considerar un enfoque equilibrado para mantener y mejorar tu salud general.";
                    recomendaciones = "Te recomendaría realizar una evaluación completa de tus hábitos y ajustar las áreas que necesitan mejora. Intenta incorporar más actividad física a tu rutina, asegurándote de que sea adecuada para tu nivel de condición física. Mantén una dieta equilibrada y variada, complementando tus hábitos actuales con alimentos ricos en nutrientes. Ajusta tu patrón de sueño si es necesario para asegurar que obtengas un descanso adecuado. Sigue evitando hábitos dañinos como fumar y consumir alcohol. Mantén tus visitas regulares al médico para un seguimiento continuo y ajustar tus hábitos según sea necesario para mejorar tu bienestar general.";
                }

                const datadiagnostico = {
                    user: user,
                    text_diagnostico: diagnostico
                }

                const datarecomendaciones = {
                    user: user,
                    text_recomendaciones: recomendaciones
                }
                fetch('https://api-base-de-datos.onrender.com/setdiagnostico', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datadiagnostico)
                })
                    .then(response => response.json())
                    .catch((error) => {
                        console.error('Error:', error);
                    });


                fetch('https://api-base-de-datos.onrender.com/setrecomendaciones', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datarecomendaciones)
                })
                    .then(response => response.json())
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                });

            

            }
        })
        .catch(error => {
            console.error('Error al obtener las respuestas:', error);
        });
}



//registro


async function registerUser(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://api-base-de-datos.onrender.com/add_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, correo, password }),
    });

    const data = await response.json();
    alert(data.informacion);
}
//login
async function loginuser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`https://api-base-de-datos.onrender.com/login?user=${username}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (data.informacion === "Inicio de sesión exitoso") {
        window.location.href = '../html/estudiantes/principio1.html';
        localStorage.setItem('user', username);
        localStorage.setItem('inicio', 'on')
    } else {
        loginadmin(event);
    }
}

async function loginadmin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`https://api-base-de-datos.onrender.com/loginAdmin?user=${username}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (data.informacion === "Inicio de sesión exitosoo") {
        window.location.href = '../html/administrador/principio1admin.html';
        localStorage.setItem('user', username);
        localStorage.setItem('inicio', 'on')
    } else {
        loginmedico(event);
    }
}

async function loginmedico(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`https://api-base-de-datos.onrender.com/loginMedico?user=${username}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (data.informacion === "Inicio de sesión exitosoo") {
        window.location.href = '../html/medico/principio1medico.html';
        localStorage.setItem('user', username);
        localStorage.setItem('inicio', 'on')
    } else {
        alert("Lo siento, no has pasado");
    }
}


async function registerformulario(event) {
    event.preventDefault();
    const user = localStorage.getItem('user');
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const carrera = document.getElementById('carrera').value;
    const cuatrimestre = document.getElementById('cuatrimestre').value;
    const deporte = document.getElementById('deporte').value;
    const genero = document.getElementById('genero').value;

    const requestBody = {
        user,
        nombre,
        apellido,
        edad,
        carrera,
        cuatrimestre,
        deporte,
        genero
    };

    console.log("Enviando datos:", requestBody);

    const response = await fetch('https://api-base-de-datos.onrender.com/formulario_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Formulario enviado con éxito:", data);
    
        const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
        myModal.hide();
    } else {
        console.error("Error al enviar el formulario:", data);
    }
}


async function registerformularioadmin(event) {
    event.preventDefault();
    const user = localStorage.getItem('user');
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const CC = document.getElementById('CC').value;

    const requestBody = {
        user,
        nombre,
        apellido,
        edad,
        CC
    };

    console.log("Enviando datos:", requestBody);

    const response = await fetch('https://api-base-de-datos.onrender.com/formulario_admin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Formulario enviado con éxito:", data);
        
        const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
        myModal.hide();
    } else {
        console.error("Error al enviar el formulario:", data);
    }
}


async function registerformulariomedico(event) {
    event.preventDefault();
    const user = localStorage.getItem('user');
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const edad = document.getElementById('edad').value;
    const CC = document.getElementById('CC').value;

    const requestBody = {
        user,
        nombre,
        apellido,
        edad,
        CC
    };

    console.log("Enviando datos:", requestBody);

    const response = await fetch('https://api-base-de-datos.onrender.com/formulario_medico', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Formulario enviado con éxito:", data);
        // Cerrar el modal
        const myModal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
        myModal.hide();
    } else {
        console.error("Error al enviar el formulario:", data);
    }
}


function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll(".seccion");
    secciones.forEach(function (sec) {
        if (sec.id === seccion) {
            sec.classList.remove("hidden");
        } else {
            sec.classList.add("hidden");
        }
    });
    window.mostrarSeccion = mostrarSeccion;
}