import { Registro } from "@/lib/types/registro";

export const REGISTROS_MOCK: Registro[] = [
  {
    id: "reg-001",
    alunoId: "aluno-001",
    data: "2024-07-22",
    autor: { nome: "Profa. Ana Lima", perfil: "professor", area: "Escola" },
    tipo: "conquista",
    titulo: "Reconheceu as letras A e B sozinho! ⭐",
    descricao:
      "Miguel conseguiu identificar as letras A e B em 4 de 5 tentativas. Demonstrou muito entusiasmo e bateu palmas quando acertou!",
    humor: 5,
    engajamento: 5,
    fotos: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    ],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Em casa, use letras magnéticas na geladeira. Peça para ele encontrar as letras A e B nas embalagens de alimentos durante as refeições.",
      devolutiva: null,
    },
  },
  {
    id: "reg-002",
    alunoId: "aluno-001",
    data: "2024-07-20",
    autor: { nome: "Maria Santos", perfil: "familia" },
    tipo: "atividade",
    titulo: "Brincamos com letras na geladeira",
    descricao:
      "Seguindo a sugestão da professora Ana! Ele ficou super animado e encontrou a letra A sozinho nas embalagens. Foi incrível ver a alegria dele!",
    humor: 5,
    engajamento: 5,
    fotos: [],
    origem: "familia",
    sugestaoAtividade: null,
  },
  {
    id: "reg-003",
    alunoId: "aluno-001",
    data: "2024-07-18",
    autor: {
      nome: "Terapeuta Carla",
      perfil: "professor",
      area: "Terapia Ocupacional",
    },
    tipo: "atividade",
    titulo: "Exercícios de coordenação motora fina",
    descricao:
      "Trabalhamos com encaixes e peças de montar. Miguel demonstrou melhora significativa na pinça fina em relação à sessão anterior.",
    humor: 4,
    engajamento: 4,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Ofereça massinha de modelar para brincadeiras livres. Rolar, apertar e modelar ajudam muito no desenvolvimento motor.",
      devolutiva: {
        positivo: true,
        observacao: "Adorou a massinha! Ficou 30 minutos brincando sozinho.",
        data: "2024-07-19",
      },
    },
  },
  {
    id: "reg-004",
    alunoId: "aluno-001",
    data: "2024-07-16",
    autor: { nome: "Profa. Ana Lima", perfil: "professor", area: "Escola" },
    tipo: "observacao",
    titulo: "Ótima interação com os colegas hoje",
    descricao:
      "Miguel ficou brincando com dois colegas por mais de 20 minutos. Compartilhou brinquedos e sorriu bastante. Progresso incrível na socialização!",
    humor: 5,
    engajamento: 5,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Convide um coleguinha para brincar em casa. Brincadeiras simples como esconde-esconde ajudam muito na socialização.",
      devolutiva: null,
    },
  },
  {
    id: "reg-005",
    alunoId: "aluno-001",
    data: "2024-07-14",
    autor: { nome: "Maria Santos", perfil: "familia" },
    tipo: "saude",
    titulo: "Consulta com pediatra — tudo bem",
    descricao:
      "Consulta de rotina com o pediatra. Médico elogiou o desenvolvimento dele. Cresceu 2 cm desde a última consulta em abril!",
    humor: 4,
    engajamento: 4,
    fotos: [],
    origem: "familia",
    sugestaoAtividade: null,
  },
  {
    id: "reg-006",
    alunoId: "aluno-002",
    data: "2024-07-22",
    autor: {
      nome: "Profa. Beatriz Campos",
      perfil: "professor",
      area: "Escola",
    },
    tipo: "conquista",
    titulo: "Ficou sentada por 15 minutos na roda de histórias ⭐",
    descricao:
      "Sofia conseguiu participar da roda de histórias sem se levantar por 15 minutos completos. Usamos o livro com texturas que ela adora. Grande avanço!",
    humor: 4,
    engajamento: 4,
    fotos: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=400",
    ],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Em casa, crie momentos de 'hora da história' com livros com texturas ou imagens grandes. Comece com 5 minutos e vá aumentando.",
      devolutiva: null,
    },
  },
  {
    id: "reg-007",
    alunoId: "aluno-002",
    data: "2024-07-19",
    autor: { nome: "Juliana Oliveira", perfil: "familia" },
    tipo: "atividade",
    titulo: "Testamos a rotina visual nova",
    descricao:
      "Seguindo orientação da professora Beatriz, criamos um quadro de rotina visual com fotos. Sofia olhava o quadro de manhã e parecia mais tranquila ao longo do dia.",
    humor: 4,
    engajamento: 3,
    fotos: [],
    origem: "familia",
    sugestaoAtividade: null,
  },
  {
    id: "reg-008",
    alunoId: "aluno-003",
    data: "2024-07-15",
    autor: {
      nome: "Fisio. Carlos Mendes",
      perfil: "professor",
      area: "Fisioterapia",
    },
    tipo: "atividade",
    titulo: "Treino de equilíbrio sentado com bola",
    descricao:
      "Pedro trabalhou equilíbrio sentado na bola terapêutica por 10 minutos. Ainda precisa de apoio lateral, mas já reduziu a dependência em 40% versus a sessão inicial.",
    humor: 3,
    engajamento: 4,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Continue os exercícios de sentar em superfícies levemente instáveis (travesseiro firme no chão). Sempre com supervisão e apoio.",
      devolutiva: {
        positivo: false,
        observacao:
          "Tentamos mas Pedro ficou muito agitado. Vamos tentar novamente quando estiver mais tranquilo.",
        data: "2024-07-17",
      },
    },
  },
  {
    id: "reg-009",
    alunoId: "aluno-004",
    data: "2024-07-20",
    autor: { nome: "Profa. Ana Lima", perfil: "professor", area: "Escola" },
    tipo: "conquista",
    titulo: "Escreveu o próprio nome pela primeira vez! ⭐",
    descricao:
      "Laura escreveu LAURA com letras grandes e coloridas! Demorou 10 minutos mas não desistiu. Ela mostrou para todos da sala e ficou muito orgulhosa.",
    humor: 5,
    engajamento: 5,
    fotos: [
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400",
    ],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Pratique escrever o nome em casa com giz no chão, areia, tinta, ou letra grande no papel. Cada material diferente é uma experiência nova!",
      devolutiva: {
        positivo: true,
        observacao:
          "Fizemos com giz na calçada! Ela adorou e ficou pedindo para fazer de novo.",
        data: "2024-07-21",
      },
    },
  },
  {
    id: "reg-010",
    alunoId: "aluno-004",
    data: "2024-07-17",
    autor: { nome: "Cláudia Ferreira", perfil: "familia" },
    tipo: "observacao",
    titulo: "Contou até 5 ajudando a organizar frutas",
    descricao:
      "Enquanto organizávamos as compras, pedi para Laura contar as frutas. Ela contou 5 maçãs corretamente! Primeira vez que contou até 5 de forma espontânea.",
    humor: 5,
    engajamento: 5,
    fotos: [],
    origem: "familia",
    sugestaoAtividade: null,
  },
  {
    id: "reg-011",
    alunoId: "aluno-005",
    data: "2024-07-22",
    autor: {
      nome: "Profa. Beatriz Campos",
      perfil: "professor",
      area: "Escola",
    },
    tipo: "atividade",
    titulo: "Atividade musical — tolerou 20 min de som",
    descricao:
      "Gabriel participou de atividade musical com instrumentos reais. Conseguiu tolerar os sons por 20 minutos sem precisar sair da sala. Mês passado saía em 5 minutos.",
    humor: 4,
    engajamento: 5,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Em casa, coloque músicas suaves enquanto Gabriel brinca. Vá aumentando gradualmente o volume ao longo das semanas.",
      devolutiva: null,
    },
  },
  {
    id: "reg-012",
    alunoId: "aluno-005",
    data: "2024-07-18",
    autor: { nome: "Fernanda Costa", perfil: "familia" },
    tipo: "conquista",
    titulo: "Dormiu sozinho a noite toda! ⭐",
    descricao:
      "Pela primeira vez em meses, Gabriel dormiu a noite inteira no próprio quarto sem acordar pedindo colo. Uma conquista enorme para toda a família!",
    humor: 5,
    engajamento: 5,
    fotos: [],
    origem: "familia",
    sugestaoAtividade: null,
  },
  {
    id: "reg-013",
    alunoId: "aluno-006",
    data: "2024-07-10",
    autor: { nome: "Profa. Ana Lima", perfil: "professor", area: "Escola" },
    tipo: "atividade",
    titulo: "Primeira sessão de leitura Braille",
    descricao:
      "Isabela tocou o alfabeto Braille pela primeira vez. Conseguiu distinguir 3 letras por tato após a sessão. Demonstrou muita curiosidade e paciência.",
    humor: 4,
    engajamento: 4,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Faça jogos de identificação por tato em casa: reconhecer objetos de olhos fechados, adivinhar texturas. Isso treina a sensibilidade dos dedos.",
      devolutiva: null,
    },
  },
  {
    id: "reg-014",
    alunoId: "aluno-001",
    data: "2024-07-10",
    autor: { nome: "Profa. Ana Lima", perfil: "professor", area: "Escola" },
    tipo: "saude",
    titulo: "Visita da nutricionista",
    descricao:
      "Nutricionista avaliou a alimentação do Miguel. Recomendações: aumentar variedade de legumes e reduzir processados. Miguel aceitou bem a consulta.",
    humor: 3,
    engajamento: 3,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Tente introduzir um legume novo por semana de forma lúdica. Deixe o Miguel ajudar a preparar a comida — crianças comem melhor o que ajudaram a fazer.",
      devolutiva: null,
    },
  },
  {
    id: "reg-015",
    alunoId: "aluno-002",
    data: "2024-07-15",
    autor: {
      nome: "Fonoaudióloga Renata",
      perfil: "professor",
      area: "Fonoaudiologia",
    },
    tipo: "observacao",
    titulo: "Aumentou vocabulário funcional em 8 palavras este mês",
    descricao:
      "Sofia agora usa de forma consistente: água, não, sim, mamãe, papai, mais, acabou e comer. Oito palavras novas em julho! Seguiremos com imagens e CAA.",
    humor: 4,
    engajamento: 4,
    fotos: [],
    origem: "apae",
    sugestaoAtividade: {
      descricao:
        "Use as pranchas de comunicação alternativa que enviamos para casa. Ofereça as opções visualmente antes das refeições e hora do banho.",
      devolutiva: {
        positivo: true,
        observacao:
          "Ela começou a apontar para as imagens! Especialmente para água e comida.",
        data: "2024-07-18",
      },
    },
  },
];
