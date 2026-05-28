import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)", "sans-serif"],
        sans:   ["var(--font-nunito)", "sans-serif"],
      },
      colors: {
        memorias: {
          yellow:         "#F5C518",
          "yellow-hover": "#E0B014",
          "yellow-muted": "#FEF9E7",
          green:          "#4CAF50",
          "green-muted":  "#F0FBF0",
          gray:           "#8D8D8D",
          cream:          "#FAFAF7",
          surface:        "#F4F4EF",
          white:          "#FFFFFF",
          border:         "#E8E8E2",
          "border-subtle":"#F0F0EA",
          "text-primary": "#1A1A1A",
          "text-secondary":"#6B7280",
          "text-muted":   "#9CA3AF",
        },
        /* Aliases para shadcn compatibility */
        background:  "#FAFAF7",
        foreground:  "#1A1A1A",
        border:      "#E8E8E2",
        ring:        "#F5C518",
      },
      borderRadius: {
        DEFAULT: "1rem",
        sm:  "0.75rem",
        md:  "0.875rem",
        lg:  "1rem",
        xl:  "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft:      "0 2px 12px rgba(0, 0, 0, 0.06)",
        medium:    "0 4px 20px rgba(0, 0, 0, 0.08)",
        card:      "0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "gold-glow": "0 0 18px 4px rgba(245, 197, 24, 0.5)",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "glow-gold": {
          "0%, 100%": { boxShadow: "0 0 6px 0 rgba(245,197,24,0.4)" },
          "50%":      { boxShadow: "0 0 18px 4px rgba(245,197,24,0.7)" },
        },
      },
      animation: {
        shimmer:      "shimmer 1.4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 400ms ease forwards",
        "scale-in":   "scale-in 250ms ease forwards",
        "glow-gold":  "glow-gold 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
