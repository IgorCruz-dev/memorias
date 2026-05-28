"use client";

import { motion } from "framer-motion";

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.8 }}
      className="space-y-8 max-w-5xl mx-auto"
    >
      {/* Saudação */}
      <SkeletonBlock className="h-32 w-full rounded-3xl" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-5 gap-6">
        <SkeletonBlock className="lg:col-span-3 h-64 rounded-2xl" />
        <div className="lg:col-span-2 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
