"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync");
var fs = require("fs");
var path = require("path");
// ---------- CONFIGURAÇÃO ----------
var pastaAtivos = path.join(__dirname, "..", "ativos");
var clientesPath = path.join(pastaAtivos, "clientes.csv");
var dirRecibos = path.join(pastaAtivos, "recibos");
var dig;
var clientes = [];
var proximoIdCliente = 1;
// ---------- FUNÇÕES ----------
function spacing(hops) {
    for (var i = 0; i < hops; i++)
        console.log("");
}
// Carregar clientes do CSV
function carregarClientes() {
    if (!fs.existsSync(clientesPath))
        return;
    var linhas = fs.readFileSync(clientesPath, "utf-8").split("\n").slice(1);
    for (var _i = 0, linhas_1 = linhas; _i < linhas_1.length; _i++) {
        var linha = linhas_1[_i];
        if (!linha.trim())
            continue;
        var _a = linha.split(";"), id = _a[0], nome = _a[1], cpf = _a[2], telefone = _a[3], endereco = _a[4];
        clientes.push({ id: parseInt(id), nome: nome, cpf: cpf, telefone: telefone, endereco: endereco });
        if (parseInt(id) >= proximoIdCliente)
            proximoIdCliente = parseInt(id) + 1;
    }
}
// Salvar cliente no CSV
function salvarCliente(cliente) {
    if (!fs.existsSync(clientesPath)) {
        fs.writeFileSync(clientesPath, "ID;Nome;CPF;Telefone;Endereco\n", "utf-8");
    }
    fs.appendFileSync(clientesPath, "".concat(cliente.id, ";").concat(cliente.nome, ";").concat(cliente.cpf, ";").concat(cliente.telefone, ";").concat(cliente.endereco, "\n"), "utf-8");
}
// Listar clientes
function listarClientes() {
    console.log("\n....:::: LISTA DE CLIENTES ::::....");
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado ainda.");
        return;
    }
    clientes.forEach(function (c) {
        return console.log("ID: ".concat(c.id, " | Nome: ").concat(c.nome, " | CPF: ").concat(c.cpf, " | Telefone: ").concat(c.telefone, " | Endere\u00E7o: ").concat(c.endereco));
    });
}
// ---------- INICIALIZAÇÃO ----------
carregarClientes();
var _loop_1 = function () {
    spacing(30);
    console.log("....::::MENU::PIZZIFY::::....");
    console.log("1: Cadastrar");
    console.log("2: Pedido");
    console.log("3: Consultar");
    console.log("9: Sair");
    dig = readlineSync.questionInt("Digite: ");
    switch (dig) {
        case 1: // ---------- CADASTRO ----------
            do {
                spacing(5);
                console.log("....::::Tipo:Cadastro::::....");
                console.log("1: Produto");
                console.log("2: Cliente");
                dig = readlineSync.questionInt("Digite: ");
                switch (dig) {
                    case 1:
                        console.log("VOCÊ SELECIONOU CADASTRO DE PRODUTO");
                        break;
                    case 2:
                        console.log("VOCÊ SELECIONOU CADASTRO DE CLIENTE");
                        var nome = readlineSync.question("Nome: ");
                        var cpf = readlineSync.question("CPF (somente números): ");
                        var telefone = readlineSync.question("Telefone: ");
                        var endereco = readlineSync.question("Endereço: ");
                        var novoCliente = { id: proximoIdCliente++, nome: nome, cpf: cpf, telefone: telefone, endereco: endereco };
                        clientes.push(novoCliente);
                        salvarCliente(novoCliente);
                        console.log("\nCliente cadastrado com sucesso!");
                        break;
                }
            } while (dig != 1 && dig != 2);
            break;
        case 2: // ---------- PEDIDO ----------
            var sabores = ["1-Calabresa", "2-Marguerita", "3-Frango", "4-Portuguesa"];
            var tamanhos = ["1-Grande", "2-Media", "3-Pequena"];
            var precoPequena = 25.0;
            var precoMedia = precoPequena * 1.8;
            var precoGrande = precoMedia * 1.2;
            var refrigerante = ["1-Refrigerante 2 litros", "2-Refrigerante 1,5 litros", "3-Cerveja"];
            var precoRefri2 = 15.0, precoRefri1 = 7.5, precoCerveja = 5.5;
            var sobremesa = ["1-Sorvete de Baunilha", "2-Bolo de chocolate", "3-Milkshake de Ovomaltime"];
            var precoSorvete = 15.0, precoBolo = 12.0, precoMilk = 15.0;
            // ---------- VERIFICAR CADASTRO PELO CPF ----------
            var cpfCliente_1 = readlineSync.question("Digite o CPF do cliente (somente números): ");
            var clienteCadastrado = clientes.find(function (c) { return c.cpf === cpfCliente_1; });
            var desconto = 0;
            if (clienteCadastrado) {
                console.log("Cliente cadastrado! Aplicando 10% de desconto para ".concat(clienteCadastrado.nome, "."));
                desconto = 0.1;
            }
            else {
                console.log("Cliente não cadastrado. Sem desconto.");
            }
            // Escolha do sabor
            console.log(sabores.join(" | "));
            var pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");
            if (pedido < 1 || pedido > 4) {
                console.log("Opção de sabor inválida.");
                break;
            }
            var saborEscolhido = sabores[pedido - 1].split("-")[1];
            // Tamanho
            console.log("Tamanhos dispon\u00EDveis: ".concat(tamanhos.join(" | ")));
            var pedidoT = readlineSync.questionInt("Selecione um tamanho (1-3): ");
            var tamanhoTexto = "";
            var precoBase = 0;
            switch (pedidoT) {
                case 1:
                    tamanhoTexto = "Grande";
                    precoBase = precoGrande;
                    break;
                case 2:
                    tamanhoTexto = "Média";
                    precoBase = precoMedia;
                    break;
                case 3:
                    tamanhoTexto = "Pequena";
                    precoBase = precoPequena;
                    break;
                default:
                    console.log("Opção de tamanho inválida.");
                    break;
            }
            // Adicionais
            var bebidaTexto = "Nenhuma", precoBebida = 0;
            var sobremesaTexto = "Nenhuma", precoSobremesa = 0;
            var adicionar = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");
            if (adicionar.toUpperCase() === "S") {
                console.log("Temos essas bebidas: ".concat(refrigerante.join(" | ")));
                var opcBebida = readlineSync.questionInt("Escolha uma bebida (0 para nenhuma): ");
                if (opcBebida === 1) {
                    precoBebida = precoRefri2;
                    bebidaTexto = "Refrigerante 2 litros";
                }
                else if (opcBebida === 2) {
                    precoBebida = precoRefri1;
                    bebidaTexto = "Refrigerante 1,5 litros";
                }
                else if (opcBebida === 3) {
                    precoBebida = precoCerveja;
                    bebidaTexto = "Cerveja";
                }
                console.log("E essas sobremesas: ".concat(sobremesa.join(" | ")));
                var opcSobremesa = readlineSync.questionInt("Escolha uma sobremesa (0 para nenhuma): ");
                if (opcSobremesa === 1) {
                    precoSobremesa = precoSorvete;
                    sobremesaTexto = "Sorvete de Baunilha";
                }
                else if (opcSobremesa === 2) {
                    precoSobremesa = precoBolo;
                    sobremesaTexto = "Bolo de chocolate";
                }
                else if (opcSobremesa === 3) {
                    precoSobremesa = precoMilk;
                    sobremesaTexto = "Milkshake de Ovomaltime";
                }
            }
            var total = (precoBase + precoBebida + precoSobremesa) * (1 - desconto);
            console.log("\n===== RESUMO DO PEDIDO =====");
            console.log("Cliente: ".concat(clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado"));
            console.log("Pizza: ".concat(tamanhoTexto, " de ").concat(saborEscolhido, " -> R$ ").concat(precoBase.toFixed(2)));
            console.log("Bebida: ".concat(bebidaTexto, " -> R$ ").concat(precoBebida.toFixed(2)));
            console.log("Sobremesa: ".concat(sobremesaTexto, " -> R$ ").concat(precoSobremesa.toFixed(2)));
            console.log("Desconto: ".concat(desconto * 100, "%"));
            console.log("TOTAL: R$ ".concat(total.toFixed(2)));
            console.log("============================\n");
            // ---------- GRAVAR COMPROVANTE ----------
            var dir = path.join(__dirname, "..", "ativos", "recibos");
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
            // Lê os arquivos existentes
            var arquivos = fs.readdirSync(dir);
            // Filtra apenas os que começam com "comprovantePedido"
            var comprovantes = arquivos.filter(function (a) { return a.startsWith("comprovantePedido") && a.endsWith(".txt"); });
            // Número sequencial = quantidade + 1
            var numero = comprovantes.length + 1;
            // Nome final do arquivo
            var filePath = path.join(dir, "comprovantePedido".concat(numero, ".txt"));
            var dataHora = new Date().toLocaleString("pt-BR");
            var conteudoTXT = "===== COMPROVANTE DO PEDIDO =====\nData/Hora: ".concat(dataHora, "\nCliente: ").concat(clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado", "\n----------------------------------\nPizza: ").concat(tamanhoTexto, " de ").concat(saborEscolhido, "\nBebida: ").concat(bebidaTexto, "\nSobremesa: ").concat(sobremesaTexto, "\n----------------------------------\nDesconto: ").concat(desconto * 100, "%\nTOTAL: R$ ").concat(total.toFixed(2), "\n==================================\n");
            fs.writeFileSync(filePath, conteudoTXT, "utf-8");
            console.log("Comprovante salvo em:", filePath);
        case 3: // ---------- CONSULTA ----------
            spacing(30);
            console.log("....::::Tipo:Consulta::::....");
            console.log("1: Produto");
            console.log("2: Cliente");
            dig = readlineSync.questionInt("Digite: ");
            switch (dig) {
                case 1:
                    console.log("VOCÊ SELECIONOU CONSULTA DE PRODUTO");
                    break;
                case 2:
                    listarClientes();
                    break;
            }
            break;
        case 9:
            console.log("Saindo...");
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
};
// ---------- MENU PRINCIPAL ----------
do {
    _loop_1();
} while (dig != 9);
