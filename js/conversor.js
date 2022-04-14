//Capturando información de conversor de divisas
let source = document.getElementById("source");
let target = document.getElementById("target");
let quantity = document.getElementById("quantity"); 
let resultado = document.getElementById("resultado");
let convertir = document.getElementById("convertir");

//Evento para convertir divisas
convertir.addEventListener("click", () => {
  //Asignando valores númericos a combinación de divisas
  let divisaSeleccionada;
  let seleccionHTML = `${source.value}/${target.value}`
  switch (seleccionHTML) {
    case "USD/EUR":
      divisaSeleccionada = 0;
      break;
    case "USD/COP":
      divisaSeleccionada = 1;
      break;
    case "USD/ARS":
      divisaSeleccionada = 2;
      break;
    case "EUR/USD":
      divisaSeleccionada = 3;
      break;
    case "EUR/COP":
      divisaSeleccionada = 4;
      break;
    case "EUR/ARS":
      divisaSeleccionada = 5;
      break;
    case "ARS/USD":
      divisaSeleccionada = 6;
      break;
    case "ARS/EUR":
      divisaSeleccionada = 7;
      break;
    case "ARS/COP":
      divisaSeleccionada = 8;
      break;
    case "COP/USD":
      divisaSeleccionada = 9;
      break;
    case "COP/EUR":
      divisaSeleccionada = 10;
      break;
    case "COP/ARS":
      divisaSeleccionada = 11;
      break;
    default:
      divisaSeleccionada = "Divisa no existente";
  }
  //Llamando función de conversión
  conversor(divisaSeleccionada,quantity.value,resultado);
});

//Función de conversión
const conversor = async (divisaSeleccionada,quantity,resultado) => {
  const resp = await fetch(`js/divisas.json`)
  const data = await resp.json()
  //Obteniendo rata de conversión de divisa
  rataDeConversion = data.divisas[divisaSeleccionada].result.rate
  //Calculando el resultado de la conversión
  let conversion = quantity*rataDeConversion
  //Mostrando resultado en pantalla
  resultado.value = conversion
}