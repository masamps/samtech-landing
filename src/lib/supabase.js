import { createClient } from "@supabase/supabase-js";

// A chave publicável é pública por natureza — ela vai para o bundle e qualquer
// pessoa consegue lê-la. Quem protege os dados é o Row Level Security no banco:
// sem um token de sessão válido, nenhuma linha é devolvida. Por isso não existe
// "esconder a chave"; existe política de acesso bem escrita.
const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isConfigured = Boolean(URL && KEY);

export const supabase = isConfigured
  ? createClient(URL, KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;

export const TABELA = "crm_prospects";

export const STATUS = [
  "Não contatado",
  "Contatado",
  "Respondeu",
  "Em conversa",
  "Proposta enviada",
  "Fechado",
  "Descartado",
];

// Status que só existem depois de uma resposta do prospect.
export const RESPONDERAM = ["Respondeu", "Em conversa", "Proposta enviada", "Fechado"];

export const CANAIS = ["WhatsApp", "E-mail", "Instagram", "LinkedIn", "Telefone"];
export const TRILHAS = [
  { valor: "A", rotulo: "A — Conferência de documentos" },
  { valor: "B", rotulo: "B — Serviço em campo" },
];
export const AVALIACOES = ["Sim", "Não", "Avaliar"];
