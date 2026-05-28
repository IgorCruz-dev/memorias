"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { getAreaColor } from "@/lib/utils/formatters";

const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
const HORARIOS = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const AGENDA = ALUNOS_MOCK.slice(0, 4).flatMap((aluno) =>
  aluno.cronograma.map((c) => ({ ...c, aluno: aluno.nome, iniciais: aluno.iniciais, cor: aluno.corAvatar, alunoId: aluno.id }))
);

export default function AgendaProfPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <CalendarDays size={24} style={{ color: "#F5C518" }} />
          Minha Agenda
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Semana de 22 a 26 de julho</p>
      </div>

      <div className="overflow-x-auto">
        <div className="grid gap-3 min-w-[600px]" style={{ gridTemplateColumns: `80px repeat(5, 1fr)` }}>
          <div />
          {DIAS.map((d) => (
            <div key={d} className="text-center py-2">
              <p className="text-xs font-bold text-memorias-text-muted uppercase">{d.slice(0, 3)}</p>
              <p className="text-lg font-extrabold text-memorias-text-primary">{22 + DIAS.indexOf(d)}</p>
            </div>
          ))}

          {HORARIOS.map((h) => (
            <>
              <div key={h} className="text-right pr-3 py-2 text-xs font-bold text-memorias-text-muted self-start mt-1">{h}</div>
              {DIAS.map((dia) => {
                const sessoes = AGENDA.filter((a) => a.diaSemana === dia && a.horario === h);
                return (
                  <motion.div key={dia + h} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className="min-h-[52px] rounded-xl border border-memorias-border-subtle p-1 flex flex-col gap-1"
                    style={{ backgroundColor: sessoes.length ? "#FAFAF7" : "#FAFAF7" }}>
                    {sessoes.map((s, i) => (
                      <div key={i} className="px-2 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                        style={{ backgroundColor: getAreaColor(s.area) + "22", color: getAreaColor(s.area) }}>
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-xs font-extrabold shrink-0"
                          style={{ backgroundColor: s.cor + "33", color: s.cor }}>{s.iniciais.charAt(0)}</span>
                        {s.aluno.split(" ")[0]}
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {ALUNOS_MOCK.slice(0, 4).map((a) => (
          <div key={a.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-memorias-border">
            <div className="w-4 h-4 rounded-md" style={{ backgroundColor: a.corAvatar }} />
            <span className="text-xs font-bold text-memorias-text-secondary">{a.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
