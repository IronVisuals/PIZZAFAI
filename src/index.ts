import * as readlineSync from "readline-sync";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

// ESM: recria __filename / __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- CONFIGURAÇÃO ----------
const pastaAtivos = path.join(__dirname, "..", "ativos");
const clientesPath = path.join(pastaAtivos, "clientes.csv");
const dirRecibos = path.join(pastaAtivos, "recibos");
const produtosPath = path.join(pastaAtivos, "produtos.csv");
const vendasPath = path.join(pastaAtivos, "vendas.csv");

// ---------- TIPOS ----------
type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
};

type Categoria = "PIZZA" | "BEBIDA" | "SOBREMESA" | "OUTRO";

type Produto = {
  id: number;
  nome: string;
  categoria: Categoria;
  preco: number;        // preço base (ex.: pizza pequena, lata, porção)
  ativo: boolean;       // para inativar sem apagar
};

type Venda = {
  id: number;
  dataISO: string;      // "2025-09-23T21:10:00.000Z"
  item: string;         // nome da pizza vendida
  categoria: Categoria; // para relatórios (contamos apenas PIZZA)
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
};

// ---------- ESTADO ----------
let dig: number;
let clientes: Cliente[] = [];
let proximoIdCliente = 1;

let produtos: Produto[] = [];
let proximoIdProduto = 1;

let proximoIdVenda = 1;

// ---------- UTILS ----------
function spacing(hops: number): void {
  for (let i = 0; i < hops; i++) console.log("");
}

function ensureDirs() {
  if (!fs.existsSync(pastaAtivos)) fs.mkdirSync(pastaAtivos, { recursive: true });
  if (!fs.existsSync(dirRecibos)) fs.mkdirSync(dirRecibos, { recursive: true });
}

