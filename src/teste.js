"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync"); // ---- Interação com prompt
//import exportarpedidosCSV = require("./utils/saidaCSV"); // - Importando função do saidaCSV.ts
// IMPORT ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^
var dig;
var dig2;
function spacing() {
    for (var i = 0; i < 30; i++) {
        console.log("");
    }
}
do {
    console.log("....::::MENU::PIZZIFY::::....");
    console.log("1: Cadastrar");
    console.log("2: Pedido");
    console.log("3: Consultar");
    console.log("9: Sair");
    dig = readlineSync.questionInt("Digite: ");
    spacing();
    switch (dig) {
        case 1: // ---------------------------------- MENU-CADASTRO        
            do {
                console.log("....::::Tipo:Cadastro::::....");
                console.log("1: Produto");
                console.log("2: Cliente");
                dig = readlineSync.questionInt("Digite: ");
                spacing();
                switch (dig) {
                    case 1: // ---------------------------- Cadastro-Produto
                        break;
                    case 2: // ---------------------------- Cadastro-Cliente
                        break;
                }
            } while ((dig != 1) && (dig != 2));
            break;
        //Pedro inicio
        case 2: // -------------------------------------------------------------- MENU-GERAR-PEDIDO
            {
                // Menus
                var sabores = [
                    "1-Calabresa",
                    "2-Marguerita",
                    "3-Frango",
                    "4-Portuguesa"
                ];
                var tamanhos = ["1-Grande", "2-Media", "3-Pequena"];
                // Preços base (ajuste como preferir)
                var precoPequena = 25.00;
                var precoMedia = precoPequena * 1.8; // 45.00
                var precoGrande = precoMedia * 1.2; // 54.00
                // Bebidas (enumeradas para seleção)
                var refrigerante = [
                    "1-Refrigerante 2 litros",
                    "2-Refrigerante 1,5 litros",
                    "3-Cerveja"
                ];
                var precoRefri2 = 15.00;
                var precoRefri1 = 7.50;
                var precoCerveja = 5.50;
                // Sobremesas (enumeradas)
                var sobremesa = [
                    "1-Sorvete de Baunilha",
                    "2-Bolo de chocolate",
                    "3-Milkshake de Ovomaltime"
                ];
                var precoSorvete = 15.00;
                var precoBolo = 12.00;
                var precoMilk = 15.00;
                // Exibe sabores e lê escolha
                console.log(sabores.join(" | "));
                var pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");
                if (pedido < 1 || pedido > 4) {
                    console.log("Opcao de sabor invalida.");
                    break;
                }
                // Extrai apenas o nome do sabor (apos o "-")
                var saborEscolhido = sabores[pedido - 1].split("-")[1];
                // Exibe tamanhos e lê escolha
                console.log("Tamanhos disponiveis: ".concat(tamanhos.join(" | ")));
                var pedidoT = readlineSync.questionInt("Selecione um tamanho (1-3): ");
                var tamanhoTexto = "";
                var precoBase = 0;
                switch (pedidoT) {
                    case 1:
                        tamanhoTexto = "Grande";
                        precoBase = precoGrande;
                        console.log("Atualmente seu pedido \u00E9 uma pizza Grande de ".concat(saborEscolhido, "."));
                        // Apenas para o pedido de pizza grande:
                        var dig2_1 = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");
                        switch (dig2_1.toUpperCase()) {
                            case "S": {
                                // Oferece bebidas
                                console.log("Temos essas bebidas: ".concat(refrigerante.join(" | ")));
                                var opcBebida = readlineSync.questionInt("Escolha uma bebida (0 para nenhuma): ");
                                var precoBebida = 0;
                                var bebidaTexto = "Sem bebida";
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
                                // Oferece sobremesas
                                console.log("E essas sobremesas: ".concat(sobremesa.join(" | ")));
                                var opcSobremesa = readlineSync.questionInt("Escolha uma sobremesa (0 para nenhuma): ");
                                var precoSobremesa = 0;
                                var sobremesaTexto = "Sem sobremesa";
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
                                var total = precoBase + precoBebida + precoSobremesa;
                                console.log("\n===== RESUMO DO PEDIDO =====");
                                console.log("Pizza: ".concat(tamanhoTexto, " de ").concat(saborEscolhido, " -> R$ ").concat(precoBase.toFixed(2)));
                                console.log("Bebida: ".concat(bebidaTexto, " -> R$ ").concat(precoBebida.toFixed(2)));
                                console.log("Sobremesa: ".concat(sobremesaTexto, " -> R$ ").concat(precoSobremesa.toFixed(2)));
                                console.log("TOTAL: R$ ".concat(total.toFixed(2)));
                                console.log("============================\n");
                                break;
                            }
                            case "N":
                                console.log("Sem adicionais! Total: R$ ".concat(precoBase.toFixed(2)));
                                break;
                            default:
                                console.log("Opcao invalida, responda S ou N.");
                                break;
                        }
                        break;
                    case 2:
                        tamanhoTexto = "Média";
                        precoBase = precoMedia;
                        console.log("Seu pedido: Pizza M\u00E9dia de ".concat(saborEscolhido, ". Total: R$ ").concat(precoBase.toFixed(2)));
                        break;
                    case 3:
                        tamanhoTexto = "Pequena";
                        precoBase = precoPequena;
                        console.log("Seu pedido: Pizza Pequena de ".concat(saborEscolhido, ". Total: R$ ").concat(precoBase.toFixed(2)));
                        break;
                    default:
                        console.log("Opcao de tamanho invalida.");
                        break;
                }
            }
            break;
        //Pedro fim
        case 3: // ----------------------------------------------------------------------------------------------------- MENU-CONSULTA
            console.log("....::::Tipo:Consulta::::....");
            console.log("1: Produto");
            console.log("2: Cliente");
            dig = readlineSync.questionInt("Digite: ");
            spacing();
            switch (dig) {
                case 1: // --------------------------------- Consulta-Cliente
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    break;
                case 2: // --------------------------------- Consulta-Pedido
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
                    break;
            }
    }
} while (dig != 9);
// SAIDA CSV (CHAMANDO A FUNÇÃO PARA GERAR O ARQUIVO CSV NO DESKTOP)
