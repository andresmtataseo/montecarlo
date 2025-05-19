// Función principal para calcular la integral
function calcularIntegral() {
  const numSimulaciones = document.getElementById("numSimulaciones").value;
  const integralSelect = document.getElementById("integralSelect").value;
  const integralReal = getIntegralReal(integralSelect);
  const rango = getRango(integralSelect);

  let sum = 0;
  let puntos = [];
  for (let i = 0; i < numSimulaciones; i++) {
    const x = Math.random() * (rango.max - rango.min) + rango.min; // Rango de la integral
    const fx = evaluarFuncion(x, integralSelect); // Función de la integral específica
    sum += fx;
    puntos.push({ x: x, y: fx });
  }

  // Cálculo del resultado aproximado y del porcentaje de error
  const resultadoAprox = ((rango.max - rango.min) * sum) / numSimulaciones;
  const errorPorc =
    Math.abs((integralReal - resultadoAprox) / integralReal) * 100;

  // Mostrar resultados en la interfaz de usuario
  document.getElementById("resultadoMat").textContent = integralReal.toFixed(2);
  document.getElementById("resultadoAprox").textContent =
    resultadoAprox.toFixed(2);
  document.getElementById("errorPorc").textContent = errorPorc.toFixed(2) + "%";

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.classList.remove("d-none");
  
  // Dibujar gráfico de resultados
  dibujarGrafico(puntos, integralSelect);
}

// Obtener el rango de integración basado en la selección
function getRango(integralSelect) {
  switch (integralSelect) {
    case "1":
      return { min: 2, max: 3 };
    case "2":
      return { min: 4, max: 6 };
    case "3":
      return { min: 0, max: 9 };
    default:
      return { min: 2, max: 3 }; // Valor por defecto
  }
}

// Obtener el valor real de la integral basado en la selección
function getIntegralReal(integralSelect) {
  switch (integralSelect) {
    case "1":
      return 16; // Valor real de la integral 1
    case "2":
      return 1994; // Valor real de la integral 2
    case "3":
      return 43.36; // Valor real de la integral 3 (aproximado)
    default:
      return 16; // Valor por defecto
  }
}

// Evaluar la función de la integral específica basada en la selección
function evaluarFuncion(x, integralSelect) {
  switch (integralSelect) {
    case "1":
      return 3 * x + (2 / 3) * Math.log(16); // Función de la integral 1
    case "2":
      return 5 * x + Math.pow(3, x); // Función de la integral 2
    case "3":
      return x + 1 / Math.PI; // Función de la integral 3
    default:
      return 3 * x + (2 / 3) * Math.log(16); // Función por defecto
  }
}

// Dibujar gráfico con los resultados de las simulaciones
function dibujarGrafico(puntos, integralSelect) {
  const ctx = document.getElementById("grafico").getContext("2d");
  ctx.clearRect(0, 0, 600, 400);

  // Ejes
  const padding = 50;
  ctx.beginPath();
  ctx.moveTo(padding, 350);
  ctx.lineTo(550, 350);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(padding, 350);
  ctx.lineTo(padding, 50);
  ctx.stroke();

  // Etiquetas de los ejes
  ctx.font = "12px Arial";
  ctx.fillText("Y", 30, 45);
  ctx.fillText("X", 555, 370);

  // Medidas en el eje x
  for (let i = 0; i <= 10; i++) {
    let x = padding + i * 50;
    ctx.beginPath();
    ctx.moveTo(x, 345);
    ctx.lineTo(x, 355);
    ctx.stroke();
    ctx.fillText(i, x - 5, 365);
  }

  // Medidas en el eje y
  for (let i = 0; i <= 10; i++) {
    let y = 350 - i * 30;
    ctx.beginPath();
    ctx.moveTo(45, y);
    ctx.lineTo(55, y);
    ctx.stroke();
    ctx.fillText(i, 35, y + 5);
  }

  // Función de la integral para graficar
  ctx.beginPath();
  ctx.strokeStyle = "#1a1a1a80";
  ctx.lineWidth = 2;
  let started = false;
  for (let x = 0; x <= 10; x += 0.01) {
    const y = evaluarFuncion(x, integralSelect);
    const xCoord = padding + (x / 10) * 500;
    const yCoord = 350 - (y / 10) * 300;

    if (!started) {
      ctx.moveTo(xCoord, yCoord);
      started = true;
    } else {
      ctx.lineTo(xCoord, yCoord);
    }
  }
  ctx.stroke();

  // Área bajo la curva
  ctx.fillStyle = "#1f9bcf80";
  ctx.beginPath();
  ctx.moveTo(padding, 350);
  for (let x = 0; x <= 10; x += 0.01) {
    const y = evaluarFuncion(x, integralSelect);
    const xCoord = padding + (x / 10) * 500;
    const yCoord = 350 - (y / 10) * 300;
    ctx.lineTo(xCoord, yCoord);
  }
  ctx.lineTo(550, 350);
  ctx.closePath();
  ctx.fill();

  // Puntos de las simulaciones
  for (let i = 0; i < puntos.length; i++) {
    const xCoord = padding + ((puntos[i].x - 0) / 10) * 500;
    const yCoord = 350 - ((puntos[i].y - 0) / 10) * 300;
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.arc(xCoord, yCoord, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
