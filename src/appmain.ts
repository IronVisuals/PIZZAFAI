import * as readlineSync from "readline-sync";   // ---- Interação com prompt

//Essas quatro linhas importam módulos nativos do Node.js e fazem alguns aliases (apelidos) úteis
// Importa todo o namespace do módulo path.
// Serve para manipular caminhos de arquivo sem depender de barra normal/invertida (Windows/Linux).
// É um módulo puro (não acessa disco), só lida com strings de caminhos.
//import * as path from 'path';  // ---- Permite 
geva

// Importa a API promises do fs (file system) e renomeia para fs.
// Você ganha funções assíncronas com await: fs.readFile, fs.writeFile, fs.appendFile, fs.mkdir, fs.access etc.
//import { promises as fs } from 'fs';

// Importa do módulo process (também nativo) os streams padrão e faz alias:
// process.stdin → input (entrada do teclado/terminal)
// process.stdout → output (saída do console)
// Usamos esses streams ao criar a interface do readline.
//import { stdin as input, stdout as output } from 'process';



// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


let dig: number;

do {
console.log("....::::MENU::PIZZIFY::::....");
console.log("1: Cadastrar");
console.log("2: Pedido");
console.log("3: Consultar");
console.log("9: Sair");
dig = readlineSync.questionInt("Digite: ");

type Cliente = {
    id: number;
    nome: string;
    telefone: string;
    endereci
}

let cliente



switch(dig) {
    case 1:  // -------------------------------------------- MENU-CADASTRO

    break;
    case 2:  // -------------------------------------------- MENU-GERAR-PEDIDO

    break;
    case 3:  // -------------------------------------------- MENU-CONSULTA

    break;
    } 
} while (dig != 9);  // ------------------------------------ Todos codigos devem estar a cima!