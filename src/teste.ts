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

    let sabores = [

        "1-Calabresa",
        "2-Marguerita",
        "3-Frango",
        "4-Portuguesa"

    ];

    let tamanho = [ "1-Grande" , "2-Media" , "3-Pequena"];
    let pequena = 25.00;
    let media  = (pequena * 1.8) + pequena;
    let grande = (media * 2.20) + media;

    let refrigerante = ["1-Refrigerante 2 litros", "Refrigerante de 1,5 litros", "Cerveja"];
    let refri2 = 15.00;
    let refri1 = 7.50;
    let cerveja = 5.5;
    
    let sobremesa = ["1-Sorvete de Baunilha", "2-Bolo de chocolate", "3-Milkshake de Ovomaltime"];
    let sorvete = 15.00;
    let bolo = 12.00;
    let milk = 15.00;

    console.log(sabores); // Apenas exemplo para facilitar menu interativo

    let pedido = readlineSync.questionInt("Informe seu pedido: ");
    console.log(`Tamanhos disponiveis: ${tamanho.join(" ")}`);

    let pedidoT = readlineSync.questionInt("Selecione um tamanho");

    switch (pedidoT){ //Switch para tamanho da pizza

        case 1: 
        console.log(`Atualmente seu pedido é uma pizza Grande de ${sabores}`);
        dig2 = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ?"); //Apenas para o pedido de pizza grande

        switch (dig2) {

            case "s":
            case "S":
                console.log(`Temos essas bebidas ${refrigerante.join(" ")}`);
                console.log(`E essas sobremesas ${sobremesa.join(" ")}`);
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