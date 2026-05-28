"use client";
import { motion } from "framer-motion";
import { ClipboardList, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/shared/Toast";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { REGISTROS_MOCK } from "@/lib/mock-data/registros";

export default function RelatoriosPage() {
  const { showToast } = useToast();
  const [exportados, setExportados] = useState<Set<string>>(new Set());

  const exportar = (id: string, nome: string) => {
    setExportados(prev => { const s = new Set(prev); s.add(id); return s; });
    showToast(`Relatório de ${nome} exportado com sucesso!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <ClipboardList size={24} style={{ color: "#F5C518" }} />
          Relatórios
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Relatórios bimestrais dos seus alunos</p>
      </div>

      <div className="grid gap-4">
        {ALUNOS_MOCK.map((aluno, i) => {
          const regs = REGISTROS_MOCK.filter(r => r.alunoId === aluno.id);
          const exportado = exportados.has(aluno.id);
          return (
            <motion.div key={aluno.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-extrabold shrink-0"
                  style={{ backgroundColor: aluno.corAvatar + "22", color: aluno.corAvatar }}>{aluno.iniciais}</div>
                <div>
                  <p className="font-extrabold text-memorias-text-primary">{aluno.nome}</p>
                  <p className="text-xs text-memorias-text-muted">{aluno.diagnostico} · {regs.length} registros</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-extrabold" style={{ color: "#4CAF50" }}>{aluno.evolucaoGeral}%</p>
                  <p className="text-xs text-memorias-text-muted">Evolução</p>
                </div>
                <button onClick={() => exportar(aluno.id, aluno.nome)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                  style={exportado
                    ? { backgroundColor: "#F0FBF0", color: "#4CAF50" }
                    : { backgroundColor: "#F5C518", color: "#1A1A1A" }}>
                  {exportado ? <CheckCircle2 size={15} /> : <Download size={15} />}
                  {exportado ? "Exportado" : "Exportar PDF"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
