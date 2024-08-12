document.addEventListener('DOMContentLoaded', function () {
  
    fetch('https://api-base-de-datos.onrender.com/usuarios_fuman')
        .then(response => response.json())
        .then(data => {
            const ctxEdad = document.getElementById('edadChart').getContext('2d');
            new Chart(ctxEdad, {
                type: 'bar',
                data: {
                    labels: ['Usuarios que fuman', 'Usuarios que no fuman'],
                    datasets: [
                        {
                            label: 'Usuarios que fuman',
                            data: [data.fuman, 0],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Usuarios que no fuman',
                            data: [0, data.no_fuman],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de edades:', error));

   
    fetch('https://api-base-de-datos.onrender.com/usuarios_alcohol')
        .then(response => response.json())
        .then(data => {
            const ctxEdad = document.getElementById('carreraChart').getContext('2d');
            new Chart(ctxEdad, {
                type: 'bar',
                data: {
                    labels: ['Usuarios que toman alcohol', 'Usuarios que no toman alcohol'],
                    datasets: [
                        {
                            label: 'Usuarios que toman alcohol',
                            data: [data.toman_alcohol, 0],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Usuarios que no toman alcohol',
                            data: [0, data.no_toman_alcohol],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            stepSize: 1
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de edades:', error));


    fetch('https://api-base-de-datos.onrender.com/usuarios_por_genero')
        .then(response => response.json())
        .then(data => {
            const ctxGenero = document.getElementById('generoChart').getContext('2d');
            new Chart(ctxGenero, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Cantidad de Usuarios por Género',
                        data: Object.values(data),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ' + context.raw;
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al obtener los datos de género:', error));
});