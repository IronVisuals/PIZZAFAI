import * as readlineSync from "readline-sync";   // ---- Interação com prompt
import exportarpedidosCSV = require("./utils/saidaCSV"); // - Importando função do saidaCSV.ts





// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^








let dig: number;

function spacing(): void {
    for (let i = 0; i < 30; i++) {
    console.log(":");
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
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    break;
    case 2: // ---------------------------- Cadastro-Cliente
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    // COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI! COLOQUE SEU CODIGO AQUI!
    break;
    }
    } while ((dig != 1) && (dig != 2));

    
    break;
    case 2:  // -------------------------------------------------------------- MENU-GERAR-PEDIDO
    break;
    case 3:  // ----------------------------------------------------------------------------------------------------- MENU-CONSULTA
    console.log("....::::Tipo:Cadastro::::....");
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



//AQUI COLOCAR O CADASTRO DE PEDIDO

const pedidos: Pedido[] = [
    {
            idPedido: 
            cliente: 
            sabor:
            tamanho: 
            quantidade,
            precoUnidade: 
            pagamento:
            statusDoPedido:
    }
]

// GERA O CSV COM O PEDIDO

const caminho = exportarpedidosCSV(pedido);
console.log(`Pedido salvo em: ${caminho}`);