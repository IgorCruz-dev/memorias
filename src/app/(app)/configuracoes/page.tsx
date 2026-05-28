"use client";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Users, Palette, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/shared/Toast";

const SECOES = [
  { icon: Bell, label: "Notificações", desc: "Configure quais alertas receber", cor: "#F5C518" },
  { icon: Users, label: "Equipe", desc: "Gerencie profissionais e acessos", cor: "#4CAF50" },
  { icon: Shield, label: "Privacidade", desc: "Controle de dados e LGPD", cor: "#3B82F6" },
  { icon: Palette, label: "Aparência", desc: "Tema e personalização", cor: "#A78BFA" },
];

export default function ConfiguracoesPage() {
  const { showToast } = useToast();
  const [notif, setNotif] = useState({ novosRegistros: true, alertasSemRegistro: true, relatorios: false });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <Settings size={24} style={{ color: "#F5C518" }} />
          Configurações
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Gerencie as preferências da plataforma</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {SECOES.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: s.cor + "18" }}>
                <s.icon size={20} style={{ color: s.cor }} />
              </div>
              <div>
                <p className="font-extrabold text-memorias-text-primary">{s.label}</p>
                <p className="text-xs text-memorias-text-muted">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft">
        <h2 className="font-extrabold text-memorias-text-primary mb-4 flex items-center gap-2">
          <Bell size={18} style={{ color: "#F5C518" }} /> Notificações
        </h2>
        <div className="space-y-4">
          {[
            { key: "novosRegistros" as const, label: "Novos registros da equipe", desc: "Receber quando um profissional fizer um registro" },
            { key: "alertasSemRegistro" as const, label: "Alertas de alunos sem registro", desc: "Alertar quando aluno passar 7 dias sem registro" },
            { key: "relatorios" as const, label: "Relatórios prontos", desc: "Notificar quando um relatório for gerado" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-memorias-text-primary">{label}</p>
                <p className="text-xs text-memorias-text-muted">{desc}</p>
              </div>
              <button onClick={() => setNotif(prev => ({ ...prev, [key]: !prev[key] }))}
                className="w-12 h-6 rounded-full transition-colors shrink-0 relative"
                style={{ backgroundColor: notif[key] ? "#F5C518" : "#E8E8E2" }}>
                <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all"
                  style={{ left: notif[key] ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={() => showToast("Configurações salvas!")}
          className="btn-primary mt-5 text-sm px-5 py-2.5 flex items-center gap-2">
          <CheckCircle2 size={15} /> Salvar configurações
        </button>
      </div>
    </div>
  );
}
