import * as readlineSync from "readline-sync";   // ---- Interação com prompt
import * as fs from "fs";
import * as path from "path";



// IMPORT ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const pastaAtivos = path.join(__dirname, "..", "ativos"); // Caminho pasta root. 
const clientesPath = path.join(pastaAtivos, "cliente.csv"); // Caminho para o armazenamento.
const produtosPath = path.join(pastaAtivos, "produto.csv"); 


let dig: number; // ---- Digito do menu
let dig2: string; // ---- Digito do menu em string

// VARIAVEIS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function spacing(hops: number): void {       // ---- Função para saltar X linhas
    for (let i = 0; i < hops; i++) {
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
{
    const sabores = ["1-Calabresa","2-Marguerita","3-Frango","4-Portuguesa"];
    const tamanhos = ["1-Grande","2-Media","3-Pequena"];

    // Preços base
    const precoPequena = 25.00;
    const precoMedia   = precoPequena * 1.8;   // 45.00
    const precoGrande  = precoMedia   * 1.2;   // 54.00

    // Bebidas
    const refrigerante = ["1-Refrigerante 2 litros","2-Refrigerante 1,5 litros","3-Cerveja"];
    const precoRefri2 = 15.00, precoRefri1 = 7.50, precoCerveja = 5.50;

    // Sobremesas
    const sobremesa = ["1-Sorvete de Baunilha","2-Bolo de chocolate","3-Milkshake de Ovomaltime"];
    const precoSorvete = 15.00, precoBolo = 12.00, precoMilk = 15.00;

    // Escolha do sabor
    console.log(sabores.join(" | "));
    const pedido = readlineSync.questionInt("Informe seu pedido (1-4): ");
    if (pedido < 1 || pedido > 4) { console.log("Opcao de sabor invalida."); break; }

    const saborEscolhido = sabores[pedido - 1].split("-")[1];

    // Tamanho
    console.log(`Tamanhos disponiveis: ${tamanhos.join(" | ")}`);
    const pedidoT = readlineSync.questionInt("Selecione um tamanho (1-3): ");

    let tamanhoTexto = "";
    let precoBase = 0;
    switch (pedidoT) {
        case 1: tamanhoTexto = "Grande";  precoBase = precoGrande;  break;
        case 2: tamanhoTexto = "Média";   precoBase = precoMedia;   break;
        case 3: tamanhoTexto = "Pequena"; precoBase = precoPequena; break;
        default: console.log("Opção de tamanho inválida."); break;
    }

    console.log(`Atualmente seu pedido é uma pizza ${tamanhoTexto} de ${saborEscolhido}.`);

    // --- Variáveis para adicionais (default = nenhum) ---
    let bebidaTexto = "Nenhuma", precoBebida = 0;
    let sobremesaTexto = "Nenhuma", precoSobremesa = 0;

    // Pergunta S/N (válido para qualquer tamanho)
    const dig2: string = readlineSync.question("Gostaria de adicionar algo a mais: (S/N) ? ");

    switch (dig2.toUpperCase()) {
        case "S": {
            console.log(`Temos essas bebidas: ${refrigerante.join(" | ")}`);
            const opcBebida = readlineSync.questionInt("Escolha uma bebida (0 para nenhuma): ");
            if (opcBebida === 1) { precoBebida = precoRefri2; bebidaTexto = "Refrigerante 2 litros"; }
            else if (opcBebida === 2) { precoBebida = precoRefri1; bebidaTexto = "Refrigerante 1,5 litros"; }
            else if (opcBebida === 3) { precoBebida = precoCerveja; bebidaTexto = "Cerveja"; }

            console.log(`E essas sobremesas: ${sobremesa.join(" | ")}`);
            const opcSobremesa = readlineSync.questionInt("Escolha uma sobremesa (0 para nenhuma): ");
            if (opcSobremesa === 1) { precoSobremesa = precoSorvete; sobremesaTexto = "Sorvete de Baunilha"; }
            else if (opcSobremesa === 2) { precoSobremesa = precoBolo; sobremesaTexto = "Bolo de chocolate"; }
            else if (opcSobremesa === 3) { precoSobremesa = precoMilk; sobremesaTexto = "Milkshake de Ovomaltime"; }
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
    const total = precoBase + precoBebida + precoSobremesa;

    console.log("\n===== RESUMO DO PEDIDO =====");
    console.log(`Pizza: ${tamanhoTexto} de ${saborEscolhido} -> R$ ${precoBase.toFixed(2)}`);
    console.log(`Bebida: ${bebidaTexto} -> R$ ${precoBebida.toFixed(2)}`);
    console.log(`Sobremesa: ${sobremesaTexto} -> R$ ${precoSobremesa.toFixed(2)}`);
    console.log(`TOTAL: R$ ${total.toFixed(2)}`);
    console.log("============================\n");

    // --- Gravar TXT em ./ativos/recibos/comprovantePedido.txt ---
    const dir = path.join("ativos", "recibos");
    fs.mkdirSync(dir, { recursive: true }); // garante pasta
    const filePath = path.join(dir, "comprovantePedido.txt"); // sobrescreve a cada pedido

    const dataHora = new Date().toLocaleString("pt-BR");
    const conteudoTXT =
`===== COMPROVANTE DO PEDIDO =====
Data/Hora: ${dataHora}
----------------------------------
Pizza: ${tamanhoTexto} de ${saborEscolhido}
Bebida: ${bebidaTexto}
Sobremesa: ${sobremesaTexto}
----------------------------------
TOTAL: R$ ${total.toFixed(2)}
==================================
`;

    fs.writeFileSync(filePath, conteudoTXT, "utf-8");
    console.log("Comprovante salvo em:", filePath);
}
break;



    //Pedro iron fim








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
