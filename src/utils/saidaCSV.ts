import * as fs from 'fs';
import * as os 'os';
import * as path;

export type Pedido = { // É AQUI AS VARIAVEIS PARA O APPMAIN.TS (SAIDA)
    idPedido: string;
    cliente: string;
    sabor: string;
    tamanho: "Extra-Grande" | "Grande" | "Media" | "Pequeno";
    quantidade: number;
    precoUnidade: number;
    pagamento: "Dinheiro" | "Pix" | "debito" | "credito";
    statusDoPedido: "Preparando" | "Pronto" | "Cancelado";


};
// Gera arquivo CSV e salva na área de trabalho
export function exportarpedidosCSV(pedidos: Pedido[]): string {
    const desktop = path.join(os.homedir(), "Desktop");
    const nomeArquivo = `pedidos- ${new Date().toISOString().split("T")[0]}.csv`;
    const caminho = path.join(desktop, nomeArquivo);

    const cabecalho = [
        "idPedido", "cliente", "sabor", "tamanho", "quantidade", "precoUnidade", "pagamento", "statusDoPedido";
    ].join(";")

    const linhas = pedidos.map(p => {
        const total = (p.quantidade * p.precoUnidade).toFixed(2).replace(".", ",");
        const preco = p.precoUnidade.toFixed(2).replace(".", ",");
        return [
            p.idPedido, p.cliente, p.sabor, p.tamanho, p.quantidade, p.precoUnidade, p.pagamento, p.statusDoPedido
        ].join(";");
    });

    const conteudo = [cabecalho, ...linhas].join("\n");
    fs.writeFileSync(caminho, conteudo, "utf-8");

    return caminho;

}
