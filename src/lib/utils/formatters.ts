export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const diff = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "hoje";
  if (diff === 1) return "ontem";
  if (diff <= 6) return `há ${diff} dias`;

  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
  });
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatHumor(valor: number): string {
  if (valor >= 4.5) return "Excelente";
  if (valor >= 3.5) return "Bom";
  if (valor >= 2.5) return "Regular";
  if (valor >= 1.5) return "Baixo";
  return "Muito baixo";
}

export function getHumorEmoji(humor: number): string {
  if (humor >= 4.5) return "😄";
  if (humor >= 3.5) return "🙂";
  if (humor >= 2.5) return "😐";
  if (humor >= 1.5) return "😞";
  return "😢";
}

export function getAreaColor(area: string): string {
  const colors: Record<string, string> = {
    Escola: "#F5C518",
    Saúde: "#4CAF50",
    "Terapia Ocupacional": "#3B82F6",
    Fonoaudiologia: "#A78BFA",
    Fisioterapia: "#F97316",
  };
  return colors[area] ?? "#8D8D8D";
}
