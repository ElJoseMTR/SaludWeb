document.addEventListener('DOMContentLoaded', function () {
    function cargarUsuarios() {
        fetch('https://api-base-de-datos.onrender.com/obtener_usuario')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('totalUsuarios').textContent = data.length;
                const tablaUsuarios = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
                tablaUsuarios.innerHTML = '';

            
                data.forEach(usuario => {
                    const fila = tablaUsuarios.insertRow();
                    fila.innerHTML = `
                        <td>${usuario[0] || 'N/A'}</td>
                        <td>${usuario[1] || 'N/A'}</td>
                        <td>${usuario[2] || 'N/A'}</td>
                        <td>${usuario[3] || 'N/A'}</td>
                        <td>${usuario[4] || 'N/A'}</td>
                        <td>${usuario[5] || 'N/A'}</td>
                        <td>${usuario[6] || 'N/A'}</td>
                        <td>${usuario[7] || 'N/A'}</td>
                        <td>
                            <button class="btn btn-primary btn-sm editar" data-user="${usuario[0]}">Editar</button>
                            <button class="btn btn-danger btn-sm eliminar" data-user="${usuario[0]}">Eliminar</button>
                        </td>
                    `;
                });

        
                document.querySelectorAll('.editar').forEach(button => {
                    button.addEventListener('click', function () {
                        const user = this.getAttribute('data-user');
                        abrirModalEditarUsuario(user);
                    });
                });

                document.querySelectorAll('.eliminar').forEach(button => {
                    button.addEventListener('click', function () {
                        const user = this.getAttribute('data-user');
                        eliminarUsuario(user);
                    });
                });
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }

    function abrirModalEditarUsuarios(user) {
        fetch(`https://api-base-de-datos.onrender.com/obtener_usuariouser/${user}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); 
                document.getElementById('inputNombre').value = data.nombre || '';
                document.getElementById('inputApellido').value = data.apellido || '';
                document.getElementById('inputEdad').value = data.edad || '';
                document.getElementById('inputCarrera').value = data.carrera || '';
                document.getElementById('inputCuatrimestre').value = data.cuatrimestre || '';
                document.getElementById('inputDeporte').value = data.deporte || '';
                document.getElementById('inputGenero').value = data.genero || '';
                document.getElementById('inputUser').value = user;

                $('#modalEditarUsuario').modal('show');
            })
            .catch(error => console.error('Error al obtener datos del usuario:', error));
    }



    
    document.getElementById('formEditarUsuario').addEventListener('submit', function (event) {
        event.preventDefault();

        const user = document.getElementById('inputUser').value;
        const nombre = document.getElementById('inputNombre').value;
        const apellido = document.getElementById('inputApellido').value;
        const edad = document.getElementById('inputEdad').value;
        const carrera = document.getElementById('inputCarrera').value;
        const cuatrimestre = document.getElementById('inputCuatrimestre').value;
        const deporte = document.getElementById('inputDeporte').value;
        const genero = document.getElementById('inputGenero').value;

        fetch(`https://api-base-de-datos.onrender.com/updatedatos/${user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                carrera: carrera,
                cuatrimestre: cuatrimestre,
                deporte: deporte,
                genero: genero
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.informacion);
            $('#modalEditarUsuario').modal('hide');
            cargarUsuarios();
        })
        .catch(error => console.error('Error al actualizar usuario:', error));
    });

    function eliminarUsuarios(user) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            fetch(`https://api-base-de-datos.onrender.com/deletedatos/${user}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.informacion);
                cargarUsuarios();
            })
            .catch(error => console.error('Error al eliminar usuario:', error));
        }
    }

    cargarUsuarios();
});
