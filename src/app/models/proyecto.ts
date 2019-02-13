import { IAdjunto } from './adjunto';
import { ICategoria } from './categoria';
import { IFormaInvestigacion } from './forma-investigacion';
import { IEstudiante } from './estudiante';
import { IAsesor } from './asesor';
export interface IProyecto {

    codigo: string;
    nombre: string;
    descripcion: string;
    asesores: IAsesor[];
    estudiantes: { codigo: string, tipo: string }[];
    formaInvestigacion: IFormaInvestigacion;
    categoria: ICategoria;
    adjuntos: IAdjunto[];
    meritos: string[];
    fechaCreacion: number;
    fehcaModificacion: number;
    estado: boolean;
    avanceProyecto: string;
}
