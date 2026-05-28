"use client";

import { Bell } from "lucide-react";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { usePerfil } from "@/lib/context/ProfileContext";

const PERFIL_LABEL: Record<string, string> = {
  familia: "Olá, Maria",
  professor: "Olá, Profa. Ana",
  gestor: "Painel da gestão",
};

export function Header() {
  const { perfil } = usePerfil();

  return (
    <header className="h-16 bg-white border-b border-memorias-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      <p className="text-sm font-semibold text-memorias-text-secondary hidden md:block">
        {PERFIL_LABEL[perfil]}
      </p>

      <div className="flex items-center gap-4 ml-auto">
        <ProfileSwitcher />

        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-memorias-surface border border-transparent hover:border-memorias-border"
          aria-label="Notificações"
        >
          <Bell size={18} className="text-memorias-text-secondary" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: "#EF4444" }}
          />
        </button>
      </div>
    </header>
  );
}
