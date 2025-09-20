import * as readlineSync from "readline-sync";
import * as fs from "fs";
import * as path from "path";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
};

let clientes: Cliente[] = [];
let proximoId = 1;

// Caminho do arquivo CSV (ajustado para a pasta "ativos")
const caminhoCSV = path.join(__dirname, "..", "ativos", "clientes.csv");

// Função para salvar no CSV
function salvarClientesCSV() {
  const cabecalho = "ID;Nome;Telefone;Endereco\n";
  const linhas = clientes
    .map((c) => `${c.id};${c.nome};${c.telefone};${c.endereco}`)
    .join("\n");

  fs.writeFileSync(caminhoCSV, cabecalho + linhas, { encoding: "utf-8" });
}

// Cadastro de cliente
function cadastroCliente() {
  console.log("\n....:::: CADASTRO DE CLIENTE ::::....");
  const nome = readlineSync.question("Nome: ");
  const telefone = readlineSync.question("Telefone: ");
  const endereco = readlineSync.question("Endereço: ");

  const novoCliente: Cliente = {
    id: proximoId++,
    nome,
    telefone,
    endereco,
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

  clientes.forEach((c) => {
    console.log(
      `ID: ${c.id} | Nome: ${c.nome} | Telefone: ${c.telefone} | Endereço: ${c.endereco}`
    );
  });
}

// Menu principal
function menu() {
  while (true) {
    console.log("\n....:::: MENU ::::....");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar clientes");
    console.log("0 - Sair");

    const opcao = readlineSync.question("Escolha uma opção: ");

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
