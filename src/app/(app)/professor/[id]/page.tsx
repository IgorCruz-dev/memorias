"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Users, ClipboardList, MessageCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { PROFESSORES_MOCK } from "@/lib/mock-data/professores";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { AlunoCard } from "@/components/shared/AlunoCard";
import { KPICard } from "@/components/shared/KPICard";

export default function ProfessorPage() {
  const { id } = useParams<{ id: string }>();
  const prof = PROFESSORES_MOCK.find((p) => p.id === id);

  if (!prof) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <p className="font-bold text-memorias-text-muted">Profissional não encontrado</p>
      <Link href="/professores" prefetch={false} className="text-sm font-bold text-memorias-yellow hover:underline">
        Voltar
      </Link>
    </div>
  );

  const alunosDoProfessor = ALUNOS_MOCK.slice(0, prof.totalAlunos > 4 ? 4 : prof.totalAlunos);
  const chartData = alunosDoProfessor.map(a => ({ nome: a.nome.split(" ")[0], evolucao: a.evolucaoGeral, humor: a.humorMedio * 20 }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/professores" prefetch={false}>
        <button className="flex items-center gap-2 text-sm font-semibold text-memorias-text-secondary hover:text-memorias-text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Professores
        </button>
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-memorias-border shadow-soft">
        <div className="flex items-start gap-5 flex-wrap">
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-extrabold shrink-0"
            style={{ backgroundColor: prof.corAvatar + "22", color: prof.corAvatar }}>{prof.iniciais}</div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-memorias-text-primary">{prof.nome}</h1>
            <p className="text-memorias-text-secondary font-semibold">{prof.area}</p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg"
                style={{ backgroundColor: prof.corAvatar + "18", color: prof.corAvatar }}>{prof.area}</span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-memorias-surface text-memorias-text-secondary">
                Desde Jan 2024
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Users} iconColor="#F5C518" iconBg="#FEF9E7" label="Alunos" value={prof.totalAlunos} delay={0.1} />
        <KPICard icon={ClipboardList} iconColor="#4CAF50" iconBg="#F0FBF0" label="Registros semana" value={prof.registrosSemana} delay={0.15} />
        <KPICard icon={MessageCircle} iconColor="#3B82F6" iconBg="#EFF6FF" label="Engajamento famílias" value={`${prof.engajamentoFamilias}%`} delay={0.2} />
        <KPICard icon={TrendingUp} iconColor="#A78BFA" iconBg="#F5F3FF" label="Último acesso" value="Hoje" sublabel={prof.ultimoAcesso} delay={0.25} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="font-extrabold text-memorias-text-primary flex items-center gap-2">
            <Users size={18} style={{ color: "#F5C518" }} />
            Alunos atendidos
          </h2>
          <div className="grid gap-4">
            {alunosDoProfessor.map((aluno, i) => <AlunoCard key={aluno.id} aluno={aluno} delay={i * 0.07} />)}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-memorias-border shadow-soft">
          <h2 className="font-extrabold text-memorias-text-primary mb-1 text-base">Evolução dos alunos</h2>
          <p className="text-xs text-memorias-text-muted mb-4">% evolução geral</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EA" vertical={false} />
              <XAxis dataKey="nome" tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E8E8E2", fontFamily: "Nunito", fontSize: 12 }}
                formatter={(v) => [`${v}%`, "Evolução"]} />
              <Bar dataKey="evolucao" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={["#F5C518", "#4CAF50", "#3B82F6", "#A78BFA"][i % 4]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
