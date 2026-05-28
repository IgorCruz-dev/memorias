export const DASHBOARD_FAMILIA = {
  alunoId: "aluno-001",
  nomeAluno: "Miguel",
  nomeResponsavel: "Maria",
  evolucaoGeral: 78,
  conquistasSemana: 3,
  humorMedio: 4.2,
  proximoAtendimento: {
    data: "2024-07-24",
    diaSemana: "Quarta-feira",
    horario: "08:00",
    area: "Escola",
    responsavel: "Profa. Ana Lima",
  },
  sugestoesPendentes: 2,
  evolucaoMensal: [
    { mes: "Mar", valor: 45 },
    { mes: "Abr", valor: 52 },
    { mes: "Mai", valor: 61 },
    { mes: "Jun", valor: 68 },
    { mes: "Jul", valor: 78 },
  ],
  evolucaoPorArea: [
    { area: "Escola", valor: 72, cor: "#F5C518" },
    { area: "Saúde", valor: 88, cor: "#4CAF50" },
    { area: "Terapia Ocupacional", valor: 65, cor: "#3B82F6" },
    { area: "Fonoaudiologia", valor: 70, cor: "#A78BFA" },
  ],
};

export const DASHBOARD_PROFESSOR = {
  nomeProfessor: "Ana",
  totalAlunos: 12,
  registrosHoje: 3,
  registrosSemana: 18,
  alertasSemRegistro: 2,
  engajamentoFamilias: 74,
  relatorioPendente: true,
  engajamentoAlunos: [
    { nome: "Miguel S.", valor: 92 },
    { nome: "Laura F.", valor: 71 },
    { nome: "Gabriel C.", valor: 88 },
    { nome: "Sofia O.", valor: 85 },
    { nome: "Pedro A.", valor: 54 },
    { nome: "Isabela N.", valor: 40 },
  ],
};

export const DASHBOARD_GESTOR = {
  totalAlunos: 147,
  totalFamilias: 134,
  familiasCadastradas: 89,
  familiasAtivasSemana: 67,
  totalProfessores: 23,
  registrosSemana: 312,
  relatoriosPendentes: 4,
  engajamentoGeral: 78,
  alunosPorArea: [
    { area: "Escola", quantidade: 147 },
    { area: "Saúde", quantidade: 98 },
    { area: "Terapia Ocupacional", quantidade: 76 },
    { area: "Fonoaudiologia", quantidade: 54 },
    { area: "Fisioterapia", quantidade: 43 },
  ],
  engajamentoSemanal: [
    { semana: "Sem 1", valor: 45 },
    { semana: "Sem 2", valor: 52 },
    { semana: "Sem 3", valor: 61 },
    { semana: "Sem 4", valor: 67 },
    { semana: "Sem 5", valor: 74 },
    { semana: "Sem 6", valor: 78 },
  ],
};
