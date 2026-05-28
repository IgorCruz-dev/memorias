"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, AlertTriangle, MessageCircle } from "lucide-react";
import { Aluno } from "@/lib/types/aluno";
import { HumorEmoji } from "./HumorEmoji";
import { formatDate } from "@/lib/utils/formatters";

interface AlunoCardProps {
  aluno: Aluno;
  delay?: number;
}

export function AlunoCard({ aluno, delay = 0 }: AlunoCardProps) {
  const semRegistro = aluno.diasSemRegistro > 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <Link href={`/aluno/${aluno.id}`} prefetch={false}>
        <div
          className={`bg-white rounded-2xl p-5 border shadow-soft hover:shadow-medium transition-all cursor-pointer group ${
            semRegistro ? "border-orange-200" : "border-memorias-border"
          }`}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-extrabold shrink-0"
              style={{ backgroundColor: aluno.corAvatar + "22", color: aluno.corAvatar }}
            >
              {aluno.iniciais}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-memorias-text-primary group-hover:text-memorias-yellow transition-colors">
                  {aluno.nome}
                </h3>
                {semRegistro && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-lg bg-orange-50 text-orange-500">
                    <AlertTriangle size={10} />
                    Sem registro
                  </span>
                )}
              </div>
              <p className="text-xs text-memorias-text-muted">{aluno.diagnostico}</p>
            </div>
            <HumorEmoji valor={aluno.humorMedio} size="sm" />
          </div>

          {/* Evolução geral */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-memorias-text-secondary">Evolução geral</span>
              <span className="text-xs font-extrabold" style={{ color: "#4CAF50" }}>
                {aluno.evolucaoGeral}%
              </span>
            </div>
            <div className="h-2 bg-memorias-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${aluno.evolucaoGeral}%`,
                  backgroundColor: "#4CAF50",
                }}
              />
            </div>
          </div>

          {/* Engajamento família */}
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-xs font-semibold text-memorias-text-secondary flex items-center gap-1">
                <MessageCircle size={11} />
                Família engajada
              </span>
              <span className="text-xs font-extrabold" style={{ color: "#3B82F6" }}>
                {aluno.familia.engajamento}%
              </span>
            </div>
            <div className="h-2 bg-memorias-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${aluno.familia.engajamento}%`,
                  backgroundColor: "#3B82F6",
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-memorias-border-subtle">
            <span className="text-xs text-memorias-text-muted flex items-center gap-1">
              <Clock size={11} />
              Último registro: {formatDate(aluno.ultimoRegistro)}
            </span>
            <span className="text-xs font-semibold" style={{ color: aluno.corAvatar }}>
              {aluno.turno}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
