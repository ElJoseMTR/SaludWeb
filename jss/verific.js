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
                            
                            verificarTokenAdmin();
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
    async function verificarTokenAdmin() {
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
                        const response = await fetch(`https://api-base-de-datos.onrender.com/loginAdmin?user=${user}&password=${password}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const data = await response.json();
                        if (data.informacion === "Inicio de sesión exitoso") {
                            localStorage.setItem('token', data.token);
                        } else {
                            
                            if (data.informacion === "Inicio de sesión exitoso") {
                                localStorage.setItem('token', data.token);
                            } else {
                               verificarTokenMedico();
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
    async function verificarTokenMedico() {
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
                        const response = await fetch(`https://api-base-de-datos.onrender.com/loginMedico?user=${user}&password=${password}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });

                        const data = await response.json();
                        if (data.informacion === "Inicio de sesión exitoso") {
                            localStorage.setItem('token', data.token);
                        } else {
                            
                            if (data.informacion === "Inicio de sesión exitoso") {
                                localStorage.setItem('token', data.token);
                            } else {
                                window.location.href = '../../index.html';
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
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
    setInterval(verificarToken, 10000);
});


