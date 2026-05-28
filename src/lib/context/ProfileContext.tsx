"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Perfil } from "@/lib/types/usuario";

interface ProfileContextValue {
  perfil: Perfil;
  setPerfil: (perfil: Perfil) => void;
  isTransitioning: boolean;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [perfil, setPerfilState] = useState<Perfil>("familia");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPerfil = useCallback((novoPerfil: Perfil) => {
    if (novoPerfil === perfil) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPerfilState(novoPerfil);
      setIsTransitioning(false);
    }, 150);
  }, [perfil]);

  return (
    <ProfileContext.Provider value={{ perfil, setPerfil, isTransitioning }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function usePerfil() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("usePerfil must be used within ProfileProvider");
  return ctx;
}
