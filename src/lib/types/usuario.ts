export type Perfil = "familia" | "professor" | "gestor";

export interface Professor {
  id: string;
  nome: string;
  iniciais: string;
  corAvatar: string;
  area: string;
  totalAlunos: number;
  registrosSemana: number;
  engajamentoFamilias: number;
  ultimoAcesso: string;
}
