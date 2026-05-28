"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  ClipboardList,
  School,
  Home,
  Trophy,
  CheckCircle2,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";
import { REGISTROS_MOCK } from "@/lib/mock-data/registros";
import { RegistroCard } from "@/components/shared/RegistroCard";
import { ProgressoArea } from "@/components/shared/ProgressoArea";
import { HumorEmoji } from "@/components/shared/HumorEmoji";
import { getAreaColor } from "@/lib/utils/formatters";

type Tab = "registros" | "evolucao" | "relatorio";
type FiltroOrigem = "todos" | "apae" | "familia";

export default function AlunoPage() {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = useState<Tab>("registros");
  const [filtroOrigem, setFiltroOrigem] = useState<FiltroOrigem>("todos");
  const [exportado, setExportado] = useState(false);

  const aluno = ALUNOS_MOCK.find((a) => a.id === id);
  if (!aluno) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-memorias-text-muted">
        <p className="text-lg font-bold">Aluno não encontrado</p>
        <Link href="/dashboard" prefetch={false} className="text-sm font-semibold text-memorias-yellow mt-2">
          Voltar ao painel
        </Link>
      </div>
    );
  }

  const registros = REGISTROS_MOCK.filter((r) => r.alunoId === id);
  const registrosFiltrados = filtroOrigem === "todos"
    ? registros
    : registros.filter((r) => r.origem === filtroOrigem);

  const conquistas = registros.filter((r) => r.tipo === "conquista");

  function handleExportar() {
    setExportado(true);
    setTimeout(() => setExportado(false), 3000);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* Voltar */}
      <Link href="/dashboard" prefetch={false}>
        <button className="flex items-center gap-2 text-sm font-semibold text-memorias-text-secondary hover:text-memorias-text-primary transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Voltar ao painel
        </button>
      </Link>

      {/* Header do aluno */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-memorias-border shadow-soft"
      >
        <div className="flex items-start gap-5 flex-wrap">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-extrabold shrink-0"
            style={{ backgroundColor: aluno.corAvatar + "22", color: aluno.corAvatar }}
          >
            {aluno.iniciais}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-memorias-text-primary">
                  {aluno.nome}
                </h1>
                <p className="text-memorias-text-secondary font-semibold">
                  {aluno.diagnostico} · {aluno.idade} anos · Turno: {aluno.turno}
                </p>
              </div>
              <HumorEmoji valor={aluno.humorMedio} size="lg" showLabel />
            </div>

            {/* Responsáveis */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-memorias-surface">
                <School size={14} style={{ color: "#F5C518" }} />
                <div>
                  <p className="text-xs text-memorias-text-muted">Responsável APAE</p>
                  <p className="text-sm font-bold text-memorias-text-primary">
                    {aluno.responsavelAPAE.nome}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-memorias-surface">
                <Home size={14} style={{ color: "#4CAF50" }} />
                <div>
                  <p className="text-xs text-memorias-text-muted">Família</p>
                  <p className="text-sm font-bold text-memorias-text-primary">
                    {aluno.familia.responsavel} ({aluno.familia.parentesco})
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-xl"
                style={{ backgroundColor: "#F0FBF0" }}
              >
                <CheckCircle2 size={14} style={{ color: "#4CAF50" }} />
                <div>
                  <p className="text-xs text-memorias-text-muted">Engajamento familiar</p>
                  <p className="text-sm font-bold" style={{ color: "#4CAF50" }}>
                    {aluno.familia.engajamento}%
                  </p>
                </div>
              </div>
            </div>

            {/* Áreas */}
            <div className="flex flex-wrap gap-2 mt-3">
              {aluno.areas.map((area) => (
                <span
                  key={area}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: getAreaColor(area) + "22",
                    color: getAreaColor(area),
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Abas */}
      <div className="flex gap-2 bg-memorias-surface rounded-2xl p-1.5">
        {([
          { id: "registros", label: "Registros", icon: BookOpen },
          { id: "evolucao", label: "Evolução", icon: TrendingUp },
          { id: "relatorio", label: "Relatório", icon: ClipboardList },
        ] as { id: Tab; label: string; icon: React.ElementType }[]).map(({ id: tabId, label, icon: Icon }) => (
          <button
            key={tabId}
            onClick={() => setTab(tabId)}
            className="relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{
              color: tab === tabId ? "#1A1A1A" : "#6B7280",
              backgroundColor: tab === tabId ? "#FFFFFF" : "transparent",
              boxShadow: tab === tabId ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <Icon size={16} style={{ color: tab === tabId ? "#F5C518" : "#9CA3AF" }} />
            {label}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* ABA: REGISTROS */}
          {tab === "registros" && (
            <div className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-2">
                {(["todos", "apae", "familia"] as FiltroOrigem[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFiltroOrigem(f)}
                    className="text-sm font-bold px-4 py-2 rounded-xl border transition-colors capitalize"
                    style={
                      filtroOrigem === f
                        ? { backgroundColor: "#F5C518", color: "#1A1A1A", borderColor: "#F5C518" }
                        : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E8E8E2" }
                    }
                  >
                    {f === "todos" ? "Todos" : f === "apae" ? "APAE" : "Família"}
                  </button>
                ))}
              </div>

              {registrosFiltrados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-memorias-text-muted">
                  <BookOpen size={40} className="mb-3 opacity-30" />
                  <p className="font-bold">Nenhum registro encontrado</p>
                  <p className="text-sm">Tente outro filtro ou adicione um novo registro.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {registrosFiltrados.map((r, i) => (
                    <RegistroCard key={r.id} registro={r} delay={i * 0.06} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ABA: EVOLUÇÃO */}
          {tab === "evolucao" && (
            <div className="space-y-6">
              {/* Gráfico geral */}
              <div className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft">
                <h3 className="text-base font-extrabold text-memorias-text-primary mb-5">
                  Evolução mensal geral
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={aluno.evolucaoMensal}>
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
                      contentStyle={{ borderRadius: 12, border: "1px solid #E8E8E2", fontFamily: "Nunito", fontSize: 13 }}
                      formatter={(v) => [`${v}%`, "Evolução"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="valor"
                      stroke="#F5C518"
                      strokeWidth={3}
                      dot={{ fill: "#F5C518", r: 6, strokeWidth: 0 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Por área */}
              <div>
                <h3 className="text-base font-extrabold text-memorias-text-primary mb-3">
                  Evolução por área
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {aluno.evolucaoPorArea.map((item, i) => (
                    <ProgressoArea
                      key={item.area}
                      area={item.area}
                      valor={item.valor}
                      cor={getAreaColor(item.area)}
                      delay={i * 120}
                    />
                  ))}
                </div>
              </div>

              {/* Conquistas do mês */}
              {conquistas.length > 0 && (
                <div>
                  <h3 className="text-base font-extrabold text-memorias-text-primary mb-3 flex items-center gap-2">
                    <Trophy size={18} style={{ color: "#F5C518" }} />
                    Conquistas do período
                  </h3>
                  <div className="space-y-2">
                    {conquistas.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-4 rounded-xl conquista-card"
                      >
                        <Trophy size={18} style={{ color: "#F5C518" }} />
                        <div>
                          <p className="font-bold text-sm text-memorias-text-primary">{c.titulo}</p>
                          <p className="text-xs text-memorias-text-muted">{c.autor.nome}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metas do ano */}
              <div className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft">
                <h3 className="text-base font-extrabold text-memorias-text-primary mb-3">
                  Metas do ano
                </h3>
                <div className="space-y-2">
                  {aluno.metasAno.map((meta, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-memorias-surface">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: "#FEF9E7" }}
                      >
                        <span className="text-xs font-extrabold" style={{ color: "#F5C518" }}>
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-sm text-memorias-text-primary font-semibold">{meta}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA: RELATÓRIO */}
          {tab === "relatorio" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-memorias-text-primary">
                      Relatório bimestral
                    </h3>
                    <p className="text-sm text-memorias-text-muted">Maio — Julho 2024</p>
                  </div>
                  <button
                    onClick={handleExportar}
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    <Download size={16} />
                    {exportado ? "Exportado!" : "Exportar PDF"}
                  </button>
                </div>

                {exportado && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl flex items-center gap-2 text-sm font-semibold"
                    style={{ backgroundColor: "#F0FBF0", color: "#4CAF50" }}
                  >
                    <CheckCircle2 size={16} />
                    Relatório exportado com sucesso!
                  </motion.div>
                )}

                {/* Resumo */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Registros APAE", value: registros.filter(r => r.origem === "apae").length },
                    { label: "Registros família", value: registros.filter(r => r.origem === "familia").length },
                    { label: "Conquistas", value: conquistas.length },
                    { label: "Evolução geral", value: `${aluno.evolucaoGeral}%` },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center p-4 rounded-2xl bg-memorias-surface">
                      <p className="text-2xl font-extrabold text-memorias-text-primary">{value}</p>
                      <p className="text-xs text-memorias-text-muted mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Evolução por área no relatório */}
                <div className="space-y-3">
                  <h4 className="font-extrabold text-memorias-text-primary">Evolução por área</h4>
                  {aluno.evolucaoPorArea.map((item, i) => (
                    <ProgressoArea
                      key={item.area}
                      area={item.area}
                      valor={item.valor}
                      cor={getAreaColor(item.area)}
                      delay={i * 80}
                    />
                  ))}
                </div>

                {/* Metas atingidas */}
                <div className="mt-6">
                  <h4 className="font-extrabold text-memorias-text-primary mb-3">
                    Metas em andamento
                  </h4>
                  <div className="space-y-2">
                    {aluno.metasAno.map((meta, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-memorias-surface">
                        <CheckCircle2 size={16} style={{ color: i < 1 ? "#4CAF50" : "#D1D1CB" }} />
                        <p className="text-sm text-memorias-text-primary">{meta}</p>
                        <span
                          className="ml-auto text-xs font-bold px-2 py-0.5 rounded-lg"
                          style={
                            i < 1
                              ? { backgroundColor: "#F0FBF0", color: "#4CAF50" }
                              : { backgroundColor: "#F4F4EF", color: "#9CA3AF" }
                          }
                        >
                          {i < 1 ? "Em progresso" : "Iniciando"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
