document.addEventListener('DOMContentLoaded', function () {
    fetch('https://api-base-de-datos.onrender.com/usuarios_mayores_de_edad')
        .then(response => response.json())
        .then(data => {
            const ctxEdad = document.getElementById('edadChart').getContext('2d');
            new Chart(ctxEdad, {
                type: 'bar',
                data: {
                    labels: ['Usuarios mayores de edad', 'Usuarios menores de edad'],
                    datasets: [
                        {
                            label: 'Usuarios mayores de 18',
                            data: [data.mayores_de_18, 0],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Usuarios menores de 18',
                            data: [0, data.menores_de_18],
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

    fetch('https://api-base-de-datos.onrender.com/usuarios_por_carrera')
        .then(response => response.json())
        .then(data => {
            const ctxCarrera = document.getElementById('carreraChart').getContext('2d');
            new Chart(ctxCarrera, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(data),
                    datasets: [{
                        label: 'Cantidad de Usuarios por Carrera',
                        data: Object.values(data),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
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
        .catch(error => console.error('Error al obtener los datos de carreras:', error));


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