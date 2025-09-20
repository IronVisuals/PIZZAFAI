import * as readlineSync from "readline-sync";   // ---- Interação com prompt
import * as path from "path";
import { promises as fs } from "fs";


// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const pastaAtivos = path.join(__dirname, "..", "ativos"); // Caminho pasta root. 
const clientesPath = path.join(pastaAtivos, "cliente.csv"); // Caminho para o armazenamento.
const produtosPath = path.join(pastaAtivos, "produto.csv"); 



// VARIAVEIS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function spacing(hops: number): void {       // ---- Função para saltar X linhas
    for (let i = 0; i < hops; i++) {
    console.log("");
    }
}

// FUNCTION ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




let dig: number;
do {
spacing(30);
console.log("....::::MENU::PIZZIFY::::....");
console.log("1: Cadastrar");
console.log("2: Pedido");
console.log("3: Consultar");
console.log("9: Sair");
dig = readlineSync.questionInt("Digite: ");


switch(dig) {

    case 1:  // ----------------------------------------------------------- MENU-CADASTRO        


    do {
    spacing(30);
    console.log("....::::Tipo:Cadastro::::....");
    console.log("1: Produto");
    console.log("2: Cliente");
    dig = readlineSync.questionInt("Digite: ");
    

    switch(dig) {
    case 1: // ---------------------------- Cadastro-Produto
    console.log("VOCÊ SELECIONOU CADASTRO DE PRODUTO")


    break;
    case 2: // ---------------------------- Cadastro-Cliente
    console.log("VOCÊ SELECIONOU CADASTRO DE CLIENTE")
    break;
    }
    } while ((dig != 1) && (dig != 2));



    break;
    case 2:  // --------------------------------------------------------- MENU-GERAR-PEDIDO








    break;
    case 3:  // --------------------------------------------------------- MENU-CONSULTA

    spacing(30);
    console.log("....::::Tipo:Consulta::::....");
    console.log("1: Produto");
    console.log("2: Cliente");
    dig = readlineSync.questionInt("Digite: ");
    
    switch(dig) {
    case 1: // --------------------------------- Consulta-Cliente
    console.log("VOCÊ SELECIONOU CONSULTA DE CLIENTE");
    break;
    case 2: // --------------------------------- Consulta-Pedido
    console.log("VOCÊ SELECIONOU CONSULTA DE PRODUTO");
    break;
    } 


    }

} while (dig != 9);  