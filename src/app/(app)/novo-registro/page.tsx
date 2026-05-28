"use client";
import { useState } from "react";

import { PlusCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/shared/Toast";
import { ALUNOS_MOCK } from "@/lib/mock-data/alunos";

const TIPOS = [
  { value: "conquista", label: "Conquista", color: "#F5C518" },
  { value: "atividade", label: "Atividade", color: "#3B82F6" },
  { value: "observacao", label: "Observação", color: "#8D8D8D" },
  { value: "saude", label: "Saúde", color: "#4CAF50" },
];

export default function NovoRegistroPage() {
  const { showToast } = useToast();
  const [tipo, setTipo] = useState("atividade");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [humor, setHumor] = useState(4);
  const [aluno, setAluno] = useState("aluno-001");
  const [sugestao, setSugestao] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!titulo.trim()) { showToast("Adicione um título ao registro", "warning"); return; }
    setSaved(true);
    showToast("Registro salvo! A família foi notificada 💛");
    setTimeout(() => { setTitulo(""); setDescricao(""); setSugestao(""); setSaved(false); }, 2500);
  };

  const HUMOR_EMOJIS = ["😢", "😞", "😐", "🙂", "😄"];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-memorias-text-primary flex items-center gap-2">
          <PlusCircle size={24} style={{ color: "#F5C518" }} />
          Novo Registro
        </h1>
        <p className="text-memorias-text-secondary text-sm mt-1">Registre o que aconteceu na sessão de hoje</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-memorias-border shadow-soft space-y-5">
        {/* Aluno */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-2">Aluno</label>
          <select value={aluno} onChange={(e) => setAluno(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-memorias-border bg-memorias-surface text-sm font-semibold focus:outline-none focus:border-memorias-yellow">
            {ALUNOS_MOCK.map((a) => <option key={a.id} value={a.id}>{a.nome}</option>)}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-2">Tipo de registro</label>
          <div className="flex flex-wrap gap-2">
            {TIPOS.map((t) => (
              <button key={t.value} onClick={() => setTipo(t.value)}
                className="text-sm font-bold px-4 py-2 rounded-xl border transition-colors"
                style={tipo === t.value
                  ? { backgroundColor: t.color, color: "#1A1A1A", borderColor: t.color }
                  : { backgroundColor: "#FFFFFF", color: "#6B7280", borderColor: "#E8E8E2" }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-2">Título <span className="text-memorias-danger">*</span></label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Reconheceu as letras A e B sozinho!"
            className="w-full px-4 py-3 rounded-xl border border-memorias-border text-sm font-semibold focus:outline-none focus:border-memorias-yellow transition-colors" />
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-2">Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}
            rows={4} placeholder="Descreva o que aconteceu na sessão..."
            className="w-full px-4 py-3 rounded-xl border border-memorias-border text-sm font-semibold focus:outline-none focus:border-memorias-yellow transition-colors resize-none" />
        </div>

        {/* Humor */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-3">
            Como o aluno estava? <span className="text-2xl ml-2">{HUMOR_EMOJIS[humor - 1]}</span>
          </label>
          <div className="flex items-center gap-3">
            <span className="text-xs text-memorias-text-muted">Mal</span>
            <input type="range" min={1} max={5} value={humor} onChange={(e) => setHumor(Number(e.target.value))}
              className="flex-1 accent-memorias-yellow" />
            <span className="text-xs text-memorias-text-muted">Ótimo</span>
          </div>
        </div>

        {/* Sugestão */}
        <div>
          <label className="block text-sm font-bold text-memorias-text-primary mb-2">Sugestão para a família (opcional)</label>
          <textarea value={sugestao} onChange={(e) => setSugestao(e.target.value)}
            rows={2} placeholder="O que a família pode praticar em casa..."
            className="w-full px-4 py-3 rounded-xl border border-memorias-border text-sm font-semibold focus:outline-none focus:border-memorias-yellow transition-colors resize-none" />
        </div>

        <button onClick={handleSave} className="btn-primary w-full justify-center text-base py-3.5">
          {saved ? <CheckCircle2 size={18} /> : <PlusCircle size={18} />}
          {saved ? "Registro salvo!" : "Salvar Registro"}
        </button>
      </div>
    </div>
  );
}
