document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api-base-de-datos.onrender.com/getmedicosAll')
        .then(response => response.json())
        .then(data => {
            const destinatarioSelect = document.getElementById('destinatario');
            data.forEach(medico => {
                const option = document.createElement('option');
                option.value = medico.user;
                option.textContent = medico.user;
                destinatarioSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching administradores:', error));
});