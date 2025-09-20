"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync"); // ---- Interação com prompt
var fs = require("fs");
var path = require("path");
// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
var pastaAtivos = path.join(__dirname, "..", "ativos"); // Caminho pasta root. 
var clientesPath = path.join(pastaAtivos, "cliente.csv"); // Caminho para o armazenamento.
var produtosPath = path.join(pastaAtivos, "produto.csv");
var dig; // ---- Digito do menu
var dig2; // ---- Digito do menu em string
// VARIAVEIS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function spacing(hops) {
    for (var i = 0; i < hops; i++) {
        console.log("");
    }
}
// FUNCTION ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
do {
    spacing(30);
    console.log("....::::MENU::PIZZIFY::::....");
    console.log("1: Cadastrar");
    console.log("2: Pedido");
    console.log("3: Consultar");
    console.log("9: Sair");
    dig = readlineSync.questionInt("Digite: ");
    switch (dig) {
        case 1: // ----------------------------------------------------------- MENU-CADASTRO        
            do {
                spacing(30);
                console.log("....::::Tipo:Cadastro::::....");
                console.log("1: Produto");
                console.log("2: Cliente");
                dig = readlineSync.questionInt("Digite: ");
                switch (dig) {
                    case 1: // ---------------------------- Cadastro-Produto
                        console.log("VOCÊ SELECIONOU CADASTRO DE PRODUTO");
                        break;
                    case 2: // ---------------------------- Cadastro-Cliente
                        console.log("VOCÊ SELECIONOU CADASTRO DE CLIENTE");
                        break;
                }
            } while ((dig != 1) && (dig != 2));
            break;
        case 2: // --------------------------------------------------------- MENU-GERAR-PEDIDO
            {
                var sabores = ["1-Calabresa", "2-Marguerita", "3-Frango", "4-Portuguesa"];
                var tamanhos = ["1-Grande", "2-Media", "3-Pequena"];
                // Preços base
                var precoPequena = 25.00;
                var precoMedia = precoPequena * 1.8; // 45.00
                var precoGrande = precoMedia * 1.2; // 54.00
                // Bebidas
                var refrigerante = ["1-Refrigerante 2 litros", "2-Refrigerante 1,5 litros", "3-Cerveja"];
                var precoRefri2 = 15.00, precoRefri1 = 7.50, precoCerveja = 5.50;
                // Sobremesas
                var sobremesa = ["1-Sorvete de Baunilha", "2-Bolo de chocolate", "3-Milkshake de Ovomaltime"];
                var precoSorvete = 15.00, precoBolo = 12.00, precoMilk = 15.00;
                // Escolha do sabor
                console.log(sabores.join(" | "));
                var pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");
                if (pedido < 1 || pedido > 4) {
                    console.log("Opcao de sabor invalida.");
                    break;
                }
                var saborEscolhido = sabores[pedido - 1].split("-")[1];
                // Tamanho
                console.log("Tamanhos disponiveis: ".concat(tamanhos.join(" | ")));
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
                console.log("Atualmente seu pedido \u00E9 uma pizza ".concat(tamanhoTexto, " de ").concat(saborEscolhido, "."));
                // --- Variáveis para adicionais (default = nenhum) ---
                var bebidaTexto = "Nenhuma", precoBebida = 0;
                var sobremesaTexto = "Nenhuma", precoSobremesa = 0;
                // Pergunta S/N (válido para qualquer tamanho)
                var dig2_1 = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");
                switch (dig2_1.toUpperCase()) {
                    case "S": {
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
                        break;
                    }
                    case "N":
                        // mantém “Nenhuma” e preço 0
                        break;
                    default:
                        console.log("Opção inválida, responda S ou N.");
                        break;
                }
                // --- Resumo e TOTAL ---
                var total = precoBase + precoBebida + precoSobremesa;
                console.log("\n===== RESUMO DO PEDIDO =====");
                console.log("Pizza: ".concat(tamanhoTexto, " de ").concat(saborEscolhido, " -> R$ ").concat(precoBase.toFixed(2)));
                console.log("Bebida: ".concat(bebidaTexto, " -> R$ ").concat(precoBebida.toFixed(2)));
                console.log("Sobremesa: ".concat(sobremesaTexto, " -> R$ ").concat(precoSobremesa.toFixed(2)));
                console.log("TOTAL: R$ ".concat(total.toFixed(2)));
                console.log("============================\n");
                // --- Gravar TXT em ./ativos/recibos/comprovantePedido.txt ---
                var dir = path.join("ativos", "recibos");
                fs.mkdirSync(dir, { recursive: true }); // garante pasta
                var filePath = path.join(dir, "comprovantePedido.txt"); // sobrescreve a cada pedido
                var dataHora = new Date().toLocaleString("pt-BR");
                var conteudoTXT = "===== COMPROVANTE DO PEDIDO =====\nData/Hora: ".concat(dataHora, "\n----------------------------------\nPizza: ").concat(tamanhoTexto, " de ").concat(saborEscolhido, "\nBebida: ").concat(bebidaTexto, "\nSobremesa: ").concat(sobremesaTexto, "\n----------------------------------\nTOTAL: R$ ").concat(total.toFixed(2), "\n==================================\n");
                fs.writeFileSync(filePath, conteudoTXT, "utf-8");
                console.log("Comprovante salvo em:", filePath);
            }
            break;
            //Pedro iron fim
            break;
        case 3: // --------------------------------------------------------- MENU-CONSULTA
            spacing(30);
            console.log("....::::Tipo:Consulta::::....");
            console.log("1: Produto");
            console.log("2: Cliente");
            dig = readlineSync.questionInt("Digite: ");
            switch (dig) {
                case 1: // --------------------------------- Consulta-Cliente
                    console.log("VOCÊ SELECIONOU CONSULTA DE CLIENTE");
                    break;
                case 2: // --------------------------------- Consulta-Pedido
                    console.log("VOCÊ SELECIONOU CONSULTA DE PRODUTO");
                    break;
            }
    }
} while (dig != 9);
