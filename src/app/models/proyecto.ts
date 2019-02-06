import { Adjunto } from './adjunto';
import { Categoria } from './categoria';
import { FormaInvestigacion } from './forma-investigacion';
import { Estudiante } from './estudiante';
import { Asesor } from './asesor';
export class Proyecto {

    constructor() {
        this.estudiantes = new Array<Estudiante>();
        this.adjuntos = new Array<Adjunto>();
        this.meritos = new Array<string>();
    }

    codigo: string;
    nombre: string;
    descripcion: string;
    asesores: Asesor[];
    estudiantes: Estudiante[];
    formaInvestigacion: FormaInvestigacion;
    categoria: Categoria;
    adjuntos: Adjunto[];
    meritos: string[];
    fechaCreacion: number;
    fehcaModificacion: number;
    estado: boolean;
}
