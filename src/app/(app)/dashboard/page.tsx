"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePerfil } from "@/lib/context/ProfileContext";
import { DashboardFamilia } from "@/components/familia/DashboardFamilia";
import { DashboardProfessor } from "@/components/professor/DashboardProfessor";
import { DashboardGestor } from "@/components/gestor/DashboardGestor";

export default function DashboardPage() {
  const { perfil, isTransitioning } = usePerfil();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={perfil}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: isTransitioning ? 0 : 1, y: isTransitioning ? 8 : 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {perfil === "familia" && <DashboardFamilia />}
        {perfil === "professor" && <DashboardProfessor />}
        {perfil === "gestor" && <DashboardGestor />}
      </motion.div>
    </AnimatePresence>
  );
}
