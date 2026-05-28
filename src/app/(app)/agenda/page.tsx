"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { getAreaColor } from "@/lib/utils/formatters";

const aluno = ALUNOS_MOCK[0];
const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

export default function AgendaPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <CalendarDays size={24} style={{ color: "#F5C518" }} />
          Agenda do Miguel
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Semana atual — atendimentos na APAE</p>
      </div>
      <div className="grid gap-3">
        {DIAS.map((dia, i) => {
          const atendimentos = aluno.cronograma.filter((c) => c.diaSemana === dia);
          return (
            <motion.div key={dia} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft flex items-center gap-5">
              <div className="w-16 text-center shrink-0">
                <p className="text-xs font-bold text-memorias-text-muted uppercase">{dia.slice(0, 3)}</p>
                <p className="text-2xl font-extrabold text-memorias-text-primary">{22 + i}</p>
                <p className="text-xs text-memorias-text-muted">Jul</p>
              </div>
              <div className="w-px h-12 bg-memorias-border shrink-0" />
              {atendimentos.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {atendimentos.map((a, j) => (
                    <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ backgroundColor: getAreaColor(a.area) + "18" }}>
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: getAreaColor(a.area) }} />
                      <div>
                        <p className="text-sm font-bold text-memorias-text-primary">{a.area}</p>
                        <p className="text-xs text-memorias-text-muted">{a.horario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-memorias-text-muted italic">Sem atendimento</p>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft">
        <h2 className="font-extrabold text-memorias-text-primary mb-3">Áreas de atendimento</h2>
        <div className="flex flex-wrap gap-2">
          {aluno.areas.map((area) => (
            <span key={area} className="text-xs font-bold px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: getAreaColor(area) + "18", color: getAreaColor(area) }}>{area}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
