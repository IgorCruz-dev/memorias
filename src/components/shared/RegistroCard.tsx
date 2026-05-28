"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Trophy,
  Pencil,
  Eye,
  HeartPulse,
  School,
  Home,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Registro } from "@/lib/types/registro";
import { HumorEmoji } from "./HumorEmoji";
import { useToast } from "./Toast";
import { formatDate } from "@/lib/utils/formatters";

interface RegistroCardProps {
  registro: Registro;
  onDevolutiva?: (id: string) => void;
  delay?: number;
}

const TIPO_CONFIG = {
  conquista: {
    icon: Trophy,
    label: "Conquista",
    color: "#F5C518",
    bg: "#FEF9E7",
  },
  atividade: {
    icon: Pencil,
    label: "Atividade",
    color: "#3B82F6",
    bg: "#EFF6FF",
  },
  observacao: {
    icon: Eye,
    label: "Observação",
    color: "#8D8D8D",
    bg: "#F4F4EF",
  },
  saude: {
    icon: HeartPulse,
    label: "Saúde",
    color: "#4CAF50",
    bg: "#F0FBF0",
  },
};

export function RegistroCard({ registro, delay = 0 }: RegistroCardProps) {
  const [sugestaoAberta, setSugestaoAberta] = useState(false);
  const [devolutivaFeita, setDevolutivaFeita] = useState(
    !!registro.sugestaoAtividade?.devolutiva
  );
  const [confete, setConfete] = useState(false);
  const { showToast } = useToast();

  const tipo = TIPO_CONFIG[registro.tipo];
  const TipoIcon = tipo.icon;
  const isConquista = registro.tipo === "conquista";

  function handleFizemos() {
    setDevolutivaFeita(true);
    setConfete(true);
    showToast("Ótimo! Devolutiva enviada para a equipe da APAE 💛");
    setTimeout(() => setConfete(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`bg-white rounded-2xl border shadow-soft overflow-hidden ${
        isConquista ? "conquista-card" : "border-memorias-border"
      }`}
    >
      {/* Confete overlay */}
      <AnimatePresence>
        {confete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-2xl"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-8px",
                  backgroundColor: ["#F5C518", "#4CAF50", "#3B82F6", "#A78BFA", "#F97316"][
                    i % 5
                  ],
                }}
                animate={{
                  y: 100,
                  rotate: Math.random() * 360,
                  opacity: [1, 0],
                }}
                transition={{ duration: 1.2, delay: Math.random() * 0.4 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Origem badge */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg"
              style={
                registro.origem === "apae"
                  ? { backgroundColor: "#EFF6FF", color: "#3B82F6" }
                  : { backgroundColor: "#F0FBF0", color: "#4CAF50" }
              }
            >
              {registro.origem === "apae" ? (
                <School size={12} />
              ) : (
                <Home size={12} />
              )}
              {registro.origem === "apae" ? "APAE" : "Família"}
            </span>

            {/* Tipo badge */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: tipo.bg, color: tipo.color }}
            >
              <TipoIcon size={12} />
              {tipo.label}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <HumorEmoji valor={registro.humor} size="sm" />
            <span className="text-xs text-memorias-text-muted">
              {formatDate(registro.data)}
            </span>
          </div>
        </div>

        {/* Título */}
        <h3 className="font-extrabold text-base text-memorias-text-primary mb-1">
          {registro.titulo}
        </h3>

        {/* Autor */}
        <p className="text-xs font-semibold text-memorias-text-muted mb-2">
          por {registro.autor.nome}
          {registro.autor.area && ` · ${registro.autor.area}`}
        </p>

        {/* Descrição */}
        <p className="text-sm text-memorias-text-secondary leading-relaxed">
          {registro.descricao}
        </p>

        {/* Foto */}
        {registro.fotos.length > 0 && (
          <div className="mt-3 rounded-xl overflow-hidden relative h-40">
            <Image
              src={registro.fotos[0]}
              alt="Registro"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}

        {/* Sugestão para casa */}
        {registro.sugestaoAtividade && (
          <div className="mt-4">
            {devolutivaFeita ? (
              <div
                className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl"
                style={{ backgroundColor: "#F0FBF0", color: "#4CAF50" }}
              >
                <CheckCircle2 size={16} />
                Devolutiva enviada
              </div>
            ) : (
              <>
                <button
                  onClick={() => setSugestaoAberta((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
                  style={{ backgroundColor: "#FEF9E7", color: "#1A1A1A" }}
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb size={16} style={{ color: "#F5C518" }} />
                    Ver sugestão para casa
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${sugestaoAberta ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {sugestaoAberta && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 p-4 rounded-xl bg-memorias-surface border border-memorias-border">
                        <p className="text-sm text-memorias-text-secondary leading-relaxed mb-3">
                          {registro.sugestaoAtividade.descricao}
                        </p>
                        <button
                          onClick={handleFizemos}
                          className="btn-primary text-sm py-2 px-4 w-full justify-center"
                        >
                          <CheckCircle2 size={16} />
                          Fizemos!
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
