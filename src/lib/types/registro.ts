export type TipoRegistro = "conquista" | "atividade" | "observacao" | "saude";
export type OrigemRegistro = "apae" | "familia";
export type PerfilAutor = "professor" | "familia";

export interface AutorRegistro {
  nome: string;
  perfil: PerfilAutor;
  area?: string;
}

export interface Devolutiva {
  positivo: boolean;
  observacao: string;
  data: string;
}

export interface SugestaoAtividade {
  descricao: string;
  devolutiva: Devolutiva | null;
}

export interface Registro {
  id: string;
  alunoId: string;
  data: string;
  autor: AutorRegistro;
  tipo: TipoRegistro;
  titulo: string;
  descricao: string;
  humor: number;
  engajamento: number;
  fotos: string[];
  origem: OrigemRegistro;
  sugestaoAtividade: SugestaoAtividade | null;
}
