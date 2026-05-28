"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserCheck, TrendingUp } from "lucide-react";
import { PROFESSORES_MOCK } from "@/lib/mock-data/professores";

export default function ProfessoresPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <UserCheck size={24} style={{ color: "#F5C518" }} />
          Professores e Terapeutas
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">{PROFESSORES_MOCK.length} profissionais ativos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROFESSORES_MOCK.map((prof, i) => (
          <motion.div key={prof.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <Link href={`/professor/${prof.id}`} prefetch={false}>
              <div className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft hover:shadow-medium transition-shadow cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-extrabold shrink-0"
                    style={{ backgroundColor: prof.corAvatar + "22", color: prof.corAvatar }}>{prof.iniciais}</div>
                  <div>
                    <p className="font-extrabold text-memorias-text-primary group-hover:text-memorias-yellow transition-colors">{prof.nome}</p>
                    <p className="text-xs text-memorias-text-muted">{prof.area}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Alunos", value: prof.totalAlunos },
                    { label: "Registros", value: prof.registrosSemana },
                    { label: "Engaj.", value: `${prof.engajamentoFamilias}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-memorias-surface rounded-xl p-2">
                      <p className="text-lg font-extrabold text-memorias-text-primary">{value}</p>
                      <p className="text-xs text-memorias-text-muted">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-memorias-text-muted flex items-center gap-1"><TrendingUp size={10} /> Engajamento famílias</span>
                    <span className="text-xs font-bold" style={{ color: prof.engajamentoFamilias >= 70 ? "#4CAF50" : "#F59E0B" }}>
                      {prof.engajamentoFamilias}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-memorias-surface rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${prof.engajamentoFamilias}%`, backgroundColor: prof.engajamentoFamilias >= 70 ? "#4CAF50" : "#F59E0B" }} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
