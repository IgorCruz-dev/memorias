"use client";
import { motion } from "framer-motion";
import { Users, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/components/shared/Toast";

const EQUIPE = [
  { iniciais: "AL", nome: "Profa. Ana Lima", area: "Escola", cor: "#F5C518", telefone: "(35) 3333-0001", destaque: true },
  { iniciais: "CS", nome: "Terapeuta Carla Souza", area: "Terapia Ocupacional", cor: "#10B981", telefone: "(35) 3333-0002", destaque: false },
  { iniciais: "RV", nome: "Fono. Renata Vieira", area: "Fonoaudiologia", cor: "#A78BFA", telefone: "(35) 3333-0003", destaque: false },
  { iniciais: "FL", nome: "Dr. Fernando Lima", area: "Saúde", cor: "#3B82F6", telefone: "(35) 3333-0004", destaque: false },
];

export default function EquipePage() {
  const { showToast } = useToast();
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <Users size={24} style={{ color: "#F5C518" }} />
          Nossa Equipe na APAE
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Profissionais que acompanham o Miguel</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {EQUIPE.map((p, i) => (
          <motion.div key={p.nome} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
            className="bg-white rounded-2xl p-5 border shadow-soft"
            style={{ borderColor: p.destaque ? "#F5C518" : "#E8E8E2", borderWidth: p.destaque ? 2 : 1 }}>
            {p.destaque && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg mb-3 inline-block" style={{ backgroundColor: "#FEF9E7", color: "#F5C518" }}>
                Responsável principal
              </span>
            )}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-extrabold shrink-0"
                style={{ backgroundColor: p.cor + "22", color: p.cor }}>{p.iniciais}</div>
              <div>
                <p className="font-extrabold text-memorias-text-primary">{p.nome}</p>
                <p className="text-sm text-memorias-text-secondary">{p.area}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-memorias-text-muted mb-4">
              <Phone size={12} />{p.telefone}
            </div>
            <button onClick={() => showToast(`Mensagem enviada para ${p.nome}!`)}
              className="btn-primary w-full justify-center text-sm py-2.5">
              <MessageCircle size={15} />
              Enviar mensagem
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
