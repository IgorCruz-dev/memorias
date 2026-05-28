"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, CheckCircle2, ChevronDown } from "lucide-react";
import { REGISTROS_MOCK } from "@/lib/mock-data/registros";
import { useToast } from "@/components/shared/Toast";

export default function AtividadesPage() {
  const sugestoes = REGISTROS_MOCK.filter(
    (r) => r.alunoId === "aluno-001" && r.sugestaoAtividade !== null
  );
  const { showToast } = useToast();
  const [feitas, setFeitas] = useState<Set<string>>(
    new Set(sugestoes.filter(r => r.sugestaoAtividade?.devolutiva).map(r => r.id))
  );
  const [abertas, setAbertas] = useState<Set<string>>(new Set());

  const toggle = (id: string) => setAbertas(prev => {
    const next = new Set(prev);
    if (next.has(id)) { next.delete(id); } else { next.add(id); }
    return next;
  });

  const marcarFeita = (id: string) => {
    setFeitas(prev => { const s = new Set(prev); s.add(id); return s; });
    showToast("Devolutiva enviada para a equipe da APAE 💛");
  };

  const pendentes = sugestoes.filter(r => !feitas.has(r.id));
  const concluidas = sugestoes.filter(r => feitas.has(r.id));

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <Lightbulb size={24} style={{ color: "#F5C518" }} />
          Atividades para Casa
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">
          Sugestões da equipe da APAE para praticar em casa
        </p>
      </div>

      {pendentes.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-extrabold text-memorias-text-primary flex items-center gap-2">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#F5C518" }}>{pendentes.length}</span>
            Pendentes
          </h2>
          {pendentes.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-memorias-border shadow-soft overflow-hidden">
              <button onClick={() => toggle(r.id)} className="w-full flex items-center justify-between p-5 text-left">
                <div>
                  <p className="font-extrabold text-memorias-text-primary text-sm">{r.titulo}</p>
                  <p className="text-xs text-memorias-text-muted mt-0.5">por {r.autor.nome}</p>
                </div>
                <ChevronDown size={16} className={`text-memorias-text-muted transition-transform ${abertas.has(r.id) ? "rotate-180" : ""}`} />
              </button>
              {abertas.has(r.id) && (
                <div className="px-5 pb-5 space-y-3">
                  <p className="text-sm text-memorias-text-secondary leading-relaxed bg-memorias-surface rounded-xl p-4">
                    {r.sugestaoAtividade!.descricao}
                  </p>
                  <button onClick={() => marcarFeita(r.id)} className="btn-primary w-full justify-center text-sm py-2.5">
                    <CheckCircle2 size={16} />
                    Fizemos!
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {concluidas.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-extrabold text-memorias-text-muted">Concluídas ({concluidas.length})</h2>
          {concluidas.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-memorias-border p-5 flex items-center gap-3 opacity-70">
              <CheckCircle2 size={20} style={{ color: "#4CAF50" }} />
              <p className="font-semibold text-sm text-memorias-text-secondary">{r.titulo}</p>
            </div>
          ))}
        </div>
      )}

      {sugestoes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-memorias-text-muted">
          <Lightbulb size={40} className="mb-3 opacity-30" />
          <p className="font-bold">Nenhuma sugestão no momento</p>
          <p className="text-sm">A equipe ainda não enviou atividades para casa.</p>
        </div>
      )}
    </div>
  );
}
