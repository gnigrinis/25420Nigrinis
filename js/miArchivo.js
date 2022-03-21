//----FRASE DEL DÍA------//
//Array de paises
const frases = [
    "Te contaré el secreto para hacerte rico en Wall Street. Sé codicioso cuando otros sean miedosos y sé temeroso cuando otros sean codiciosos.<br>-Warren Buffett",
    "Demasiadas personas gastan el dinero que ganaron para comprar cosas que no quieren, para impresionar a gente que no les gusta.<br>-Will Rogers",
    "Una inversión en conocimiento paga el mejor interés.<br>-Benjamin Franklin",
    "La falta de dinero es la raíz de todo mal.<br>-Mark Twain",
    "Cuando tienes dinero, solo tú recuerdas quién eres. Pero cuando no tienes dinero, todo el mundo olvida quién eres. Así es la vida.<br>-Bill Gates"
];

//numero aleatorio entre 0 y 5
selectorDeFrases =  Math.floor(Math.random() * frases.length);

let frase = document.getElementById("frase");
frase.innerHTML = frases[selectorDeFrases];

//----FIN DE FRASE DEL DÍA----//


//Array de intereses
const arregloDeIntereses = [{
    id: 1,
    nivel: "Bronce",
    interes: 0.025
},{
    id: 2,
    nivel: "Plata",
    interes: 0.020
},{
    id: 3, 
    nivel: "Oro",
    interes: 0.015
},{
    id: 4,
    nivel: "Platino", 
    interes: 0.010
}];


//Boton de calcular de formulario HTML
let boton = document.getElementById("calcular");
boton.addEventListener("click", calculadoraDePrestamos);



//Funcion calculadora de prestamos
function calculadoraDePrestamos(){
    //Nivel de usuario tomado de HTML
    let nivelUsuario = parseInt(document.getElementById("nivelUsuario").value);
    if (nivelUsuario > 0 && nivelUsuario < 5) {
        console.log(`Nivel de usuario seleccionado: ${nivelUsuario}`);
        
        //------------METODO DE ARRAY-----------//
        //Aplicando metodo array para extraer el interes deseado
        let interesSeleccionado = arregloDeIntereses.find((arregloDeIntereses) => arregloDeIntereses.id == nivelUsuario);
        const interes = interesSeleccionado.interes;
        const nivel = interesSeleccionado.nivel;
        console.log(`Interes: ${interes} Nivel: ${nivel}`);
        //-------FIN DE METODO DE ARRAY--------//
        
        //Dinero prestado tomado de HTML
        let dineroPrestado = parseInt(document.getElementById("dineroPrestado").value);
        console.log(`Monto a prestar: ${dineroPrestado}`);

        //Validación de valor ingresado en dinero a prestar
        if (!isNaN(dineroPrestado) && parseInt(dineroPrestado)>0) {
            
            //Selección de plazo de prestamo tomado de HTML
            let plazoSeleccionado= parseInt(document.getElementById("plazoSeleccionado").value);
            console.log(`Plazo seleccionado: ${plazoSeleccionado}`);
            
            //Validación de valor ingresado en plazo
            if (!isNaN(plazoSeleccionado) && parseInt(plazoSeleccionado)>0) {

                //------------CONSTRUYENDO OBJETO-----------//
                const prestamo1 = new Prestamo(interes, dineroPrestado, plazoSeleccionado);
                prestamo1.calculadoraMontoMensual();
                prestamo1.calculadoraInteresMensual();
                prestamo1.calculadoraTotalMensual();
                prestamo1.calculadoraMontoTotal();

                const montoMensual = prestamo1.montoMensual;
                const montoInteres = prestamo1.montoInteres;
                const montoTotalMensual = prestamo1.montoTotalMensual;
                let montoTotal = prestamo1.montoTotal;
                const total = prestamo1.montoTotal;
                //-------FIN DE CONSTRUYENDO OBJETO--------//

                //-----------------IMPRIMIENDO RESULTADOS------------------//
                //Tabla de prestamo detallado en consola
                let p = document.createElement("p");
                for (let i=1; i<=plazoSeleccionado; i++){
                    console.log(`Cuota ${i}: $${montoMensual.toFixed(2)} interes: $${montoInteres.toFixed(2)} total: $${montoTotalMensual.toFixed(2)} deuda pendiente: $${montoTotal.toFixed(2)}`);
                    montoTotal=montoTotal-montoTotalMensual;
                }
                
                //Resumen de prestamo en HTML
                let resultado = document.getElementById("resultado");
                resultado.innerHTML = (`Nivel: ${nivel} <br>
                Prestado: $${dineroPrestado}  <br>
                El monto a pagar es de $${montoTotalMensual.toFixed(2)} <br>
                durante ${plazoSeleccionado} meses  <br>
                Total a pagar $${total} <br>
                *Vea tabla detallada en consola de javascript <br>
                <br>
                Gracias por usar nuestra calculadora`);
                //-----------------FIN DE IMPRIMIENDO RESULTADOS------------------//
            }else{
                alert("El valor ingresado debe ser un número mayor a 0");
            }
        }else{
            alert("El valor ingresado debe ser un número mayor a 0");
        }
    } else {
        alert(`Nivel de usuario no valido, debe ser un número entre 1 y 4`);
    }
}
