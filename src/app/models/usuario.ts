import { Estudiante } from './estudiante';
import { Asesor } from './asesor';
export class Usuario {
    codigo: string;
    documento: string;
    docente: Asesor;
    estudiante: Estudiante;
    fechaCreacion: number;
    fechaModificacion: number;
    estado: boolean;
}
