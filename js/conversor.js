//Capturando información de conversor de divisas
let source = document.getElementById("source");
let target = document.getElementById("target");
let quantity = document.getElementById("quantity"); 
let resultadoDivisa = document.getElementById("resultadoDivisa");
let convertir = document.getElementById("convertir");

//Evento para convertir divisas
convertir.addEventListener("click", () => {
  conversor(quantity.value,resultadoDivisa);
});

//Función de conversión
const conversor = async (quantity,resultadoDivisa) => {
  const resp = await fetch(`js/divisas.json`)
  const data = await resp.json()
  //Obteniendo par de divisas de HTML
  let seleccionHTML = `${source.value}/${target.value}`
  //Declarando variable
  let divisaSeleccionada;
  //Recorriendo JSON de divisas y comparando con par de divisas de HTML
  for (let i = 0; i < data.divisas.length; i++) {
    data.divisas[i].base == seleccionHTML ? divisaSeleccionada = i: resultadoDivisa.value = "Par no disponible";
  }
  //Obteniendo rata de conversión de divisa
  rataDeConversion = data.divisas[divisaSeleccionada].result.rate
  //Calculando el resultado de la conversión
  let conversion = quantity*rataDeConversion
  //Mostrando resultado en pantalla
  resultadoDivisa.value = `$${conversion}`
}