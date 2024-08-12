document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api-base-de-datos.onrender.com/getadminAll')
        .then(response => response.json())
        .then(data => {
            const destinatarioSelect = document.getElementById('destinatario');
            data.forEach(admin => {
                const option = document.createElement('option');
                option.value = admin.user;
                option.textContent = admin.user;
                destinatarioSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching administradores:', error));
});