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
