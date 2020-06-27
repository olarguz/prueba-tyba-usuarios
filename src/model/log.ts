class Log {
    id: string;
    tipo: string;
    coleccion: string;
    fecha: Date;

    constructor(id: string, tipo: string, coleccion: string, fecha: Date) {
        this.id = id;
        this.tipo = tipo;
        this.coleccion = coleccion;
        this.fecha = fecha;
    }
}

export default Log;
