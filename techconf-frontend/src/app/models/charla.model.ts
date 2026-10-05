import { Asistente } from './asistente.model';

export interface Charla {
  id?: number;
  titulo: string;
  ponente: string;
  sala: string;
  hora: string;
  asistentes: Asistente[];
}
