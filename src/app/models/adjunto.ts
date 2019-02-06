import { Estudiante } from './estudiante';

export class Adjunto {
    nombre: string;
    descripcion: string;
    enlace: string;
    tipo: string;
    autor: Estudiante;
    fechaCreacion: number;
    fechaModificacion: number;
    estado: boolean;
}
