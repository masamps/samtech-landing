import { CAMPOS_VEICULO, SUGESTOES_CIRETRAN, camposDoModelo } from "./dados.js";
import { mascaraAnos, mascaraDoc, mascaraMotor, mascaraNumero, mascaraPlaca, mascaraVin, problemaDoc, problemaPlaca, problemaVin } from "./campos.js";

/*
 * Registro dos campos editáveis de um laudo, NA ORDEM EM QUE APARECEM NO
 * DOCUMENTO. É a única fonte usada pelo laudo editável, pela lista de
 * conferência, pela navegação com Enter e pela edição no celular — assim
 * nenhum desses lugares fica com um campo a mais ou a menos que o outro.
 */

const maiusculas = (v) => v.toUpperCase();

function campoDoGrupo(grupo, chave, def) {
  return {
    id: `${grupo[0]}.${chave}`,
    tipo: "texto",
    obrigatorio: true,
    ler: (l) => l[grupo]?.[chave] ?? "",
    gravar: (l, v) => ({ ...l, [grupo]: { ...l[grupo], [chave]: v } }),
    ...def,
  };
}

const POR_TIPO_VEICULO = {
  vin: { mascara: mascaraVin, problema: problemaVin, mono: true, placeholder: "17 caracteres", sugere: "veiculo" },
  placa: { mascara: mascaraPlaca, problema: problemaPlaca, mono: true, placeholder: "ABC-1D23", sugere: "veiculo" },
  anos: { mascara: mascaraAnos, mono: true, inputMode: "numeric", placeholder: "2011/2012" },
  motor: { mascara: mascaraMotor, mono: true, placeholder: "numeração do motor" },
  texto: { mascara: maiusculas },
};

export function camposDoLaudo(modelo) {
  const campos = [
    {
      id: "modelo",
      rotulo: "Tipo de serviço",
      tipo: "modelo",
      obrigatorio: false,
      ler: (l) => l.modeloId,
      gravar: (l, v) => ({ ...l, modeloId: v }),
      dica: "Trocar o serviço troca os campos e as fotos do laudo.",
    },
    campoDoGrupo("autorizacao", "ciretran", {
      rotulo: "CIRETRAN / Estado",
      mascara: maiusculas,
      placeholder: "8 DRP LAGES",
      sugere: "lista",
      lista: () => SUGESTOES_CIRETRAN,
      dica: "Órgão que emitiu a autorização do serviço.",
    }),
    campoDoGrupo("autorizacao", "numero", {
      rotulo: "Nº da autorização",
      mascara: (v) => v.replace(/[^\d/]/g, "").slice(0, 12),
      mono: true,
      inputMode: "numeric",
      placeholder: "409/2026",
    }),
    campoDoGrupo("autorizacao", "responsavel", {
      rotulo: "Responsável pela autorização",
      mascara: maiusculas,
      placeholder: "nome de quem autorizou",
      sugere: "lista",
      lista: (estado) => [...new Set(estado.laudos.map((l) => l.autorizacao.responsavel).filter(Boolean))],
      dica: "Repete os nomes já usados nos laudos anteriores.",
    }),
    campoDoGrupo("proprietario", "nome", {
      rotulo: "Proprietário do veículo",
      mascara: maiusculas,
      placeholder: "nome ou razão social",
      sugere: "cliente",
      dica: "Se o cliente já fez serviço aqui, as sugestões aparecem enquanto você digita.",
    }),
    campoDoGrupo("proprietario", "doc", {
      rotulo: "CPF / CNPJ",
      mascara: mascaraDoc,
      problema: problemaDoc,
      mono: true,
      inputMode: "numeric",
      placeholder: "000.000.000-00",
      sugere: "cliente",
      dica: "O dígito verificador é conferido na hora.",
    }),
    campoDoGrupo("proprietario", "uf", { rotulo: "UF", tipo: "uf" }),
  ];

  for (const chave of camposDoModelo(modelo)) {
    const def = CAMPOS_VEICULO[chave];
    campos.push(
      campoDoGrupo("veiculo", chave, {
        rotulo: def.rotulo,
        ...POR_TIPO_VEICULO[def.tipo],
        ...(def.exemplo ? { placeholder: def.exemplo.toLowerCase() } : {}),
        ...(chave === "placa" ? { dica: "Placa já conhecida preenche o veículo e o dono sozinha." } : {}),
        ...(chave === "vin" ? { dica: "Sem I, O ou Q — no chassi eles são sempre 1 e 0." } : {}),
      })
    );
  }

  for (const bloco of modelo.fotos) {
    for (const slot of bloco.slots) {
      campos.push({
        id: `f.${slot.chave}`,
        rotulo: slot.rotulo.charAt(0) + slot.rotulo.slice(1).toLowerCase(),
        tipo: "foto",
        obrigatorio: true,
        ler: (l) => l.fotos[slot.chave] || "",
        gravar: (l, v) => {
          const fotos = { ...l.fotos };
          if (v) fotos[slot.chave] = v;
          else delete fotos[slot.chave];
          return { ...l, fotos };
        },
      });
    }
  }

  campos.push(
    campoDoGrupo("servico", "dataGravacao", { rotulo: "Data da gravação", tipo: "data" }),
    campoDoGrupo("servico", "dataEmissao", { rotulo: "Data de emissão", tipo: "data" }),
    campoDoGrupo("servico", "nf", { rotulo: "Nº da nota fiscal", mascara: mascaraNumero, mono: true, inputMode: "numeric", placeholder: "38" }),
    campoDoGrupo("servico", "remarcadorId", {
      rotulo: "Remarcador responsável",
      tipo: "remarcador",
      dica: "Clique na assinatura de quem fez o serviço.",
    })
  );

  return campos;
}

/** Mensagem do problema do campo, ou null se ele está pronto. */
export function problemaDoCampo(def, laudo) {
  const valor = def.ler(laudo);
  if (def.obrigatorio && !String(valor || "").trim()) {
    if (def.tipo === "foto") return "Foto não anexada.";
    if (def.tipo === "remarcador") return "Escolha quem assina o laudo.";
    return "Preencha este campo.";
  }
  return valor && def.problema ? def.problema(valor) : null;
}

/** Sugestões do cadastro (ou de uma lista fixa) para o que está sendo digitado. */
export function sugestoesPara(def, valor, estado) {
  if (!def?.sugere) return [];
  const texto = String(valor || "").trim().toUpperCase();

  if (def.sugere === "lista") {
    return def
      .lista(estado)
      .filter((op) => op !== texto && (!texto || op.includes(texto)))
      .slice(0, 6)
      .map((op) => ({ tipo: "texto", valor: op }));
  }

  const digitos = texto.replace(/\W/g, "");
  if (digitos.length < 2) return [];

  if (def.sugere === "veiculo") {
    return estado.veiculos
      .filter((v) => v.placa.replace("-", "").includes(digitos) || v.vin.includes(digitos))
      .map((v) => ({ tipo: "cadastro", veiculo: v, cliente: estado.clientes.find((c) => c.id === v.clienteId) }))
      .filter((s) => s.cliente)
      .slice(0, 5);
  }

  return estado.clientes
    .filter((c) => c.nome.includes(texto) || (digitos.length >= 3 && /^\d+$/.test(digitos) && c.doc.replace(/\D/g, "").includes(digitos)))
    .filter((c) => !(c.nome === texto || c.doc === valor))
    .slice(0, 5)
    .map((c) => ({ tipo: "cadastro", cliente: c, veiculo: null }));
}
