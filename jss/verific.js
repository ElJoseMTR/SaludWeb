document.addEventListener('DOMContentLoaded',async function() {
    function verificarToken() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            
            const decoded = jwt_decode(token);
            console.log('Token decodificado:', decoded);

         
            const user = decoded.user;
            const password = decoded.password;
            const exp = decoded.exp;

           
            const ahora = Math.floor(Date.now() / 1000);
            if (ahora >= exp) {
                console.log('el token se fue');
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
                    }else{
                        window.location.href = '../../index.html';
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    }
                }else{
                    window.location.href = '../../index.html';
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else {
                console.log('user', user);
                console.log('contraseña', password);
            }
        } catch (error) {
            console.error('errors', error);
        }
    } else {
        
        window.location.href = '../../index.html';
    }
    }
});
setInterval(verificarToken, 5000);

