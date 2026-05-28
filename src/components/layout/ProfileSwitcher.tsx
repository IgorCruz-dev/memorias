"use client";

import { motion } from "framer-motion";
import { Home, GraduationCap, BarChart3 } from "lucide-react";
import { usePerfil } from "@/lib/context/ProfileContext";
import { Perfil } from "@/lib/types/usuario";

const PERFIS: { id: Perfil; label: string; icon: React.ElementType }[] = [
  { id: "familia", label: "Família", icon: Home },
  { id: "professor", label: "Professor", icon: GraduationCap },
  { id: "gestor", label: "Gestor", icon: BarChart3 },
];

export function ProfileSwitcher() {
  const { perfil, setPerfil } = usePerfil();

  return (
    <div className="flex items-center gap-1 bg-memorias-surface rounded-2xl p-1 border border-memorias-border">
      {PERFIS.map(({ id, label, icon: Icon }) => {
        const isActive = perfil === id;
        return (
          <button
            key={id}
            onClick={() => setPerfil(id)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-memorias-yellow"
            style={{
              color: isActive ? "#1A1A1A" : "#6B7280",
            }}
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.div
                layoutId="profile-switcher-bg"
                className="absolute inset-0 rounded-xl border border-memorias-border"
                style={{ backgroundColor: "#F5C518" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon size={16} />
              <span>{label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
