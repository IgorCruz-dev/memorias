"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { RegistroCard } from "@/components/shared/RegistroCard";
import { REGISTROS_MOCK } from "@/lib/mock-data/registros";

type Filtro = "todos" | "apae" | "familia";

export default function DiarioPage() {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const registros = REGISTROS_MOCK.filter(
    (r) => r.alunoId === "aluno-001" && (filtro === "todos" || r.origem === filtro)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <BookOpen size={24} style={{ color: "#F5C518" }} />
          Diário do Miguel
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">
          Tudo que aconteceu na APAE e em casa
        </p>
      </div>

      <div className="flex gap-2">
        {(["todos", "apae", "familia"] as Filtro[]).map((f) => (
          <button key={f} onClick={() => setFiltro(f)}
            className="text-sm font-bold px-4 py-2 rounded-xl border transition-colors"
            style={filtro === f
              ? { backgroundColor: "#F5C518", color: "#1A1A1A", borderColor: "#F5C518" }
              : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E8E8E2" }}>
            {f === "todos" ? "Todos" : f === "apae" ? "APAE" : "Família"}
          </button>
        ))}
      </div>

      {registros.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-memorias-text-muted">
          <BookOpen size={40} className="mb-3 opacity-30" />
          <p className="font-bold">Nenhum registro encontrado</p>
        </div>
      ) : (
        <div className="space-y-4">
          {registros.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <RegistroCard registro={r} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
