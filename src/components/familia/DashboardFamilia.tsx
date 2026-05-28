"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Trophy,
  CalendarCheck,
  MessageCircle,
  Flower2,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { KPICard } from "@/components/shared/KPICard";
import { ProgressoArea } from "@/components/shared/ProgressoArea";
import { RegistroCard } from "@/components/shared/RegistroCard";
import { DASHBOARD_FAMILIA } from "@/lib/mock-data/dashboard";
import { REGISTROS_MOCK } from "@/lib/mock-data/registros";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { formatHumor } from "@/lib/utils/formatters";

const registrosMiguel = REGISTROS_MOCK.filter((r) => r.alunoId === "aluno-001").slice(0, 4);
const aluno = ALUNOS_MOCK.find((a) => a.id === "aluno-001")!;

export function DashboardFamilia() {
  const d = DASHBOARD_FAMILIA;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      {/* Saudação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-8 flex items-center justify-between overflow-hidden relative"
        style={{ backgroundColor: "#FEF9E7", border: "2px solid #F5C518" }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-memorias-text-primary mb-1">
            Olá, {d.nomeResponsavel}! 💛
          </h1>
          <p className="text-memorias-text-secondary text-lg font-semibold">
            {d.nomeAluno} teve um ótimo dia hoje na APAE
          </p>
          <p className="text-memorias-text-muted text-sm mt-2">
            Acompanhe a jornada do {d.nomeAluno} em tempo real
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center w-24 h-24 rounded-full opacity-20"
          style={{ backgroundColor: "#F5C518" }}>
          <Flower2 size={48} style={{ color: "#F5C518" }} />
        </div>
        <Flower2
          size={120}
          className="absolute -right-4 -top-4 opacity-10"
          style={{ color: "#F5C518" }}
        />
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={TrendingUp}
          iconColor="#4CAF50"
          iconBg="#F0FBF0"
          label="Evolução geral"
          value={`${d.evolucaoGeral}%`}
          sublabel="Crescendo sempre"
          delay={0.1}
        />
        <KPICard
          icon={Trophy}
          iconColor="#F5C518"
          iconBg="#FEF9E7"
          label="Conquistas essa semana"
          value={d.conquistasSemana}
          sublabel="Que orgulho!"
          highlight
          delay={0.15}
        />
        <KPICard
          icon={MessageCircle}
          iconColor="#A78BFA"
          iconBg="#F5F3FF"
          label="Humor médio"
          value={getHumorDisplay(d.humorMedio)}
          sublabel={formatHumor(d.humorMedio)}
          delay={0.2}
        />
        <KPICard
          icon={CalendarCheck}
          iconColor="#3B82F6"
          iconBg="#EFF6FF"
          label="Próximo atendimento"
          value={d.proximoAtendimento.diaSemana}
          sublabel={`${d.proximoAtendimento.horario} · ${d.proximoAtendimento.area}`}
          delay={0.25}
        />
      </div>

      {/* Gráfico de evolução + Evolução por área */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="lg:col-span-3 bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-lg font-extrabold text-memorias-text-primary mb-1">
            Como o {d.nomeAluno} evoluiu nos últimos meses
          </h2>
          <p className="text-sm text-memorias-text-muted mb-5">
            Cada ponto é uma semana de dedicação 💛
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={d.evolucaoMensal}>
              <defs>
                <linearGradient id="gradYellow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F5C518" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EA" vertical={false} />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E8E8E2",
                  fontFamily: "Nunito",
                  fontSize: 13,
                }}
                formatter={(v) => [`${v}%`, "Evolução"]}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#F5C518"
                strokeWidth={3}
                fill="url(#gradYellow)"
                dot={{ fill: "#F5C518", r: 5, strokeWidth: 0 }}
                activeDot={{ r: 7, fill: "#E0B014" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Evolução por área */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lg:col-span-2 space-y-3"
        >
          <h2 className="text-lg font-extrabold text-memorias-text-primary">
            Evolução por área
          </h2>
          {d.evolucaoPorArea.map((item, i) => (
            <ProgressoArea
              key={item.area}
              area={item.area}
              valor={item.valor}
              cor={item.cor}
              delay={i * 100}
            />
          ))}
        </motion.div>
      </div>

      {/* Registros recentes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-memorias-text-primary">
            O que aconteceu recentemente
          </h2>
          <a
            href="/diario"
            className="text-sm font-bold text-memorias-yellow hover:underline flex items-center gap-1"
          >
            Ver tudo →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {registrosMiguel.map((r, i) => (
            <RegistroCard key={r.id} registro={r} delay={i * 0.08} />
          ))}
        </div>
      </div>

      {/* Próximos atendimentos + Equipe */}
      <div className="grid md:grid-cols-2 gap-6 pb-6">
        {/* Cronograma */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-lg font-extrabold text-memorias-text-primary mb-4 flex items-center gap-2">
            <CalendarCheck size={20} style={{ color: "#F5C518" }} />
            Próximos atendimentos
          </h2>
          <div className="space-y-3">
            {aluno.cronograma.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl"
                style={{ backgroundColor: "#FAFAF7" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                  style={{ backgroundColor: "#FEF9E7" }}
                >
                  <span className="text-xs font-bold text-memorias-text-muted leading-none">
                    {c.diaSemana.slice(0, 3)}
                  </span>
                  <span className="text-sm font-extrabold" style={{ color: "#F5C518" }}>
                    {c.horario}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-memorias-text-primary">{c.area}</p>
                  <p className="text-xs text-memorias-text-muted">{c.diaSemana}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Equipe */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-lg font-extrabold text-memorias-text-primary mb-4 flex items-center gap-2">
            <Users size={20} style={{ color: "#F5C518" }} />
            Nossa equipe na APAE
          </h2>

          <div className="flex items-center gap-4 p-4 rounded-2xl mb-3" style={{ backgroundColor: "#FEF9E7" }}>
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-extrabold shrink-0"
              style={{ backgroundColor: "#F5C518", color: "#1A1A1A" }}
            >
              AL
            </div>
            <div>
              <p className="font-extrabold text-memorias-text-primary">Profa. Ana Lima</p>
              <p className="text-sm text-memorias-text-secondary">Escola · Responsável principal</p>
            </div>
          </div>

          <div className="space-y-2">
            {[
              { iniciais: "CS", nome: "Terapeuta Carla", area: "Terapia Ocupacional", cor: "#10B981" },
              { iniciais: "RV", nome: "Fono. Renata", area: "Fonoaudiologia", cor: "#A78BFA" },
            ].map((p) => (
              <div key={p.iniciais} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-memorias-surface">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0"
                  style={{ backgroundColor: p.cor + "22", color: p.cor }}
                >
                  {p.iniciais}
                </div>
                <div>
                  <p className="text-sm font-bold text-memorias-text-primary">{p.nome}</p>
                  <p className="text-xs text-memorias-text-muted">{p.area}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary w-full mt-4 justify-center text-sm">
            <MessageCircle size={16} />
            Enviar mensagem para a equipe
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function getHumorDisplay(valor: number): string {
  if (valor >= 4.5) return "😄 4.5";
  if (valor >= 3.5) return `🙂 ${valor.toFixed(1)}`;
  if (valor >= 2.5) return `😐 ${valor.toFixed(1)}`;
  return `😞 ${valor.toFixed(1)}`;
}
