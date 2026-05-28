"use client";
import { useState } from "react";

import Link from "next/link";
import { Users, PlusCircle } from "lucide-react";
import { AlunoCard } from "@/components/shared/AlunoCard";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";

const AREAS = ["Todos", "Escola", "Saúde", "Terapia Ocupacional", "Fonoaudiologia", "Fisioterapia"];

export default function AlunosPage() {
  const [area, setArea] = useState("Todos");
  const [busca, setBusca] = useState("");

  const filtrados = ALUNOS_MOCK.filter((a) => {
    const matchArea = area === "Todos" || a.areas.includes(area);
    const matchBusca = a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.diagnostico.toLowerCase().includes(busca.toLowerCase());
    return matchArea && matchBusca;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
            <Users size={24} style={{ color: "#F5C518" }} />
            Meus Alunos
          </h1>
          <p className="text-memorias-text-secondary text-sm mt-1">{ALUNOS_MOCK.length} alunos ativos</p>
        </div>
        <Link href="/novo-registro" prefetch={false}>
          <button className="btn-primary text-sm px-5 py-2.5">
            <PlusCircle size={16} />
            Novo Registro
          </button>
        </Link>
      </div>

      <input
        type="text" placeholder="Buscar por nome ou diagnóstico..." value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border border-memorias-border bg-white text-sm font-semibold focus:outline-none focus:border-memorias-yellow transition-colors"
      />

      <div className="flex flex-wrap gap-2">
        {AREAS.map((a) => (
          <button key={a} onClick={() => setArea(a)}
            className="text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors"
            style={area === a
              ? { backgroundColor: "#F5C518", color: "#1A1A1A", borderColor: "#F5C518" }
              : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E8E8E2" }}>
            {a}
          </button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-memorias-text-muted">
          <Users size={40} className="mb-3 opacity-30" />
          <p className="font-bold">Nenhum aluno encontrado</p>
          <p className="text-sm">Tente outro filtro ou termo de busca.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtrados.map((aluno, i) => <AlunoCard key={aluno.id} aluno={aluno} delay={i * 0.06} />)}
        </div>
      )}
    </div>
  );
}
