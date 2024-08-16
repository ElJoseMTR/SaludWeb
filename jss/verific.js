document.addEventListener('DOMContentLoaded', async function () {
    async function verificarToken() {
        const token = localStorage.getItem('token');

        if (token) {
            try {

                const decoded = jwt_decode(token);


                const user = decoded.user;
                const password = decoded.password;
                const exp = decoded.exp;


                const ahora = Math.floor(Date.now() / 1000);
                if (ahora >= exp) {

                    const respuesta = confirm("¿Quieres extender la seccion?");
                    if (respuesta) {

                        const response = await fetch(`https://api-base-de-datos.onrender.com/login?user=${user}&password=${password}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const data = await response.json();
                        if (data.informacion === "Inicio de sesión exitoso") {
                            localStorage.setItem('token', data.token);
                        } else {
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
                                    window.location.href = '../../index.html';
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                }
                            }
                        }
                    } else {
                        window.location.href = '../../index.html';
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                } else {

                }
            } catch (error) {
                console.error('errors', error);
            }
        } else {

            window.location.href = '../../index.html';
        }
    }
    setInterval(verificarToken, 5000);
});

