"use client";

import { motion } from "framer-motion";
import {
  Users,
  PlusCircle,
  MessageCircle,
  AlertTriangle,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { KPICard } from "@/components/shared/KPICard";
import { AlunoCard } from "@/components/shared/AlunoCard";
import { DASHBOARD_PROFESSOR } from "@/lib/mock-data/dashboard";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import Link from "next/link";

const AREAS = ["Todos", "Escola", "Saúde", "Terapia Ocupacional", "Fonoaudiologia", "Fisioterapia"];

export function DashboardProfessor() {
  const d = DASHBOARD_PROFESSOR;
  const alertas = ALUNOS_MOCK.filter((a) => a.diasSemRegistro > 7);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">

      {/* Saudação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-extrabold text-memorias-text-primary mb-1">
          Bom dia, {d.nomeProfessor}!
        </h1>
        <p className="text-memorias-text-secondary text-lg font-semibold">
          Você tem {d.totalAlunos} alunos ativos hoje.
        </p>
      </motion.div>

      {/* Botão novo registro — destaque total */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Link href="/novo-registro" prefetch={false}>
          <button className="btn-primary text-base px-8 py-4 text-lg w-full md:w-auto justify-center rounded-2xl">
            <PlusCircle size={22} />
            Novo Registro
          </button>
        </Link>
      </motion.div>

      {/* Alerta sem registro */}
      {alertas.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between p-4 rounded-2xl border-2"
          style={{ backgroundColor: "#FFF8F0", borderColor: "#F97316" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#F97316" }}
            >
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div>
              <p className="font-extrabold text-memorias-text-primary">
                {alertas.length} aluno{alertas.length > 1 ? "s" : ""} sem registro há mais de 7 dias
              </p>
              <p className="text-sm text-memorias-text-secondary">
                {alertas.map((a) => a.nome).join(", ")}
              </p>
            </div>
          </div>
          <Link href="/alunos" prefetch={false}>
            <button className="text-sm font-bold px-4 py-2 rounded-xl transition-colors hover:bg-orange-100"
              style={{ color: "#F97316" }}>
              Ver quem são →
            </button>
          </Link>
        </motion.div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Users}
          iconColor="#F5C518"
          iconBg="#FEF9E7"
          label="Meus alunos"
          value={d.totalAlunos}
          sublabel="Ativos agora"
          delay={0.1}
        />
        <KPICard
          icon={ClipboardList}
          iconColor="#4CAF50"
          iconBg="#F0FBF0"
          label="Registros esta semana"
          value={d.registrosSemana}
          sublabel={`${d.registrosHoje} hoje`}
          delay={0.15}
        />
        <KPICard
          icon={MessageCircle}
          iconColor="#3B82F6"
          iconBg="#EFF6FF"
          label="Famílias engajadas"
          value={`${d.engajamentoFamilias}%`}
          sublabel="Respondendo sugestões"
          delay={0.2}
        />
        <KPICard
          icon={AlertTriangle}
          iconColor={alertas.length > 0 ? "#F97316" : "#4CAF50"}
          iconBg={alertas.length > 0 ? "#FFF8F0" : "#F0FBF0"}
          label="Atenção necessária"
          value={alertas.length > 0 ? `${alertas.length} aluno${alertas.length > 1 ? "s" : ""}` : "Tudo ok"}
          sublabel={alertas.length > 0 ? "Sem registro recente" : "Todos registrados"}
          delay={0.25}
        />
      </div>

      {/* Grid alunos + Gráfico */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Grid de alunos */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-memorias-text-primary">
              Meus alunos
            </h2>
            <Link href="/alunos" prefetch={false}>
              <span className="text-sm font-bold text-memorias-yellow hover:underline">
                Ver todos →
              </span>
            </Link>
          </div>

          {/* Filtros de área */}
          <div className="flex flex-wrap gap-2 mb-4">
            {AREAS.map((area) => (
              <button
                key={area}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors"
                style={
                  area === "Todos"
                    ? { backgroundColor: "#F5C518", color: "#1A1A1A", borderColor: "#F5C518" }
                    : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E8E8E2" }
                }
              >
                {area}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {ALUNOS_MOCK.slice(0, 4).map((aluno, i) => (
              <AlunoCard key={aluno.id} aluno={aluno} delay={i * 0.07} />
            ))}
          </div>
        </div>

        {/* Gráfico de engajamento */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-memorias-border shadow-soft"
        >
          <h2 className="text-base font-extrabold text-memorias-text-primary mb-1 flex items-center gap-2">
            <TrendingUp size={18} style={{ color: "#3B82F6" }} />
            Participação das famílias
          </h2>
          <p className="text-xs text-memorias-text-muted mb-5">
            % de devolutivas no mês
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={d.engajamentoAlunos}
              layout="vertical"
              margin={{ left: 0, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0EA" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                type="category"
                dataKey="nome"
                tick={{ fontSize: 11, fill: "#6B7280", fontFamily: "Nunito" }}
                axisLine={false}
                tickLine={false}
                width={72}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #E8E8E2", fontFamily: "Nunito", fontSize: 12 }}
                formatter={(v) => [`${v}%`, "Engajamento"]}
              />
              <Bar dataKey="valor" radius={[0, 6, 6, 0]}>
                {d.engajamentoAlunos.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.valor >= 80 ? "#4CAF50" : entry.valor >= 60 ? "#F5C518" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
