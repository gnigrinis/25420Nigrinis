//----MODO OSCURO Y LOCAL STORAGE----//
let modoOscuro = document.getElementsByClassName("switchBtn");

//Verificando estado almacenado en local Storage mediante operador ternario
let estadoModoOscuroLocalStorage = localStorage.getItem("Modo Oscuro")=="true"? true : false;
estadoModoOscuroLocalStorage? modoOscuro[0].control.checked = true : modoOscuro[0].control.checked = false;

//Se ejecuta función basado en comprobación anterior del estado almacenado en local storage
modoOscuroActivado();

//Evento para cambiar el estado del modo oscuro desde boton
modoOscuro[0].addEventListener("click", modoOscuroActivado);

//Función para cambiar el estado del modo oscuro
function modoOscuroActivado(){
    let estadoModoOscuro = modoOscuro[0].control.checked;
    if(estadoModoOscuro==true){
        document.querySelector("body > header").style.backgroundColor = "var(--background-main)";
        document.querySelector("body > main").style.backgroundColor = "var(--background-secondary)";
        document.querySelector("body > footer").style.backgroundColor = "var(--background-main)";
        //Almacenando estado en local Storage
        localStorage.setItem("Modo Oscuro", estadoModoOscuro);
    }else if(estadoModoOscuro==false){
        document.querySelector("body > header").style.backgroundColor = "var(--background-secondary)";
        document.querySelector("body > main").style.backgroundColor = "var(--background-main)";
        document.querySelector("body > footer").style.backgroundColor = "var(--background-secondary)";
        //Almacenando estado en local Storage
        localStorage.setItem("Modo Oscuro", estadoModoOscuro);
}}
//----FIN MODO OSCURO----//


//----FRASE DEL DÍA------//
//Array de paises
const frases = [
    "Te contaré el secreto para hacerte rico en Wall Street. Sé codicioso cuando otros sean miedosos y sé temeroso cuando otros sean codiciosos.<br>-Warren Buffett",
    "Demasiadas personas gastan el dinero que ganaron para comprar cosas que no quieren, para impresionar a gente que no les gusta.<br>-Will Rogers",
    "Una inversión en conocimiento paga el mejor interés.<br>-Benjamin Franklin",
    "La falta de dinero es la raíz de todo mal.<br>-Mark Twain",
    "Cuando tienes dinero, solo tú recuerdas quién eres. Pero cuando no tienes dinero, todo el mundo olvida quién eres. Así es la vida.<br>-Bill Gates"
];

//numero aleatorio entre 0 y total de frases
selectorDeFrases =  Math.floor(Math.random() * frases.length);

let frase = document.getElementById("frase");
frase.innerHTML = frases[selectorDeFrases];

//----FIN DE FRASE DEL DÍA----//


//-----ARRAY DE OBJETOS DE INTERESES------//
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
//----FIN DE ARRAY DE OBJETO DE INTERESES----//


//----CÁLCULO DE PRESTAMO----//
//Boton de calcular de formulario HTML
let boton = document.getElementById("calcular");
boton.addEventListener("click", calculadoraDePrestamos);

//Funcion calculadora de prestamos
function calculadoraDePrestamos(){
    //Nivel de usuario tomado de HTML
    let nivelUsuario = parseInt(document.getElementById("nivelUsuario").value);
    if (nivelUsuario > 0 && nivelUsuario < 5) {
        //------------METODO DE ARRAY-----------//
        //Aplicando metodo array para extraer el interes deseado
        let interesSeleccionado = arregloDeIntereses.find((arregloDeIntereses) => arregloDeIntereses.id == nivelUsuario);
        
        //Desestructurando Array de objeto de intereses
        const {nivel, interes} = interesSeleccionado;
        //-------FIN DE METODO DE ARRAY--------//
        
        //Dinero prestado tomado de HTML
        let dineroPrestado = parseInt(document.getElementById("dineroPrestado").value);

        //Validación de valor ingresado en dinero a prestar
        if (!isNaN(dineroPrestado) && parseInt(dineroPrestado)>0) {
            
            //Selección de plazo de prestamo tomado de HTML
            let plazoSeleccionado= parseInt(document.getElementById("plazoSeleccionado").value);
            
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
                
                //Cambiando CSS de main para ajustar altura de tabla de resultados 
                if (plazoSeleccionado > 1) {
                    let main = document.getElementsByClassName("main");
                    main[0].className = "main fit-content";
                }
                
                //-----------------IMPRIMIENDO RESULTADOS------------------//
                //Tabla de prestamo detallado en consola
                let tabla = document.getElementById("tabla");
                //limpiando resultado anterior
                tabla.innerHTML = "";
                //Creando tabla de resultado
                for (let i=1; i<=plazoSeleccionado; i++){
                    tabla.innerHTML = tabla.innerHTML + `<table border="1"><tr><th>#</th><th>Cuota</th><th>Interes</th><th>Total</th><th>Deuda pendiente</th></tr><tr><td> ${i} </td><td> $${montoMensual.toFixed(2)} </td><td> $${montoInteres.toFixed(2)} </td><td> $${montoTotalMensual.toFixed(2)} </td><td> $${montoTotal.toFixed(2)} </td></tr></table>`;
                    montoTotal=montoTotal-montoTotalMensual;
                }

                //Resumen de prestamo en HTML
                let resultado = document.getElementById("resultado");
                resultado.innerHTML = (`<h4>Nivel:</h4> <p>${nivel}</p> <br>
                <h4>Prestado:</h4> <p>$${dineroPrestado}</p>  <br>
                <h4>Interes:</h4> <p>% ${interes*100}</p> <br>
                <h4>El monto a pagar es de</h4> <p>$${montoTotalMensual.toFixed(2)}</p> <br>
                <h4>durante</h4> <p>${plazoSeleccionado} meses</p>  <br>
                <h4>Total a pagar</h4> <p>$${total}</p> <br>`);
                //-----------------FIN DE IMPRIMIENDO RESULTADOS------------------//
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El valor ingresado debe ser un número mayor a 0',
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El valor ingresado debe ser un número mayor a 0',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nivel de usuario no valido, debe ser un número entre 1 y 4',
        })
    }
}
//----FIN DE CÁLCULO DE PRESTAMO----//
