import * as readlineSync from "readline-sync";   // ---- Interação com prompt
//import exportarpedidosCSV = require("./utils/saidaCSV"); // - Importando função do saidaCSV.ts





// IMPORT ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^ ^^^^
let dig: number;
let dig2: string;

function spacing(): void {
    for (let i = 0; i < 30; i++) {
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

switch(dig) {
    case 1:  // ---------------------------------- MENU-CADASTRO        
    do {
    console.log("....::::Tipo:Cadastro::::....");
    console.log("1: Produto");
    console.log("2: Cliente");
    dig = readlineSync.questionInt("Digite: ");
    spacing();

    switch(dig) {
    case 1: // ---------------------------- Cadastro-Produto


    break;
    case 2: // ---------------------------- Cadastro-Cliente

    break;
    }
    } while ((dig != 1) && (dig != 2));

    
    break;

    //Pedro inicio
case 2:  // -------------------------------------------------------------- MENU-GERAR-PEDIDO
{
    // Menus
    const sabores = [
        "1-Calabresa",
        "2-Marguerita",
        "3-Frango",
        "4-Portuguesa"
    ];

    const tamanhos = ["1-Grande", "2-Media", "3-Pequena"];

    // Preços base (ajuste como preferir)
    const precoPequena = 25.00;
    const precoMedia   = precoPequena * 1.8;  // 45.00
    const precoGrande  = precoMedia   * 1.2;  // 54.00

    // Bebidas (enumeradas para seleção)
    const refrigerante = [
        "1-Refrigerante 2 litros",
        "2-Refrigerante 1,5 litros",
        "3-Cerveja"
    ];
    const precoRefri2 = 15.00;
    const precoRefri1 = 7.50;
    const precoCerveja = 5.50;

    // Sobremesas (enumeradas)
    const sobremesa = [
        "1-Sorvete de Baunilha",
        "2-Bolo de chocolate",
        "3-Milkshake de Ovomaltime"
    ];
    const precoSorvete = 15.00;
    const precoBolo    = 12.00;
    const precoMilk    = 15.00;

    // Exibe sabores e lê escolha
    console.log(sabores.join(" | "));
    const pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");

    if (pedido < 1 || pedido > 4) {
        console.log("Opcao de sabor invalida.");
        break;
    }

    // Extrai apenas o nome do sabor (apos o "-")
    const saborEscolhido = sabores[pedido - 1].split("-")[1];

    // Exibe tamanhos e lê escolha
    console.log(`Tamanhos disponiveis: ${tamanhos.join(" | ")}`);
    const pedidoT = readlineSync.questionInt("Selecione um tamanho (1-3): ");

    let tamanhoTexto = "";
    let precoBase = 0;

    switch (pedidoT) {
        case 1:
            tamanhoTexto = "Grande";
            precoBase = precoGrande;
            console.log(`Atualmente seu pedido é uma pizza Grande de ${saborEscolhido}.`);

            // Apenas para o pedido de pizza grande:
            let dig2: string = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");
            switch (dig2.toUpperCase()) {
                case "S": {
                    // Oferece bebidas
                    console.log(`Temos essas bebidas: ${refrigerante.join(" | ")}`);
                    const opcBebida = readlineSync.questionInt("Escolha uma bebida (0 para nenhuma): ");
                    let precoBebida = 0;
                    let bebidaTexto = "Sem bebida";

                    if (opcBebida === 1) { precoBebida = precoRefri2; bebidaTexto = "Refrigerante 2 litros"; }
                    else if (opcBebida === 2) { precoBebida = precoRefri1; bebidaTexto = "Refrigerante 1,5 litros"; }
                    else if (opcBebida === 3) { precoBebida = precoCerveja; bebidaTexto = "Cerveja"; }

                    // Oferece sobremesas
                    console.log(`E essas sobremesas: ${sobremesa.join(" | ")}`);
                    const opcSobremesa = readlineSync.questionInt("Escolha uma sobremesa (0 para nenhuma): ");
                    let precoSobremesa = 0;
                    let sobremesaTexto = "Sem sobremesa";

                    if (opcSobremesa === 1) { precoSobremesa = precoSorvete; sobremesaTexto = "Sorvete de Baunilha"; }
                    else if (opcSobremesa === 2) { precoSobremesa = precoBolo; sobremesaTexto = "Bolo de chocolate"; }
                    else if (opcSobremesa === 3) { precoSobremesa = precoMilk; sobremesaTexto = "Milkshake de Ovomaltime"; }

                    const total = precoBase + precoBebida + precoSobremesa;

                    console.log("\n===== RESUMO DO PEDIDO =====");
                    console.log(`Pizza: ${tamanhoTexto} de ${saborEscolhido} -> R$ ${precoBase.toFixed(2)}`);
                    console.log(`Bebida: ${bebidaTexto} -> R$ ${precoBebida.toFixed(2)}`);
                    console.log(`Sobremesa: ${sobremesaTexto} -> R$ ${precoSobremesa.toFixed(2)}`);
                    console.log(`TOTAL: R$ ${total.toFixed(2)}`);
                    console.log("============================\n");
                    break;
                }
                case "N":
                    console.log(`Sem adicionais! Total: R$ ${precoBase.toFixed(2)}`);
                    break;
                default:
                    console.log("Opcao invalida, responda S ou N.");
                    break;
            }
            break;

        case 2:
            tamanhoTexto = "Média";
            precoBase = precoMedia;
            console.log(`Seu pedido: Pizza Média de ${saborEscolhido}. Total: R$ ${precoBase.toFixed(2)}`);
            break;

        case 3:
            tamanhoTexto = "Pequena";
            precoBase = precoPequena;
            console.log(`Seu pedido: Pizza Pequena de ${saborEscolhido}. Total: R$ ${precoBase.toFixed(2)}`);
            break;

        default:
            console.log("Opcao de tamanho invalida.");
            break;
    }
}
break;

    //Pedro fim


    case 3:  // ----------------------------------------------------------------------------------------------------- MENU-CONSULTA
    console.log("....::::Tipo:Consulta::::....");
    console.log("1: Produto");
    console.log("2: Cliente");
    dig = readlineSync.questionInt("Digite: ");
    spacing();

    switch(dig) {
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