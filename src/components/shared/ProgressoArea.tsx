"use client";

import { useEffect, useState } from "react";

interface ProgressoAreaProps {
  area: string;
  valor: number;
  cor: string;
  delay?: number;
}

export function ProgressoArea({ area, valor, cor, delay = 0 }: ProgressoAreaProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(valor), 100 + delay);
    return () => clearTimeout(timer);
  }, [valor, delay]);

  return (
    <div className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-memorias-text-primary">{area}</span>
        <span className="text-2xl font-extrabold" style={{ color: cor }}>
          {valor}%
        </span>
      </div>
      <div className="h-2.5 bg-memorias-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${width}%`, backgroundColor: cor }}
        />
      </div>
    </div>
  );
}
