// Cálculo de IMC
document.getElementById('imcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const altura = parseFloat(document.getElementById('altura').value) / 100;
    const peso = parseFloat(document.getElementById('peso').value);
    const imc = (peso / (altura * altura)).toFixed(2);
    document.getElementById('resultadoIMC').innerText = 'Tu IMC es: ' + imc;
});

// Cálculo de Calorías Diarias
document.getElementById('caloriasForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const edad = parseInt(document.getElementById('edad').value);
    const peso = parseFloat(document.getElementById('pesoCalorias').value);
    const altura = parseFloat(document.getElementById('alturaCalorias').value);
    const genero = document.getElementById('genero').value;
    const actividad = document.getElementById('actividad').value;

    let bmr;
    if (genero === 'masculino') {
        bmr = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
    } else {
        bmr = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
    }

    let factorActividad;
    switch (actividad) {
        case 'sedentario':
            factorActividad = 1.2;
            break;
        case 'ligera':
            factorActividad = 1.375;
            break;
        case 'moderada':
            factorActividad = 1.55;
            break;
        case 'intensa':
            factorActividad = 1.725;
            break;
    }

    const calorias = (bmr * factorActividad).toFixed(2);
    document.getElementById('resultadoCalorias').innerText = 'Calorías diarias: ' + calorias;
});

// Cálculo de Porcentaje de Grasa Corporal
document.getElementById('grasaCorporalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const altura = parseFloat(document.getElementById('alturaGrasa').value);
    const cuello = parseFloat(document.getElementById('circunferenciaCuello').value);
    const cintura = parseFloat(document.getElementById('circunferenciaCintura').value);
    const cadera = parseFloat(document.getElementById('circunferenciaCadera').value);

    let grasaCorporal;
    if (document.getElementById('genero').value === 'masculino') {
        grasaCorporal = (495 / (1.0324 - 0.19077 * Math.log10(cintura - cuello) + 0.15456 * Math.log10(altura)) - 450).toFixed(2);
    } else {
        grasaCorporal = (495 / (1.29579 - 0.35004 * Math.log10(cintura + cadera - cuello) + 0.22100 * Math.log10(altura)) - 450).toFixed(2);
    }

    document.getElementById('resultadoGrasa').innerText = 'Porcentaje de grasa corporal: ' + grasaCorporal + '%';
});

// Cálculo de Frecuencia Cardicaca
document.getElementById('frecuenciaCardiacaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const edad = parseInt(document.getElementById('edadCardiaca').value);
    const frecuenciaMax = 220 - edad;
    document.getElementById('resultadoCardiaca').innerText = 'Frecuencia Cardíaca Máxima: ' + frecuenciaMax + ' bpm';
});