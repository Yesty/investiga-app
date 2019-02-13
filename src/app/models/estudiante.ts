import { IProyecto } from './proyecto';
import { ICarrera } from './carrera';
export interface IEstudiante {

    codigo: string;
    documento: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: number;
    carrera: ICarrera;
    correo: string;
    telefono: string;
    proyectos: IProyecto[];
    estado: boolean;
    fechaCreacion: number;
    fechaModificacion: number;
}
