import { Proyecto } from './proyecto';
import { Carrera } from './carrera';
export class Estudiante {

    constructor() {
        this.proyectos = new Array<Proyecto>();
    }

    codigo: string;
    documento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: number;
    carrera: Carrera;
    correo: string;
    telefono: string;
    proyectos: Proyecto[];
    estado: boolean;
    fechaCreacion: number;
    fechaModificacion: number;
}
