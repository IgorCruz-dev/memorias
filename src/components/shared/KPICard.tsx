"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  label: string;
  value: string | number;
  sublabel?: string;
  highlight?: boolean;
  delay?: number;
}

export function KPICard({
  icon: Icon,
  iconColor = "#F5C518",
  iconBg = "#FEF9E7",
  label,
  value,
  sublabel,
  highlight = false,
  delay = 0,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl p-5 border border-memorias-border shadow-soft hover:shadow-medium transition-shadow"
      style={highlight ? { borderColor: "#F5C518", borderWidth: 2 } : {}}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-extrabold text-memorias-text-primary leading-none">
          {value}
        </p>
        <p className="text-sm font-semibold text-memorias-text-secondary mt-1">
          {label}
        </p>
        {sublabel && (
          <p className="text-xs text-memorias-text-muted mt-0.5">{sublabel}</p>
        )}
      </div>
    </motion.div>
  );
}
