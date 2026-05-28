export interface AtendimentoCronograma {
  diaSemana: string;
  horario: string;
  area: string;
}

export interface EvolucaoArea {
  area: string;
  valor: number;
}

export interface EvolucaoMensal {
  mes: string;
  valor: number;
}

export interface ResponsavelAPAE {
  nome: string;
  area: string;
  foto: string | null;
}

export interface Familia {
  responsavel: string;
  parentesco: string;
  telefone: string;
  engajamento: number;
}

export interface Aluno {
  id: string;
  nome: string;
  idade: number;
  iniciais: string;
  corAvatar: string;
  diagnostico: string;
  turno: string;
  responsavelAPAE: ResponsavelAPAE;
  familia: Familia;
  areas: string[];
  cronograma: AtendimentoCronograma[];
  metasAno: string[];
  ultimoRegistro: string;
  diasSemRegistro: number;
  evolucaoGeral: number;
  evolucaoPorArea: EvolucaoArea[];
  evolucaoMensal: EvolucaoMensal[];
  humorMedio: number;
}
