interface HumorEmojiProps {
  valor: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const HUMOR_MAP = [
  { min: 4.5, emoji: "😄", label: "Excelente", color: "#4CAF50" },
  { min: 3.5, emoji: "🙂", label: "Bom", color: "#F5C518" },
  { min: 2.5, emoji: "😐", label: "Regular", color: "#F59E0B" },
  { min: 1.5, emoji: "😞", label: "Baixo", color: "#F97316" },
  { min: 0, emoji: "😢", label: "Muito baixo", color: "#EF4444" },
];

const SIZE_CLASS = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

export function HumorEmoji({ valor, size = "md", showLabel = false }: HumorEmojiProps) {
  const entry = HUMOR_MAP.find((h) => valor >= h.min) ?? HUMOR_MAP[HUMOR_MAP.length - 1];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={SIZE_CLASS[size]}>{entry.emoji}</span>
      {showLabel && (
        <span className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.label}
        </span>
      )}
    </span>
  );
}
