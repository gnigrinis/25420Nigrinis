//--------------OBJETO CONSTRUCTOR------------------//
//Prestamo
class Prestamo {
    constructor(interes, dineroPrestado, plazoSeleccionado) {
        this.interes = interes;
        this.dineroPrestado = dineroPrestado;
        this.plazoSeleccionado = plazoSeleccionado;
    }

    calculadoraMontoMensual() {
        this.montoMensual = this.dineroPrestado/this.plazoSeleccionado;
    }
    calculadoraInteresMensual() {
        this.montoInteres = this.montoMensual*this.interes;
    }
    calculadoraTotalMensual() {
        this.montoTotalMensual = this.montoMensual+this.montoInteres;
    }
    calculadoraMontoTotal() {
        this.montoTotal = this.dineroPrestado+(this.dineroPrestado*this.interes);
    }
}
//-----------------FIN DE OBJETO-------------------//