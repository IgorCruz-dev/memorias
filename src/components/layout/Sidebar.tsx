"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, BookOpen, CalendarDays, Lightbulb, Users,
  LayoutDashboard, PlusCircle, ClipboardList, CalendarCheck,
  Settings, UserCheck, ChevronLeft, ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { usePerfil } from "@/lib/context/ProfileContext";
import { Perfil } from "@/lib/types/usuario";

interface NavItem { href: string; label: string; icon: React.ElementType }

const NAV_ITEMS: Record<Perfil, NavItem[]> = {
  familia: [
    { href: "/dashboard",  label: "Início",              icon: Home },
    { href: "/diario",     label: "Diário do Miguel",    icon: BookOpen },
    { href: "/agenda",     label: "Agenda",              icon: CalendarDays },
    { href: "/atividades", label: "Atividades para Casa",icon: Lightbulb },
    { href: "/equipe",     label: "Nossa Equipe",        icon: Users },
  ],
  professor: [
    { href: "/dashboard",     label: "Painel",          icon: LayoutDashboard },
    { href: "/alunos",        label: "Meus Alunos",     icon: Users },
    { href: "/novo-registro", label: "Novo Registro",   icon: PlusCircle },
    { href: "/relatorios",    label: "Relatórios",      icon: ClipboardList },
    { href: "/agenda-prof",   label: "Agenda",          icon: CalendarDays },
  ],
  gestor: [
    { href: "/dashboard",        label: "Visão Geral",  icon: LayoutDashboard },
    { href: "/professores",      label: "Professores",  icon: UserCheck },
    { href: "/familias",         label: "Famílias",     icon: Users },
    { href: "/relatorios-gestor",label: "Relatórios",   icon: ClipboardList },
    { href: "/configuracoes",    label: "Configurações",icon: Settings },
  ],
};

export function Sidebar() {
  const { perfil } = usePerfil();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) setCollapsed(saved === "true");
  }, []);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", String(next));
  };

  const items = NAV_ITEMS[perfil];
  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="min-h-screen bg-white border-r border-memorias-border flex flex-col shrink-0 overflow-hidden"
      style={{ minWidth: collapsed ? 68 : 256 }}
    >
      {/* Logo + toggle */}
      <div className={`flex items-center pt-6 pb-4 px-3 ${collapsed ? "flex-col gap-2" : "justify-between"}`}>
        {collapsed ? (
          <Image src="/icon.png" alt="Memórias" width={40} height={40} className="rounded-2xl" />
        ) : (
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="Memórias" width={40} height={40} className="rounded-2xl shrink-0" />
            <div>
              <p className="font-extrabold text-memorias-text-primary text-lg leading-tight">Memórias</p>
              <p className="text-xs text-memorias-text-muted font-semibold">APAE</p>
            </div>
          </div>
        )}
        <button
          onClick={toggle}
          className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-memorias-surface transition-colors text-memorias-text-muted border border-memorias-border"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Nav */}
      <AnimatePresence mode="wait">
        <motion.nav
          key={perfil}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex flex-col gap-1 px-2 flex-1"
        >
          {items.map(({ href, label, icon: Icon }, i) => {
            const active = isActive(href);
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={href}
                  prefetch={false}
                  title={collapsed ? label : undefined}
                  className="flex items-center rounded-xl text-sm font-semibold transition-all duration-150 group"
                  style={{
                    backgroundColor: active ? "#FEF9E7" : "transparent",
                    color: active ? "#1A1A1A" : "#6B7280",
                    borderLeft: active ? "3px solid #F5C518" : "3px solid transparent",
                    padding: collapsed ? "10px 0" : "10px 12px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : 12,
                  }}
                >
                  <Icon size={18} style={{ color: active ? "#F5C518" : "#9CA3AF" }} className="shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </AnimatePresence>

      {/* Footer */}
      {!collapsed && mounted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 pb-8 mt-auto"
        >
          <div className="rounded-2xl p-4" style={{ backgroundColor: "#FEF9E7" }}>
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck size={16} style={{ color: "#F5C518" }} />
              <span className="text-xs font-bold text-memorias-text-primary">Próximo atendimento</span>
            </div>
            <p className="text-sm font-semibold text-memorias-text-primary">Quarta, 08h</p>
            <p className="text-xs text-memorias-text-secondary">Escola — Profa. Ana Lima</p>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
}
