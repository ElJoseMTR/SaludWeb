document.addEventListener('DOMContentLoaded', function () {
    function obtenerUsuarios() {
        fetch('https://api-base-de-datos.onrender.com/getuserAll')
            .then(response => response.json())
            .then(data => {
                document.getElementById('totalUsuarios').textContent = data.length;
                const tablaUsuarios = document.getElementById('tablaUsuarios').getElementsByTagName('tbody')[0];
                if (!$.fn.DataTable.isDataTable('#tablaUsuarios')) {
                    $('#tablaUsuarios').DataTable({
                        "paging": true,
                        "searching": true,
                        "ordering": true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.13.1/i18n/Spanish.json"
                        }
                    });
                }
    
                // Función para actualizar la tabla con los datos filtrados
                function actualizarTabla(datos) {
                    tablaUsuarios.innerHTML = '';
    
                    datos.forEach(usuario => {
                        const fila = tablaUsuarios.insertRow();
                        fila.innerHTML = `
                            <td>${usuario.user}</td>
                            <td>${usuario.correo}</td>
                            <td>${usuario.password}</td>
                            <td>
                                <button class="btn btn-info btn-sm ver" data-user="${usuario.user}">Ver</button>
                                <button class="btn btn-primary btn-sm editar" data-user="${usuario.user}">Editar</button>
                                <button class="btn btn-danger btn-sm eliminar" data-user="${usuario.user}">Eliminar</button>
                            </td>
                        `;
                    });
    
                    // Actualiza DataTables
                    $('#tablaUsuarios').DataTable().clear().rows.add($(tablaUsuarios).find('tr')).draw();
                }
    
                
    
                // Actualiza la tabla con todos los usuarios inicialmente
                actualizarTabla(data);

                document.querySelectorAll('.ver').forEach(button => {
                    button.addEventListener('click', function () {
                        const user = this.getAttribute('data-user');
                        mostrarModalVer(user);
                    });
                });

                document.querySelectorAll('.editar').forEach(button => {
                    button.addEventListener('click', function () {
                        const user = this.getAttribute('data-user');
                        mostrarModalEditar(user);
                    });
                });

                document.querySelectorAll('.eliminar').forEach(button => {
                    button.addEventListener('click', function () {
                        const user = this.getAttribute('data-user');
                        eliminarUsuario(user);
                    });
                });
                document.getElementById('searchUser').addEventListener('input', function () {
                    const searchTerm = this.value.toLowerCase();
                    const datosFiltrados = data.filter(usuario => usuario.user.toLowerCase().includes(searchTerm));
                    actualizarTabla(datosFiltrados);
                });
            })
            .catch(error => console.error('Error al obtener usuarios:', error));
    }

    function mostrarModalVer(user) {
        fetch(`https://api-base-de-datos.onrender.com/obtener_datosmedico/${user}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Usuario no encontrado');
                    return;
                }
                console.log(data);
                document.getElementById('verUser').textContent = data.user || '';
                document.getElementById('verF_ejercicios').textContent = data.frecuencia_ejercicio || '';
                document.getElementById('verT_ejercicios').textContent = data.tiempo_ejercicio || '';
                document.getElementById('vercomefrutas').textContent = data.comer_frutas || '';
                document.getElementById('verComeComida').textContent = data.comer_comida_chatarra || '';
                document.getElementById('verdormir').textContent = data.tiempo_dormir || '';
                document.getElementById('verfuma').textContent = data.fumas || '';
                document.getElementById('veralcohol').textContent = data.alcohol || '';
                document.getElementById('verMedico').textContent = data.frecuencia_medico || '';
                document.getElementById('verenfermedades').textContent = data.enfermedades || '';
    
                // Actualizar el atributo data-user de los botones
                
                document.getElementById('btnEliminar').setAttribute('data-user', user);
    
                $('#modalVerUsuario').modal('show');
            })
            .catch(error => console.error('Error al obtener datos del usuario:', error));
    }

    
    document.getElementById('btnEliminar').addEventListener('click', function() {
        const user = this.getAttribute('data-user');
        eliminardatosUsuario(user);
    });

    function eliminardatosUsuario(user) {
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
    

  

    function mostrarModalEditar(user) {
        fetch(`https://api-base-de-datos.onrender.com/getAllByUser/${user}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('inputCorreo').value = data.correo || '';
                document.getElementById('inputPassword').value = data.password || '';
                document.getElementById('inputUser').value = user;

                $('#modalEditarUsuario').modal('show');
            })
            .catch(error => console.error('Error al obtener datos del usuario:', error));
    }

    document.getElementById('formEditarUsuario').addEventListener('submit', function (event) {
        event.preventDefault();

        const user = document.getElementById('inputUser').value;
        const correo = document.getElementById('inputCorreo').value;
        const password = document.getElementById('inputPassword').value;

        fetch(`https://api-base-de-datos.onrender.com/updateuser/${user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: correo,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.informacion);
            $('#modalEditarUsuario').modal('hide');
            obtenerUsuarios();
        })
        .catch(error => console.error('Error al actualizar usuario:', error));
    });

    function eliminarUsuario(user) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            fetch(`https://api-base-de-datos.onrender.com/delete/${user}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert(data.informacion);
                obtenerUsuarios();
            })
            .catch(error => console.error('Error al eliminar usuario:', error));
        }
    }

    obtenerUsuarios();
});

