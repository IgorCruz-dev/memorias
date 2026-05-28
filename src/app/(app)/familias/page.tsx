"use client";
import { motion } from "framer-motion";
import { Users, MessageCircle, TrendingUp, TrendingDown } from "lucide-react";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";

export default function FamiliasPage() {
  const sorted = [...ALUNOS_MOCK].sort((a, b) => b.familia.engajamento - a.familia.engajamento);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <Users size={24} style={{ color: "#F5C518" }} />
          Famílias
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">{ALUNOS_MOCK.length} famílias cadastradas</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Muito engajadas", count: sorted.filter(a => a.familia.engajamento >= 80).length, color: "#4CAF50" },
          { label: "Engajamento médio", count: sorted.filter(a => a.familia.engajamento >= 50 && a.familia.engajamento < 80).length, color: "#F59E0B" },
          { label: "Baixo engajamento", count: sorted.filter(a => a.familia.engajamento < 50).length, color: "#EF4444" },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-white rounded-2xl p-4 border border-memorias-border shadow-soft text-center">
            <p className="text-3xl font-extrabold" style={{ color }}>{count}</p>
            <p className="text-xs text-memorias-text-muted mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {sorted.map((aluno, i) => {
          const eng = aluno.familia.engajamento;
          const cor = eng >= 80 ? "#4CAF50" : eng >= 50 ? "#F59E0B" : "#EF4444";
          return (
            <motion.div key={aluno.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-extrabold shrink-0"
                  style={{ backgroundColor: aluno.corAvatar + "22", color: aluno.corAvatar }}>{aluno.iniciais}</div>
                <div>
                  <p className="font-extrabold text-memorias-text-primary">{aluno.nome}</p>
                  <p className="text-xs text-memorias-text-muted">
                    {aluno.familia.responsavel} ({aluno.familia.parentesco}) · {aluno.familia.telefone}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-memorias-text-muted flex items-center gap-1">
                      <MessageCircle size={10} /> Engajamento
                    </span>
                    <span className="text-xs font-extrabold" style={{ color: cor }}>{eng}%</span>
                  </div>
                  <div className="h-2 bg-memorias-surface rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${eng}%`, backgroundColor: cor }} />
                  </div>
                </div>
                {eng >= 70 ? <TrendingUp size={18} style={{ color: "#4CAF50" }} /> : <TrendingDown size={18} style={{ color: "#EF4444" }} />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
