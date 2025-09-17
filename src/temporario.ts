import * as readlineSync from "readline-sync";

type Cliente = {
    id: number;
    nome: string;
    telefone: string;
    endereco: string;
}

let clientes: Cliente[] = [];
let proximoId = 1;

function cadastroCliente() {
    console.log("\n....:::: CADASTRO DE CLIENTE ::::....");
    const nome = readlineSync.question("Nome: ");
    const telefone = readlineSync.question("Telefone: ");
    const endereco = readlineSync.question("Endereço: ");

    const novoCliente: Cliente = {
        id: proximoId++,
        nome,
        telefone,
        endereco
    }

    clientes.push(novoCliente);
    console.log("\n Cliente cadastrado com sucesso!\n");
}

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

// Lista de pedidos
let pedidos: Pedido[] = [];
let contadorPedidos = 1;

// Função cadastrar pedido
function cadastrarPedido() {
    console.log("\n....:::: CADASTRO DE PEDIDO ::::....");

    const cliente = readlineSync.question("Nome do cliente: ");
    const sabor = readlineSync.question("Sabor da pizza: ");

}