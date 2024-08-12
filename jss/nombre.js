document.addEventListener('DOMContentLoaded', function() {
    // Obtener el nombre de usuario de localStorage
    var username = localStorage.getItem('user');
    if (username) {
        // Actualizar el contenido del elemento con id 'username'
        document.getElementById('username').textContent = username;
    } else {
        document.getElementById('username').textContent = 'Invitado';
    }
});