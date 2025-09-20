"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var fs = require("fs");
var path = require("path");
var clientes = [];
var proximoId = 1;
// Caminho do arquivo CSV (ajustado para a pasta "ativos")
var caminhoCSV = path.join(__dirname, "..", "ativos", "clientes.csv");
// Função para salvar no CSV
function salvarClientesCSV() {
    var cabecalho = "ID;Nome;Telefone;Endereco\n";
    var linhas = clientes
        .map(function (c) { return "".concat(c.id, ";").concat(c.nome, ";").concat(c.telefone, ";").concat(c.endereco); })
        .join("\n");
    fs.writeFileSync(caminhoCSV, cabecalho + linhas, { encoding: "utf-8" });
}
// Cadastro de cliente
function cadastroCliente() {
    console.log("\n....:::: CADASTRO DE CLIENTE ::::....");
    var nome = readlineSync.question("Nome: ");
    var telefone = readlineSync.question("Telefone: ");
    var endereco = readlineSync.question("Endereço: ");
    var novoCliente = {
        id: proximoId++,
        nome: nome,
        telefone: telefone,
        endereco: endereco,
    };
    clientes.push(novoCliente);
    salvarClientesCSV();
    console.log("\n Cliente cadastrado com sucesso!\n");
    listarClientes();
}
// Listar clientes
function listarClientes() {
    console.log("\n....:::: LISTA DE CLIENTES ::::....");
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado ainda.");
        return;
    }
    clientes.forEach(function (c) {
        console.log("ID: ".concat(c.id, " | Nome: ").concat(c.nome, " | Telefone: ").concat(c.telefone, " | Endere\u00E7o: ").concat(c.endereco));
    });
}
// Menu principal
function menu() {
    while (true) {
        console.log("\n....:::: MENU ::::....");
        console.log("1 - Cadastrar cliente");
        console.log("2 - Listar clientes");
        console.log("0 - Sair");
        var opcao = readlineSync.question("Escolha uma opção: ");
        switch (opcao) {
            case "1":
                cadastroCliente();
                break;
            case "2":
                listarClientes();
                break;
            case "0":
                console.log("Saindo...");
                return;
            default:
                console.log("Opção inválida!");
        }
    }
}
menu();