function brMoney(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function lerCSV(pathFile: string): string[] {
  if (!fs.existsSync(pathFile)) return [];
  return fs
    .readFileSync(pathFile, "utf-8")
    .split("\n")
    .filter((l: string) => l.trim().length > 0);
}

// ---------- CLIENTES (CSV) ----------
function carregarClientes() {
  if (!fs.existsSync(clientesPath)) return;
  const linhas = fs.readFileSync(clientesPath, "utf-8").split("\n").slice(1);
  for (const linha of linhas) {
    if (!linha.trim()) continue;
    const parts = linha.split(";");
    const idStr = parts[0] ?? "0";
    const nome = parts[1] ?? "";
    const cpf = parts[2] ?? "";
    const telefone = parts[3] ?? "";
    const endereco = parts[4] ?? "";
    const idNum = parseInt(idStr) || 0;
    clientes.push({ id: idNum, nome, cpf, telefone, endereco });
    if (idNum >= proximoIdCliente) proximoIdCliente = idNum + 1;
  }
}

function salvarCliente(cliente: Cliente) {
  if (!fs.existsSync(clientesPath)) {
    fs.writeFileSync(clientesPath, "ID;Nome;CPF;Telefone;Endereco\n", "utf-8");
  }
  fs.appendFileSync(
    clientesPath,
    `${cliente.id};${cliente.nome};${cliente.cpf};${cliente.telefone};${cliente.endereco}\n`,
    "utf-8"
  );
}

function listarClientes() {
  console.log("\n....:::: LISTA DE CLIENTES ::::....");
  if (clientes.length === 0) {
    console.log("Nenhum cliente cadastrado ainda.");
    return;
  }
  clientes.forEach(c =>
    console.log(
      `ID: ${c.id} | Nome: ${c.nome} | CPF: ${c.cpf} | Telefone: ${c.telefone} | Endereço: ${c.endereco}`
    )
  );
}

function consultarClienteUnico() {
  spacing(3);
  console.log("....::::CONSULTA DE CLIENTE::::....");
  console.log("1: Pesquisar por CPF");
  console.log("2: Pesquisar por ID");

  const opc = readlineSync.questionInt("Escolha uma opção: ");

  switch (opc) {
    case 1: {
      const cpfBusca = readlineSync.question("Digite o CPF do cliente: ");
      const clienteCPF = clientes.find(c => c.cpf === cpfBusca);
      if (clienteCPF) {
        console.log("\nCliente encontrado:");
        console.log(`ID: ${clienteCPF.id}`);
        console.log(`Nome: ${clienteCPF.nome}`);
        console.log(`CPF: ${clienteCPF.cpf}`);
        console.log(`Telefone: ${clienteCPF.telefone}`);
        console.log(`Endereço: ${clienteCPF.endereco}`);
      } else {
        console.log("Cliente não encontrado.");
      }
      break;
    }
    case 2: {
      const idBusca = readlineSync.questionInt("Digite o ID do cliente: ");
      const clienteID = clientes.find(c => c.id === idBusca);
      if (clienteID) {
        console.log("\nCliente encontrado:");
        console.log(`ID: ${clienteID.id}`);
        console.log(`Nome: ${clienteID.nome}`);
        console.log(`CPF: ${clienteID.cpf}`);
        console.log(`Telefone: ${clienteID.telefone}`);
        console.log(`Endereço: ${clienteID.endereco}`);
      } else {
        console.log("Cliente não encontrado.");
      }
      break;
    }
    default:
      console.log("Opção inválida!");
  }
}

// ---------- PRODUTOS (CSV) ----------
function carregarProdutos() {
  if (!fs.existsSync(produtosPath)) return;
  const linhas = fs.readFileSync(produtosPath, "utf-8").split("\n").slice(1);
  for (const linha of linhas) {
    if (!linha.trim()) continue;
    const parts = linha.split(";");
    const idStr = parts[0] ?? "0";
    const nome = parts[1] ?? "";
    const categoria = (parts[2] ?? "OUTRO") as Categoria;
    const precoStr = parts[3] ?? "0";
    const ativoStr = parts[4] ?? "false";
    const idNum = parseInt(idStr) || 0;
    produtos.push({
      id: idNum,
      nome,
      categoria,
      preco: parseFloat(precoStr) || 0,
      ativo: ativoStr === "true",
    });
    if (idNum >= proximoIdProduto) proximoIdProduto = idNum + 1;
  }
}

function salvarProduto(p: Produto) {
  if (!fs.existsSync(produtosPath)) {
    fs.writeFileSync(produtosPath, "ID;Nome;Categoria;Preco;Ativo\n", "utf-8");
  }
  fs.appendFileSync(produtosPath, `${p.id};${p.nome};${p.categoria};${p.preco};${p.ativo}\n`, "utf-8");
}

function listarProdutosPorCategoria(cat: Categoria) {
  const lista = produtos.filter(p => p.categoria === cat && p.ativo);
  if (lista.length === 0) {
    console.log(`Nenhum produto ativo na categoria ${cat}.`);
    return;
  }
  console.log(`\n:::: ${cat} ::::\n`);
  lista.forEach(p => console.log(`ID: ${p.id} | ${p.nome} -> ${brMoney(p.preco)}`));
}

function cadastrarProdutoFlow() {
  spacing(2);
  console.log("....:::: CADASTRO DE PRODUTO ::::");
  const nome = readlineSync.question("Nome do produto: ");
  console.log("Categorias: 1-PIZZA | 2-BEBIDA | 3-SOBREMESA | 4-OUTRO");
  const opc = readlineSync.questionInt("Escolha (1-4): ");
  const mapa: Record<number, Categoria> = {1:"PIZZA",2:"BEBIDA",3:"SOBREMESA",4:"OUTRO"};
  const categoria = mapa[opc];
  if (!categoria) {
    console.log("Categoria inválida.");
    return;
  }
  const preco = Number(readlineSync.question("Preço base (ex.: pizza pequena): ").replace(",", "."));
  if (Number.isNaN(preco) || preco <= 0) {
    console.log("Preço inválido.");
    return;
  }
  const novo: Produto = { id: proximoIdProduto++, nome, categoria, preco, ativo: true };
  produtos.push(novo);
  salvarProduto(novo);
  console.log("Produto cadastrado!");
}

function listarProdutosFlow() {
  console.log("\n....:::: LISTAR PRODUTOS ::::");
  console.log("1-PIZZAS | 2-BEBIDAS | 3-SOBREMESAS | 4-OUTROS | 9-Todos");
  const opc = readlineSync.questionInt("Escolha: ");
  if (opc === 9) {
    if (produtos.length === 0) { console.log("Nenhum produto cadastrado."); return; }
    produtos.filter(p=>p.ativo).forEach(p => {
      console.log(`[${p.categoria}] ID:${p.id} ${p.nome} -> ${brMoney(p.preco)}`);
    });
    return;
  }
  const mapa: Record<number, Categoria> = {1:"PIZZA",2:"BEBIDA",3:"SOBREMESA",4:"OUTRO"};
  const cat = mapa[opc];
  if (!cat) { console.log("Opção inválida."); return; }
  listarProdutosPorCategoria(cat);
}

// Bootstrap de produtos padrão (se arquivo estiver vazio)
function bootstrapProdutosPadrao() {
  if (produtos.length > 0) return;
  const base: Produto[] = [
    { id: proximoIdProduto++, nome: "Calabresa",  categoria: "PIZZA", preco: 25.00, ativo: true },
    { id: proximoIdProduto++, nome: "Marguerita", categoria: "PIZZA", preco: 25.00, ativo: true },
    { id: proximoIdProduto++, nome: "Frango",     categoria: "PIZZA", preco: 25.00, ativo: true },
    { id: proximoIdProduto++, nome: "Portuguesa", categoria: "PIZZA", preco: 25.00, ativo: true },
    { id: proximoIdProduto++, nome: "Refrigerante 2L",   categoria: "BEBIDA", preco: 15.00, ativo: true },
    { id: proximoIdProduto++, nome: "Refrigerante 1,5L", categoria: "BEBIDA", preco: 7.50,  ativo: true },
    { id: proximoIdProduto++, nome: "Cerveja",           categoria: "BEBIDA", preco: 5.50,  ativo: true },
    { id: proximoIdProduto++, nome: "Sorvete Baunilha",  categoria: "SOBREMESA", preco: 15.00, ativo: true },
    { id: proximoIdProduto++, nome: "Bolo Chocolate",    categoria: "SOBREMESA", preco: 12.00, ativo: true },
    { id: proximoIdProduto++, nome: "Milkshake Ovomaltine", categoria: "SOBREMESA", preco: 15.00, ativo: true },
  ];
  for (const p of base) {
    produtos.push(p);
    salvarProduto(p);
  }
  console.log("Produtos padrão criados em ativos/produtos.csv");
}

// ---------- VENDAS (CSV) ----------
function carregarVendas() {
  if (!fs.existsSync(vendasPath)) return;
  const linhas = fs.readFileSync(vendasPath, "utf-8").split("\n").slice(1);
  for (const linha of linhas) {
    if (!linha.trim()) continue;
    const parts = linha.split(";");
    const id = parts[0] ?? "0";
    const idNum = parseInt(id);
    if (idNum >= proximoIdVenda) proximoIdVenda = idNum + 1;
  }
}

function salvarVenda(v: Venda) {
  if (!fs.existsSync(vendasPath)) {
    fs.writeFileSync(
      vendasPath,
      "ID;DataISO;Item;Categoria;Quantidade;ValorUnitario;ValorTotal\n",
      "utf-8"
    );
  }
  fs.appendFileSync(
    vendasPath,
    `${v.id};${v.dataISO};${v.item};${v.categoria};${v.quantidade};${v.valorUnitario};${v.valorTotal}\n`,
    "utf-8"
  );
}

// ---------- RELATÓRIOS ----------
function relatorioPizzasPorDia() {
  const linhas = lerCSV(vendasPath).slice(1);
  const mapa = new Map<string, number>(); // "YYYY-MM-DD" -> qtd
  for (const l of linhas) {
    const parts = l.split(";");
    const categoria = parts[3] ?? "";
    if (categoria !== "PIZZA") continue;
    const dataISO = parts[1] ?? "";
    if (!dataISO) continue;
    const dia = new Date(dataISO).toISOString().slice(0, 10); // YYYY-MM-DD
    const quantidadeStr = parts[4] ?? "0";
    const qtd = parseInt(quantidadeStr) || 0;
    mapa.set(dia, (mapa.get(dia) || 0) + qtd);
  }
  console.log("\n==== RELATÓRIO: PIZZAS VENDIDAS POR DIA ====");
  if (mapa.size === 0) { console.log("Sem vendas de pizza registradas."); return; }
  [...mapa.entries()].sort((a,b)=>a[0].localeCompare(b[0])).forEach(([dia, qtd])=>{
    console.log(`${dia}: ${qtd} pizza(s)`);
  });
}

function relatorioPizzasPorMes() {
  const linhas = lerCSV(vendasPath).slice(1);
  const mapa = new Map<string, number>(); // "YYYY-MM" -> qtd
  for (const l of linhas) {
    const parts = l.split(";");
    const categoria = parts[3] ?? "";
    if (categoria !== "PIZZA") continue;
    const dataISO = parts[1] ?? "";
    if (!dataISO) continue;
    const d = new Date(dataISO);
    const mes = d.toISOString().slice(0,7); // YYYY-MM
    const quantidadeStr = parts[4] ?? "0";
    const qtd = parseInt(quantidadeStr) || 0;
    mapa.set(mes, (mapa.get(mes) || 0) + qtd);
  }
  console.log("\n==== RELATÓRIO: PIZZAS VENDIDAS POR MÊS ====");
  if (mapa.size === 0) { console.log("Sem vendas de pizza registradas."); return; }
  [...mapa.entries()].sort((a,b)=>a[0].localeCompare(b[0])).forEach(([mes, qtd])=>{
    console.log(`${mes}: ${qtd} pizza(s)`);
  });
}

// ---------- FLUXO DE PEDIDO ----------
function fluxoPedido() {
  // Verificar cliente
  const cpfCliente = readlineSync.question("Digite o CPF do cliente (somente números): ");
  const clienteCadastrado = clientes.find(c => c.cpf === cpfCliente);
  let desconto = 0;
  if (clienteCadastrado) {
    console.log(`Cliente cadastrado! Aplicando 10% de desconto para ${clienteCadastrado.nome}.`);
    desconto = 0.1;
  } else {
    console.log("Cliente não cadastrado. Sem desconto.");
  }

  // Escolher pizza a partir de PRODUTOS (categoria PIZZA)
  const pizzas = produtos.filter(p => p.categoria === "PIZZA" && p.ativo);
  if (pizzas.length === 0) { console.log("Não há pizzas cadastradas."); return; }

  console.log("\nPIZZAS DISPONÍVEIS:");
  pizzas.forEach((p, idx) => console.log(`${idx+1}-${p.nome} (${brMoney(p.preco)} base)`));
  const idxPizza = readlineSync.questionInt("Informe sua pizza (1-" + pizzas.length + "): ") - 1;
  const pizza = pizzas[idxPizza];
  if (!pizza) { console.log("Opção inválida."); return; }

  // Tamanhos (usando multiplicadores sobre o preço base da pizza)
  const tamanhos = [
    { label: "Pequena", mult: 1.0 },
    { label: "Média",   mult: 1.8 },
    { label: "Grande",  mult: 1.8 * 1.2 },
  ];
  console.log("\nTAMANHOS:");
  tamanhos.forEach((t, i) => console.log(`${i+1}-${t.label}`));
  const opTam = readlineSync.questionInt("Selecione um tamanho (1-3): ");
  const tam = tamanhos[opTam-1];
  if (!tam) { console.log("Tamanho inválido."); return; }

  const precoBasePizza = pizza.preco * tam.mult;

  // BEBIDAS
  const bebidas = produtos.filter(p => p.categoria === "BEBIDA" && p.ativo);
  let bebidaTexto = "Nenhuma", precoBebida = 0;
  if (bebidas.length > 0) {
    const querBebida = readlineSync.question("Adicionar bebida? (S/N): ").toUpperCase();
    if (querBebida === "S") {
      bebidas.forEach((p,i)=>console.log(`${i+1}-${p.nome} (${brMoney(p.preco)})`));
      const opB = readlineSync.questionInt("Escolha bebida (0 para nenhuma): ");
        if (opB > 0 && opB <= bebidas.length) {
          const b = bebidas[opB-1];
          if (b) {
            bebidaTexto = b.nome;
            precoBebida = b.preco;
          }
      }
    }
  }

  // SOBREMESAS
  const sobremesas = produtos.filter(p => p.categoria === "SOBREMESA" && p.ativo);
  let sobremesaTexto = "Nenhuma", precoSobremesa = 0;
  if (sobremesas.length > 0) {
    const querS = readlineSync.question("Adicionar sobremesa? (S/N): ").toUpperCase();
    if (querS === "S") {
      sobremesas.forEach((p,i)=>console.log(`${i+1}-${p.nome} (${brMoney(p.preco)})`));
      const opS = readlineSync.questionInt("Escolha sobremesa (0 para nenhuma): ");
      if (opS > 0 && opS <= sobremesas.length) {
        const s = sobremesas[opS-1];
          if (s) {
            sobremesaTexto = s.nome;
            precoSobremesa = s.preco;
          }
      }
    }
  }

  const totalBruto = precoBasePizza + precoBebida + precoSobremesa;
  const total = totalBruto * (1 - desconto);

  console.log("\n===== RESUMO DO PEDIDO =====");
  console.log(`Cliente: ${clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado"}`);
  console.log(`Pizza: ${tam.label} de ${pizza.nome} -> ${brMoney(precoBasePizza)}`);
  console.log(`Bebida: ${bebidaTexto} -> ${brMoney(precoBebida)}`);
  console.log(`Sobremesa: ${sobremesaTexto} -> ${brMoney(precoSobremesa)}`);
  console.log(`Desconto: ${desconto * 100}%`);
  console.log(`TOTAL: ${brMoney(total)}`);
  console.log("============================\n");

  // Salvar comprovante
  const arquivos = fs.readdirSync(dirRecibos);
  const comprovantes = arquivos.filter(a => a.startsWith("comprovantePedido") && a.endsWith(".txt"));
  const numero = comprovantes.length + 1;
  const filePath = path.join(dirRecibos, `comprovantePedido${numero}.txt`);
  const dataHoraBR = new Date().toLocaleString("pt-BR");
  const conteudoTXT = `===== COMPROVANTE DO PEDIDO =====
Data/Hora: ${dataHoraBR}
Cliente: ${clienteCadastrado ? clienteCadastrado.nome : "Não cadastrado"}
----------------------------------
Pizza: ${tam.label} de ${pizza.nome}
Bebida: ${bebidaTexto}
Sobremesa: ${sobremesaTexto}
----------------------------------
Desconto: ${desconto * 100}%
TOTAL: ${brMoney(total)}
==================================
`;
  fs.writeFileSync(filePath, conteudoTXT, "utf-8");
  console.log("Comprovante salvo em:", filePath);

  // Registrar VENDA da pizza (relatórios contam apenas PIZZA)
  const venda: Venda = {
    id: proximoIdVenda++,
    dataISO: new Date().toISOString(),
    item: `${tam.label} ${pizza.nome}`,
    categoria: "PIZZA",
    quantidade: 1,
    valorUnitario: precoBasePizza, // para pizza, usamos preço final da pizza (sem adicionais)
    valorTotal: precoBasePizza,    // mantemos total da pizza aqui; adicionais não entram no relatório de pizza
  };
  salvarVenda(venda);
  console.log("Venda registrada em ativos/vendas.csv");
}

// ---------- INICIALIZAÇÃO ----------
ensureDirs();
carregarClientes();
carregarProdutos();
bootstrapProdutosPadrao();
carregarVendas();

// ---------- MENU PRINCIPAL ----------
do {
  spacing(1);
  console.log("....::::MENU::PIZZAFAI::::....");
  console.log("1: Cadastrar");
  console.log("2: Pedido");
  console.log("3: Consultar");
  console.log("4: Relatórios de Vendas");
  console.log("9: Sair");
  dig = readlineSync.questionInt("Digite: ");

  switch (dig) {
    case 1: { // ---------- CADASTRO ----------
      let sub: number;
      do {
        spacing(1);
        console.log("....::::Tipo:Cadastro::::....");
        console.log("1: Cliente");
        console.log("2: Produto");
        console.log("9: Voltar");
        sub = readlineSync.questionInt("Digite: ");
        switch (sub) {
          case 1: {
            console.log("VOCÊ SELECIONOU CADASTRO DE CLIENTE");
            const nome = readlineSync.question("Nome: ");
            const cpf = readlineSync.question("CPF (somente números): ");
            const telefone = readlineSync.question("Telefone: ");
            const endereco = readlineSync.question("Endereço: ");
            const novoCliente: Cliente = { id: proximoIdCliente++, nome, cpf, telefone, endereco };
            clientes.push(novoCliente);
            salvarCliente(novoCliente);
            console.log("\nCliente cadastrado com sucesso!");
            break;
          }
          case 2:
            cadastrarProdutoFlow();
            break;
          case 9: break;
          default: console.log("Opção inválida!");
        }
      } while (sub !== 9);
      break;
    }

    case 2: // ---------- PEDIDO ----------
      fluxoPedido();
      break;

    case 3: { // ---------- CONSULTA ----------
      spacing(1);
      console.log("....::::Tipo:Consulta::::....");
      console.log("1: Lista de Clientes");
      console.log("2: Consultar Cliente Específico");
      console.log("3: Listar Produtos");
      const c = readlineSync.questionInt("Digite: ");
      switch (c) {
        case 1: listarClientes(); break;
        case 2: consultarClienteUnico(); break;
        case 3: listarProdutosFlow(); break;
        default: console.log("Opção inválida!");
      }
      break;
    }

    case 4: { // ---------- RELATÓRIOS ----------
      console.log("\n....:::: RELATÓRIOS DE VENDAS ::::");
      console.log("1: Pizzas vendidas por dia");
      console.log("2: Pizzas vendidas por mês");
      const r = readlineSync.questionInt("Escolha: ");
      if (r === 1) relatorioPizzasPorDia();
      else if (r === 2) relatorioPizzasPorMes();
      else console.log("Opção inválida!");
      break;
    }

    case 9:
      console.log("Saindo...");
      break;

    default:
      console.log("Opção inválida!");
      break;
  }
} while (dig != 9);
