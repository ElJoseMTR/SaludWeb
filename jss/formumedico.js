document.addEventListener('DOMContentLoaded', async function() {

    const user = localStorage.getItem('user');
    const response = await fetch(`https://api-base-de-datos.onrender.com/getAllByDatosmedico/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (data.informacion === "Ya tiene formulario registrado") {
        
    } else {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
            backdrop: 'static',
            keyboard: false
        });
        myModal.show();
    
        document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault(); 
 
            myModal.hide();
        });
    }
});