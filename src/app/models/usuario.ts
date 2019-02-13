import { IEstudiante } from './estudiante';
import { IAsesor } from './asesor';
export interface IUsuario {
    codigo: string;
    documento: string;
    docente: IAsesor;
    estudiante: IEstudiante;
    fechaCreacion: number;
    fechaModificacion: number;
    estado: boolean;
}
