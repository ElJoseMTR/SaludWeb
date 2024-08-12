function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.seccion').forEach(function(seccion) {
        seccion.classList.add('d-none');
    });

    // Mostrar la sección seleccionada
    var seccionSeleccionada = document.getElementById(seccionId);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.remove('d-none');
    }
}
