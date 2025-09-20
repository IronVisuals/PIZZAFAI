"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// ---------- CONFIGURAÇÃO ----------
const pastaAtivos = path.join(__dirname, "..", "ativos");
const clientesPath = path.join(pastaAtivos, "clientes.csv");
const dirRecibos = path.join(pastaAtivos, "recibos");
const dir = path.join(__dirname, "..", "ativos", "recibos");
let dig;
let clientes = [];
let proximoIdCliente = 1;
// ---------- FUNÇÕES ----------
function consultarClienteUnico() {
    spacing(5);
    console.log("....::::CONSULTA DE CLIENTE::::....");
    console.log("1: Pesquisar por CPF");
    console.log("2: Pesquisar por ID");
    const opc = readlineSync.questionInt("Escolha uma opção: ");
    switch (opc) {
        case 1:
            const cpfBusca = readlineSync.question("Digite o CPF do cliente: ");
            const clienteCPF = clientes.find(c => c.cpf === cpfBusca);
            if (clienteCPF) {
                console.log("\nCliente encontrado:");
                console.log(`ID: ${clienteCPF.id}`);
                console.log(`Nome: ${clienteCPF.nome}`);
                console.log(`CPF: ${clienteCPF.cpf}`);
                console.log(`Telefone: ${clienteCPF.telefone}`);
                console.log(`Endereço: ${clienteCPF.endereco}`);
            }
            else {
                console.log("Cliente não encontrado.");
            }
            break;
        case 2:
            const idBusca = readlineSync.questionInt("Digite o ID do cliente: ");
            const clienteID = clientes.find(c => c.id === idBusca);
            if (clienteID) {
                console.log("\nCliente encontrado:");
                console.log(`ID: ${clienteID.id}`);
                console.log(`Nome: ${clienteID.nome}`);
                console.log(`CPF: ${clienteID.cpf}`);
                console.log(`Telefone: ${clienteID.telefone}`);
                console.log(`Endereço: ${clienteID.endereco}`);
            }
            else {
                console.log("Cliente não encontrado.");
            }
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}
function spacing(hops) {
    for (let i = 0; i < hops; i++)
        console.log("");
}
// Carregar clientes do CSV
function carregarClientes() {
    if (!fs.existsSync(clientesPath))
        return;
    const linhas = fs.readFileSync(clientesPath, "utf-8").split("\n").slice(1);
    for (const linha of linhas) {
        if (!linha.trim())
            continue;
        const [id, nome, cpf, telefone, endereco] = linha.split(";");
        clientes.push({ id: parseInt(id), nome, cpf, telefone, endereco });
        if (parseInt(id) >= proximoIdCliente)
            proximoIdCliente = parseInt(id) + 1;
    }
}
// Salvar cliente no CSV
function salvarCliente(cliente) {
    if (!fs.existsSync(clientesPath)) {
        fs.writeFileSync(clientesPath, "ID;Nome;CPF;Telefone;Endereco\n", "utf-8");
    }
    fs.appendFileSync(clientesPath, `${cliente.id};${cliente.nome};${cliente.cpf};${cliente.telefone};${cliente.endereco}\n`, "utf-8");
}
function consultarClientes() {
    spacing(5);
    console.log("....::::CONSULTA DE CLIENTES::::....");
    console.log("1: Listar todos os clientes");
    console.log("2: Pesquisar cliente por CPF");
    console.log("3: Pesquisar cliente por ID");
    const opc = readlineSync.questionInt("Escolha uma opção: ");
    switch (opc) {
        case 1:
            // Lista todos os clientes
            listarClientes();
            break;
        case 2:
            // Pesquisar por CPF
            const cpfBusca = readlineSync.question("Digite o CPF do cliente: ");
            const clienteCPF = clientes.find(c => c.cpf === cpfBusca);
            if (clienteCPF) {
                console.log("\nCliente encontrado:");
                console.log(`ID: ${clienteCPF.id}`);
                console.log(`Nome: ${clienteCPF.nome}`);
                console.log(`CPF: ${clienteCPF.cpf}`);
                console.log(`Telefone: ${clienteCPF.telefone}`);
                console.log(`Endereço: ${clienteCPF.endereco}`);
            }
            else {
                console.log("Cliente não encontrado.");
            }
            break;
        case 3:
            // Pesquisar por ID
            const idBusca = readlineSync.questionInt("Digite o ID do cliente: ");
            const clienteID = clientes.find(c => c.id === idBusca);
            if (clienteID) {
                console.log("\nCliente encontrado:");
                console.log(`ID: ${clienteID.id}`);
                console.log(`Nome: ${clienteID.nome}`);
                console.log(`CPF: ${clienteID.cpf}`);
                console.log(`Telefone: ${clienteID.telefone}`);
                console.log(`Endereço: ${clienteID.endereco}`);
            }
            else {
                console.log("Cliente não encontrado.");
            }
            break;
        default:
            console.log("Opção inválida!");
            break;
    }
}
// Listar clientes
function listarClientes() {
    console.log("\n....:::: LISTA DE CLIENTES ::::....");
    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado ainda.");
        return;
    }
    clientes.forEach(c => console.log(`ID: ${c.id} | Nome: ${c.nome} | CPF: ${c.cpf} | Telefone: ${c.telefone} | Endereço: ${c.endereco}`));
}
// ---------- INICIALIZAÇÃO ----------
carregarClientes();
// ---------- MENU PRINCIPAL ----------
do {
    spacing(0);
    console.log("....::::MENU::PIZZIFY::::....");
    console.log("1: Cadastrar");
    console.log("2: Pedido");
    console.log("3: Consultar");
    console.log("9: Sair");
    dig = readlineSync.questionInt("Digite: ");
    switch (dig) {
        case 1: // ---------- CADASTRO ----------
            do {
                spacing(30);
                console.log("....::::Tipo:Cadastro::::....");
                console.log("1: Cliente");
                dig = readlineSync.questionInt("Digite: ");
                switch (dig) {
                    case 1:
                        console.log("VOCÊ SELECIONOU CADASTRO DE CLIENTE");
                        const nome = readlineSync.question("Nome: ");
                        const cpf = readlineSync.question("CPF (somente números): ");
                        const telefone = readlineSync.question("Telefone: ");
                        const endereco = readlineSync.question("Endereço: ");
                        const novoCliente = { id: proximoIdCliente++, nome, cpf, telefone, endereco };
                        clientes.push(novoCliente);
                        salvarCliente(novoCliente);
                        console.log("\nCliente cadastrado com sucesso!");
                        break;
                }
            } while (dig != 1 && dig != 2);
            break;
        case 2: // ---------- PEDIDO ----------
            const sabores = ["1-Calabresa", "2-Marguerita", "3-Frango", "4-Portuguesa"];
            const tamanhos = ["1-Grande", "2-Media", "3-Pequena"];
            const precoPequena = 25.0;
            const precoMedia = precoPequena * 1.8;
            const precoGrande = precoMedia * 1.2;
            const refrigerante = ["1-Refrigerante 2 litros", "2-Refrigerante 1,5 litros", "3-Cerveja"];
            const precoRefri2 = 15.0, precoRefri1 = 7.5, precoCerveja = 5.5;
            const sobremesa = ["1-Sorvete de Baunilha", "2-Bolo de chocolate", "3-Milkshake de Ovomaltime"];
            const precoSorvete = 15.0, precoBolo = 12.0, precoMilk = 15.0;
            // ---------- VERIFICAR CADASTRO PELO CPF ----------
            const cpfCliente = readlineSync.question("Digite o CPF do cliente (somente números): ");
            const clienteCadastrado = clientes.find(c => c.cpf === cpfCliente);
            let desconto = 0;
            if (clienteCadastrado) {
                console.log(`Cliente cadastrado! Aplicando 10% de desconto para ${clienteCadastrado.nome}.`);
                desconto = 0.1;
            }
            else {
                console.log("Cliente não cadastrado. Sem desconto.");
            }
            // Escolha do sabor
            console.log(sabores.join(" | "));
            const pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");
            if (pedido < 1 || pedido > 4) {
                console.log("Opção de sabor inválida.");
                break;
            }
            const saborEscolhido = sabores[pedido - 1].split("-")[1];
            // Tamanho
            console.log(`Tamanhos disponíveis: ${tamanhos.join(" | ")}`);
            const pedidoT = readlineSync.questionInt("Selecione um tamanho (1-3): ");
            let tamanhoTexto = "";
            let precoBase = 0;
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
            let bebidaTexto = "Nenhuma", precoBebida = 0;
            let sobremesaTexto = "Nenhuma", precoSobremesa = 0;
            const adicionar = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");
            if (adicionar.toUpperCase() === "S") {
                console.log(`Temos essas bebidas: ${refrigerante.join(" | ")}`);
                const opcBebida = readlineSync.questionInt("Escolha uma bebida (0 para nenhuma): ");
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
                console.log(`E essas sobremesas: ${sobremesa.join(" | ")}`);
                const opcSobremesa = readlineSync.questionInt("Escolha uma sobremesa (0 para nenhuma): ");
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
            const total = (precoBase + precoBebida + precoSobremesa) * (1 - desconto);
            console.log("\n===== RESUMO DO PEDIDO =====");
            console.log(`Cliente: ${clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado"}`);
            console.log(`Pizza: ${tamanhoTexto} de ${saborEscolhido} -> R$ ${precoBase.toFixed(2)}`);
            console.log(`Bebida: ${bebidaTexto} -> R$ ${precoBebida.toFixed(2)}`);
            console.log(`Sobremesa: ${sobremesaTexto} -> R$ ${precoSobremesa.toFixed(2)}`);
            console.log(`Desconto: ${desconto * 100}%`);
            console.log(`TOTAL: R$ ${total.toFixed(2)}`);
            console.log("============================\n");
            // ---------- GRAVAR COMPROVANTE ----------
            if (!fs.existsSync(dir))
                fs.mkdirSync(dir, { recursive: true });
            // Lê os arquivos existentes
            const arquivos = fs.readdirSync(dir);
            // Filtra apenas os que começam com "comprovantePedido"
            const comprovantes = arquivos.filter(a => a.startsWith("comprovantePedido") && a.endsWith(".txt"));
            // Número sequencial = quantidade + 1
            const numero = comprovantes.length + 1;
            // Nome final do arquivo
            const filePath = path.join(dir, `comprovantePedido${numero}.txt`);
            const dataHora = new Date().toLocaleString("pt-BR");
            const conteudoTXT = `===== COMPROVANTE DO PEDIDO =====
Data/Hora: ${dataHora}
Cliente: ${clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado"}
----------------------------------
Pizza: ${tamanhoTexto} de ${saborEscolhido}
Bebida: ${bebidaTexto}
Sobremesa: ${sobremesaTexto}
----------------------------------
Desconto: ${desconto * 100}%
TOTAL: R$ ${total.toFixed(2)}
==================================
`;
            fs.writeFileSync(filePath, conteudoTXT, "utf-8");
            console.log("Comprovante salvo em:", filePath);
        case 3: // ---------- CONSULTA ----------
            spacing(30);
            console.log("....::::Tipo:Consulta::::....");
            console.log("1: Lista de Cliente");
            console.log("2: Consultar Cliente Especifico");
            dig = readlineSync.questionInt("Digite: ");
            switch (dig) {
                case 1:
                    listarClientes();
                    break;
                case 2:
                    consultarClienteUnico();
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
} while (dig != 9);
//# sourceMappingURL=index.js.map