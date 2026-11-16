import { useEffect, useState } from "react";
import { FilePlus2 } from "lucide-react";
import { ProvedorEstado, navegar, useRota } from "./estado.jsx";
import { Botao, Modal, ProvedorAvisos } from "./componentes/Ui.jsx";
import Layout from "./componentes/Layout.jsx";
import Laudos from "./telas/Laudos.jsx";
import NovoLaudo from "./telas/NovoLaudo.jsx";
import Editor from "./telas/Editor.jsx";
import VerLaudo from "./telas/VerLaudo.jsx";
import { DetalheCliente, ListaClientes } from "./telas/Clientes.jsx";
import Modelos from "./telas/Modelos.jsx";
import Configuracoes from "./telas/Configuracoes.jsx";

function Tela({ rota }) {
  let m;
  if (rota === "/laudos/novo") return <NovoLaudo />;
  if ((m = rota.match(/^\/laudos\/([\w-]+)\/editar$/))) return <Editor key={m[1]} id={m[1]} />;
  if ((m = rota.match(/^\/laudos\/([\w-]+)$/))) return <VerLaudo key={m[1]} id={m[1]} />;
  if ((m = rota.match(/^\/clientes\/([\w-]+)$/))) return <DetalheCliente id={m[1]} />;
  if (rota === "/clientes") return <ListaClientes />;
  if (rota === "/modelos") return <Modelos />;
  if (rota === "/configuracoes") return <Configuracoes />;
  return <Laudos />;
}

const CHAVE_BOAS_VINDAS = "reprice-prototipo-boas-vindas";

function BoasVindas() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem(CHAVE_BOAS_VINDAS)) setAberto(true);
    } catch {
      setAberto(true);
    }
  }, []);
  const fechar = () => {
    setAberto(false);
    try {
      localStorage.setItem(CHAVE_BOAS_VINDAS, "1");
    } catch {
      /* sem armazenamento: mostra de novo na próxima visita, sem problema */
    }
  };
  const itens = [
    ["01", "O laudo é o formulário", "Clique em qualquer campo do próprio laudo e digite — como no Word, mas com cadastro, conferência e fotos de arrastar."],
    ["02", "Tudo aqui funciona", "Busque um cliente pela placa, anexe fotos, emita, imprima ou salve em PDF."],
    ["03", "Dados fictícios", "Nada sai deste navegador. A impressão leva a marca d'água DEMONSTRAÇÃO."],
  ];
  return (
    <Modal
      aberto={aberto}
      aoFechar={fechar}
      titulo="Sistema de laudos — protótipo"
      rodape={
        <>
          <Botao onClick={fechar}>Explorar por conta</Botao>
          <Botao variante="primario" icone={FilePlus2} onClick={() => { fechar(); navegar("/laudos/novo"); }}>
            Criar um laudo de teste
          </Botao>
        </>
      }
    >
      <ol className="border-t border-linha">
        {itens.map(([n, titulo, texto]) => (
          <li key={n} className="flex gap-4 border-b border-linha py-3">
            <span className="font-mono text-[13px] font-semibold text-tinta-3">{n}</span>
            <span>
              <span className="block font-cond text-[18px] font-bold uppercase tracking-[0.04em]">{titulo}</span>
              <span className="block text-[14.5px] leading-snug text-tinta-2">{texto}</span>
            </span>
          </li>
        ))}
      </ol>
    </Modal>
  );
}

function Rotas() {
  const rota = useRota();
  return (
    <Layout rota={rota}>
      <Tela rota={rota} />
      <BoasVindas />
    </Layout>
  );
}

export default function App() {
  return (
    <ProvedorEstado>
      <ProvedorAvisos>
        <Rotas />
      </ProvedorAvisos>
    </ProvedorEstado>
  );
}
