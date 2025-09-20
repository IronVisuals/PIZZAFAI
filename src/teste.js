"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readlineSync = require("readline-sync"); // ---- Interação com prompt
//import exportarpedidosCSV = require("./utils/saidaCSV"); // - Importando função do saidaCSV.ts
// IMPORT ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^
var dig;
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
        case 2: // -------------------------------------------------------------- MENU-GERAR-PEDIDO
            var sabores = [
                "1-Calabresa",
                "2-Marguerita",
                "3-Fragon",
                "4-Portuguesa"
            ];
            var tamanho = ["1-Grande", "2-Media", "3-Pequena"];
            var pequena = 25.00;
            var media = (pequena * 1.8) + pequena;
            var grande = (media * 2.20) + media;
            console.log(sabores);
            var pedido = readlineSync.questionInt("Informe seu pedido: ");
            console.log("Tamanhos disponiveis: ".concat(tamanho.join(" ")));
            var pedidoT = readlineSync.questionInt("Selecione um tamanho");
            switch (pedidoT) {
                case 1:
                    console.log("Atualmente seu pedido \u00E9 uma pizza Grande de ".concat(pedido));
                    var adicionar = readlineSync.questionInt("Gostaria de adcionar algo amais: (S/N) ?");
            }
            break;
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
