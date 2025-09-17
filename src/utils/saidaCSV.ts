/*
// Dependências necessárias:
// npm install @types/node
// Este arquivo precisa ser executado em um ambiente Node.js

import * as fs from "fs";
import * as path from "path";

// Tipo que representa os dados que devem vir prontos de outro lugar (appmain.ts)
export type Pedido = {
  idPedido: string;
  cliente: string;
  sabor: string;
  tamanho: "Extra-Grande" | "Grande" | "Media" | "Pequeno";
  quantidade: number;
  precoUnidade: number;
  pagamento: "Dinheiro" | "Pix" | "debito" | "credito";
  statusDoPedido: "Preparando" | "Pronto" | "Cancelado";
};

/**
 * Função responsável apenas por gerar o arquivo CSV e salvar em uma pasta fixa "saida-de-dados"
 * @param pedidos Array de objetos Pedido (deve ser fornecido pelo appmain.ts)
 * @returns Caminho completo do arquivo gerado
 
export function exportarPedidosCSV(pedidos: Pedido[]): string {
  // Cria (se não existir) a pasta "saida-de-dados" na raiz do projeto
  const pastaSaida = path.resolve(process.cwd(), "saida-de-dados");
  fs.mkdirSync(pastaSaida, { recursive: true });

  const nomeArquivo = `pedidos-${new Date().toISOString().split("T")[0]}.csv`;
  const caminho = path.join(pastaSaida, nomeArquivo);

  const cabecalho = [
    "idPedido",
    "cliente",
    "sabor",
    "tamanho",
    "quantidade",
    "precoUnidade",
    "pagamento",
    "statusDoPedido"
  ].join(";");

  const linhas = pedidos.map((p) =>
    [
      p.idPedido,
      p.cliente,
      p.sabor,
      p.tamanho,
      p.quantidade,
      p.precoUnidade.toFixed(2).replace(".", ","),
      p.pagamento,
      p.statusDoPedido
    ].join(";")
  );

  const conteudo = [cabecalho, ...linhas].join("\n");
  fs.writeFileSync(caminho, conteudo, "utf-8");

  return caminho;
}
*/