import { IProyecto } from './proyecto';
import { IAsignatura } from './asignatura';
export interface IAsesor {

    documento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: number;
    asignatura: IAsignatura;
    codigo: string;
    proyectos: IProyecto[];
    estado: boolean;
    fechaCreacion: number;
    fechaModificacion: number;
}
