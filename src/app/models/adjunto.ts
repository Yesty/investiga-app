import { IEstudiante } from './estudiante';

export interface IAdjunto {
    nombre: string;
    descripcion: string;
    enlace: string;
    tipo: string;
    autor: IEstudiante;
    fechaCreacion: number;
    fechaModificacion: number;
    estado: boolean;
}
