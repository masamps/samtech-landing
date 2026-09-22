import { useState } from "react";
import { LockKeyhole, LoaderCircle } from "lucide-react";
import { supabase } from "../../lib/supabase.js";

// Tentativas seguidas no mesmo navegador entram em espera. Não substitui o
// rate limit do servidor — é só para não deixar um script local martelar à vontade.
const ESPERA_MS = 20000;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [bloqueadoAte, setBloqueadoAte] = useState(0);

  async function entrar(evento) {
    evento.preventDefault();
    setErro("");

    if (Date.now() < bloqueadoAte) {
      const faltam = Math.ceil((bloqueadoAte - Date.now()) / 1000);
      setErro(`Muitas tentativas. Tente de novo em ${faltam}s.`);
      return;
    }

    setEnviando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    setEnviando(false);

    if (error) {
      // Credencial recusada pelo servidor (400/401) recebe mensagem genérica de
      // propósito: dizer "esse e-mail não existe" entrega a quem está tentando
      // adivinhar quais contas são válidas. Falha de rede é outra coisa e
      // merece mensagem honesta — senão o usuário fica trocando a senha certa.
      const credencialRecusada = error.status === 400 || error.status === 401;
      if (credencialRecusada) {
        setErro("E-mail ou senha incorretos.");
        setBloqueadoAte(Date.now() + ESPERA_MS);
        setSenha("");
      } else {
        setErro("Não consegui falar com o servidor. Verifique sua conexão e tente de novo.");
      }
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface">
            <LockKeyhole className="h-5 w-5 text-brand-300" aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-semibold text-white">
            Painel interno
          </h1>
          <p className="mt-1 text-sm text-mist">Samps Projetos</p>
        </div>

        <form onSubmit={entrar} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-mist">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              maxLength={120}
              className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-400"
            />
          </div>

          <div>
            <label htmlFor="senha" className="mb-1.5 block text-sm text-mist">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
              maxLength={200}
              className="w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-white outline-none transition focus:border-brand-400"
            />
          </div>

          {erro && (
            <p role="alert" className="text-sm text-red-400">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            {enviando && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {enviando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mist/60">
          Página privada. Todo acesso é autenticado no servidor.
        </p>
      </div>
    </main>
  );
}
