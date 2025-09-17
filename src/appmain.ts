import * as readlineSync from "readline-sync";   // ---- Interação com prompt





// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
let dig: number;

do {
console.log("....::::MENU::PIZZIFY::::....");
console.log("1: Cadastrar");
console.log("2: Pedido");
console.log("3: Consultar");
console.log("9: Sair");
dig = readlineSync.questionInt("Digite: ");




switch(dig) {
    case 1:  // -------------------------------------------- MENU-CADASTRO
                
    do {
    console.log("....::::Tipo:Cadastro::::....");
    console.log("1: Produto");
    console.log("2: Cliente");
    console.log("3: Consultar");
    console.log("9: Sair");
    dig = readlineSync.questionInt("Digite: ");





    

    } while ((dig != null) || (dig != 1) || (dig != 2))
    break;
    case 2:  // -------------------------------------------- MENU-GERAR-PEDIDO







    break;
    case 3:  // -------------------------------------------- MENU-CONSULTA







    break;
    } 


} while (dig != 9);  // ------------------------------------ Todos codigos devem estar a cima!