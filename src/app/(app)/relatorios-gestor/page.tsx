"use client";
import { motion } from "framer-motion";
import { ClipboardList, Download, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/shared/Toast";
import { PROFESSORES_MOCK } from "@/lib/mock-data/professores";
import { DASHBOARD_GESTOR } from "@/lib/mock-data/dashboard";

export default function RelatoriosGestorPage() {
  const { showToast } = useToast();
  const [exportados, setExportados] = useState<Set<string>>(new Set());
  const d = DASHBOARD_GESTOR;

  const exportar = (id: string) => {
    setExportados(prev => { const s = new Set(prev); s.add(id); return s; });
    showToast(`Relatório consolidado exportado!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <ClipboardList size={24} style={{ color: "#F5C518" }} />
          Relatórios — Visão Gestor
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Consolidado de todas as áreas</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total alunos", value: d.totalAlunos, color: "#F5C518" },
          { label: "Registros semana", value: d.registrosSemana, color: "#4CAF50" },
          { label: "Famílias ativas", value: `${d.familiasAtivasSemana}%`, color: "#3B82F6" },
          { label: "Relatórios pendentes", value: d.relatoriosPendentes, color: "#EF4444" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-memorias-border shadow-soft text-center">
            <p className="text-3xl font-extrabold" style={{ color }}>{value}</p>
            <p className="text-xs text-memorias-text-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-extrabold text-memorias-text-primary">Relatórios por profissional</h2>
          <button onClick={() => exportar("all")} className="btn-primary text-sm py-2 px-4">
            <Download size={14} /> Exportar tudo
          </button>
        </div>
        <div className="space-y-3">
          {PROFESSORES_MOCK.map((prof, i) => (
            <motion.div key={prof.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-extrabold"
                  style={{ backgroundColor: prof.corAvatar + "22", color: prof.corAvatar }}>{prof.iniciais}</div>
                <div>
                  <p className="font-bold text-memorias-text-primary">{prof.nome}</p>
                  <p className="text-xs text-memorias-text-muted">{prof.area} · {prof.totalAlunos} alunos · {prof.registrosSemana} registros</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm font-bold" style={{ color: prof.engajamentoFamilias >= 70 ? "#4CAF50" : "#F59E0B" }}>
                  <TrendingUp size={14} />{prof.engajamentoFamilias}% eng.
                </div>
                <button onClick={() => exportar(prof.id)}
                  className="text-sm font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  style={exportados.has(prof.id)
                    ? { backgroundColor: "#F0FBF0", color: "#4CAF50" }
                    : { backgroundColor: "#FEF9E7", color: "#1A1A1A" }}>
                  <Download size={13} />
                  {exportados.has(prof.id) ? "Exportado" : "Exportar"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
