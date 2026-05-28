"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  UserCheck,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  Smartphone,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
} from "recharts";
import { KPICard } from "@/components/shared/KPICard";
import { DASHBOARD_GESTOR } from "@/lib/mock-data/dashboard";
import { PROFESSORES_MOCK } from "@/lib/mock-data/professores";

export function DashboardGestor() {
  const d = DASHBOARD_GESTOR;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      {/* Saudação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold text-memorias-text-primary mb-1">
          Visão geral da APAE
        </h1>
        <p className="text-memorias-text-secondary text-lg font-semibold">
          Tudo em um só lugar — {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          icon={Users}
          iconColor="#F5C518"
          iconBg="#FEF9E7"
          label="Total de alunos"
          value={d.totalAlunos}
          sublabel="Ativos na plataforma"
          delay={0.05}
        />
        <KPICard
          icon={Smartphone}
          iconColor="#4CAF50"
          iconBg="#F0FBF0"
          label="Famílias na plataforma"
          value={`${Math.round((d.familiasCadastradas / d.totalFamilias) * 100)}%`}
          sublabel={`${d.familiasCadastradas} de ${d.totalFamilias}`}
          delay={0.1}
        />
        <KPICard
          icon={TrendingUp}
          iconColor="#3B82F6"
          iconBg="#EFF6FF"
          label="Famílias ativas esta semana"
          value={`${d.familiasAtivasSemana}%`}
          sublabel="Acessos ou devolutivas"
          delay={0.15}
        />
        <KPICard
          icon={ClipboardList}
          iconColor="#A78BFA"
          iconBg="#F5F3FF"
          label="Registros esta semana"
          value={d.registrosSemana}
          sublabel="Por todos os profissionais"
          delay={0.2}
        />
        <KPICard
          icon={AlertTriangle}
          iconColor={d.relatoriosPendentes > 0 ? "#EF4444" : "#4CAF50"}
          iconBg={d.relatoriosPendentes > 0 ? "#FEF2F2" : "#F0FBF0"}
          label="Relatórios pendentes"
          value={d.relatoriosPendentes}
          sublabel={d.relatoriosPendentes > 0 ? "Precisam de atenção" : "Todos em dia"}
          delay={0.25}
        />
      </div>

      {/* Gráficos principais */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Engajamento semanal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-base font-extrabold text-memorias-text-primary mb-1">
            Engajamento das famílias cresce a cada semana
          </h2>
          <p className="text-xs text-memorias-text-muted mb-5">
            % de famílias ativas nas últimas 6 semanas
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={d.engajamentoSemanal}>
              <defs>
                <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EA" vertical={false} />
              <XAxis
                dataKey="semana"
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #E8E8E2", fontFamily: "Nunito", fontSize: 12 }}
                formatter={(v) => [`${v}%`, "Famílias ativas"]}
              />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#4CAF50"
                strokeWidth={3}
                fill="url(#gradGreen)"
                dot={{ fill: "#4CAF50", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#3d9142" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribuição por área */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-base font-extrabold text-memorias-text-primary mb-1">
            Distribuição por área de atendimento
          </h2>
          <p className="text-xs text-memorias-text-muted mb-5">
            Total de alunos por área
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={d.alunosPorArea} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EA" vertical={false} />
              <XAxis
                dataKey="area"
                tick={{ fontSize: 10, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #E8E8E2", fontFamily: "Nunito", fontSize: 12 }}
                formatter={(v) => [v, "Alunos"]}
              />
              <Bar dataKey="quantidade" radius={[6, 6, 0, 0]}>
                {d.alunosPorArea.map((_, i) => (
                  <Cell
                    key={i}
                    fill={["#F5C518", "#4CAF50", "#3B82F6", "#A78BFA", "#F97316"][i % 5]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Grid de professores */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-memorias-text-primary flex items-center gap-2">
            <UserCheck size={20} style={{ color: "#F5C518" }} />
            Equipe de profissionais
          </h2>
          <Link href="/professores" prefetch={false}>
            <span className="text-sm font-bold text-memorias-yellow hover:underline">
              Ver todos →
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROFESSORES_MOCK.map((prof, i) => (
            <motion.div
              key={prof.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.3 }}
            >
              <Link href={`/professor/${prof.id}`} prefetch={false}>
                <div className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft hover:shadow-medium transition-shadow cursor-pointer group">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-base font-extrabold shrink-0"
                      style={{ backgroundColor: prof.corAvatar + "22", color: prof.corAvatar }}
                    >
                      {prof.iniciais}
                    </div>
                    <div>
                      <p className="font-extrabold text-memorias-text-primary group-hover:text-memorias-yellow transition-colors">
                        {prof.nome}
                      </p>
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
