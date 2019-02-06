import { Proyecto } from './proyecto';
import { Asignatura } from './asignatura';
export class Asesor {

    constructor() {
        this.proyectos = new Array<Proyecto>();
    }

    documento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: number;
    asignatura: Asignatura;
    codigo: string;
    proyectos: Proyecto[];
    estado: boolean;
    fechaCreacion: number;
    fechaModificacion: number;
}
