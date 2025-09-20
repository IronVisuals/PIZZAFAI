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
            var sabores = [
                "1-Calabresa",
                "2-Marguerita",
                "3-Frango",
                "4-Portuguesa"
            ];
            var tamanho = ["1-Grande", "2-Media", "3-Pequena"];
            var pequena = 25.00;
            var media = (pequena * 1.8) + pequena;
            var grande = (media * 2.20) + media;
            var refrigerante = ["1-Refrigerante 2 litros", "Refrigerante de 1,5 litros", "Cerveja"];
            var refri2 = 15.00;
            var refri1 = 7.50;
            var cerveja = 5.5;
            var sobremesa = ["1-Sorvete de Baunilha", "2-Bolo de chocolate", "3-Milkshake de Ovomaltime"];
            var sorvete = 15.00;
            var bolo = 12.00;
            var milk = 15.00;
            console.log(sabores); //Apenas exemplo para facilitar menu interativo
            var pedido = readlineSync.questionInt("Informe seu pedido: ");
            console.log("Tamanhos disponiveis: ".concat(tamanho.join(" ")));
            var pedidoT = readlineSync.questionInt("Selecione um tamanho");
            switch (pedidoT) { //Switch para tamanho da pizza
                case 1:
                    console.log("Atualmente seu pedido \u00E9 uma pizza Grande de ".concat(sabores));
                    dig2 = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ?"); //Apenas para o pedido de pizza grande
                    switch (dig2) {
                        case "s":
                        case "S":
                            console.log("Temos essas bebidas ".concat(refrigerante.join(" ")));
                            console.log("E essas sobremesas ".concat(sobremesa.join(" ")));
                            break;
                        case "N":
                        case "n":
                            console.log("Sem adicionais!");
                            break;
                        default:
                            console.log("Opção invalida, responda S ou N.");
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
