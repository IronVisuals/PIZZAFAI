### NOMES E RA:

### CLEITON GABRIEL MUCHENSKI COSTA – RA: 2508311

### JOÃO PEDRO RIBEIRO DA SILVA – RA 2502715

### HENRIQUE GABRIEL CESARONI - RA: 2502407

### PEDRO HENRIQUE DOS SANTOS AMORIM – RA: 2507980

### JOÃO LUCAS FRANGIOTTI - RA: 2501625

-----

# PIZZAFAI — CLI de Pizzaria (TypeScript/Node)

Sistema de console para **cadastro de clientes**, **cadastro/gestão de produtos** (pizzas, bebidas, sobremesas e outros), **registro de pedidos** com **desconto por CPF cadastrado**, **emissão de comprovantes TXT numerados** e **relatórios de vendas de pizzas por dia e por mês**.
Todos os dados ficam em arquivos **CSV** dentro da pasta `ativos/`.

---

## 📖 Manual de Utilização

Ao iniciar o programa, será exibido o menu principal:

```
....::::MENU::PIZZAFAI::::....
1: Cadastrar
2: Pedido
3: Consultar
4: Relatórios de Vendas
9: Sair
Digite:
```

### 1) Cadastrar

* **Cliente**: informe **Nome**, **CPF**, **Telefone** e **Endereço** → salvo em `ativos/clientes.csv`.
* **Produto**: informe **Nome**, **Categoria** (`PIZZA | BEBIDA | SOBREMESA | OUTRO`) e **Preço base** → salvo em `ativos/produtos.csv`.
  O preço base da pizza corresponde ao tamanho **Pequena**. Os tamanhos maiores usam multiplicadores:

  * Média = `1.8 × base`
  * Grande = `1.8 × 1.2 × base`

> Caso não existam produtos cadastrados, o sistema cria um catálogo padrão na primeira execução.

### 2) Pedido

* Informe o **CPF** do cliente (se cadastrado, aplica **10% de desconto**).
* Escolha a **pizza** e o **tamanho**.
* Opcional: adicione **bebida** e/ou **sobremesa**.
* O sistema gera:

  * **Resumo do pedido** no terminal.
  * **Comprovante TXT** numerado em `ativos/recibos/`.
  * **Registro da venda da pizza** em `ativos/vendas.csv` (para relatórios).

### 3) Consultar

* Listar todos os clientes.
* Consultar cliente específico por **CPF** ou **ID**.
* Listar produtos por categoria ou todos os ativos.

### 4) Relatórios de Vendas

* **Pizzas vendidas por dia**: agrupadas por data (`YYYY-MM-DD`).
* **Pizzas vendidas por mês**: agrupadas por mês (`YYYY-MM`).

---

## 🗂️ Estrutura do Projeto

```
PIZZAFAI/
├─ ativos/
│  ├─ clientes.csv             # base de clientes
│  ├─ produtos.csv             # catálogo de produtos
│  ├─ vendas.csv               # registro de vendas de pizzas
│  └─ recibos/                 # comprovantes TXT numerados
│     ├─ comprovantePedido1.txt
│     └─ comprovantePedido2.txt
│
├─ dist/                       # saída gerada após transpilar
│  ├─ index.js
│  ├─ index.js.map
│  ├─ index.d.ts
│  └─ index.d.ts.map
│
├─ node_modules/               # dependências instaladas
│
├─ src/
│  └─ index.ts                 # código principal em TypeScript
│
├─ InstalarDependencias.bat    # instala dependências (npm install)
├─ PIZZAFAI-RUN.bat            # compila e executa o sistema
├─ package.json
├─ package-lock.json
├─ tsconfig.json
└─ readme.md
```

---

## 🌐 Frontend (Web UI)

Além do CLI em `src/index.ts`, o projeto inclui uma interface web leve para facilitar testes e uso local.

- **Arquivos principais**:
  - `index.html` — Página pública (Pedidos & Clientes).
  - `admin.html` — Área administrativa (Clientes, Produtos, Relatórios e Novo Pedido).
  - `pedido_clientes.html` — Página alternativa com Pedidos + Clientes (backup).
  - `assets/js/app.js` — Lógica da UI, integração com a API e fallbacks para `localStorage` quando o backend não está disponível.
  - `styles.css` — Estilos compartilhados para todas as páginas.

- **Comportamento importante**:
  - A UI tenta fazer requisições para o backend em `http://localhost:3000`. Se o backend estiver offline, o frontend usa dados mockados e `localStorage` para permitir cadastro e visualização locais.
  - Ao finalizar pedido, o frontend gera automaticamente um comprovante e tenta baixar um PDF (usa `jsPDF` via CDN) — caso não seja possível, faz fallback para um arquivo `.txt` e inicia o download.

- **Como executar a UI**:
  1. Maneira rápida: abra `index.html` no navegador (duplo-clique). Para funcionalidades que fazem `fetch` ao backend, é recomendado servir via HTTP:

# Ou usando o pacote 'serve' com npx:
npx serve .
```

  2. Abra `http://localhost:8000/index.html` (ou a porta que escolheu) no navegador.
  3. Para recursos completos (salvar pedidos no servidor), inicie também o backend na porta `3000`.

--


## 📄 Formatos de Arquivo

**`ativos/clientes.csv`**

```
ID;Nome;CPF;Telefone;Endereco
1;Maria Silva;12345678900;11999990000;Rua A, 123
```

**`ativos/produtos.csv`**

```
ID;Nome;Categoria;Preco;Ativo
1;Calabresa;PIZZA;25;true
2;Refrigerante 2L;BEBIDA;15;true
```

**`ativos/vendas.csv`**

```
ID;DataISO;Item;Categoria;Quantidade;ValorUnitario;ValorTotal
1;2025-09-23T21:10:00.000Z;Média Calabresa;PIZZA;1;45;45
```

**`ativos/recibos/comprovantePedidoN.txt`**

```
===== COMPROVANTE DO PEDIDO =====
Data/Hora: 23/09/2025 21:10:00
Cliente: Maria Silva
----------------------------------
Pizza: Média de Calabresa
Bebida: Refrigerante 2L
Sobremesa: Bolo de chocolate
----------------------------------
Desconto: 10%
TOTAL: R$ 72,90
==================================
```

---

## 🧩 Dependências

* **Node.js** LTS (v18+)
* **npm** (vem com o Node)
* **TypeScript** (devDependency)
* (Opcional) **ts-node** (execução direta de `.ts`)

---

## ⚙️ Instalação

### Opção A) Clonar repositório

```bash
git clone https://github.com/<seu-usuario>/PIZZAFAI.git
cd PIZZAFAI
npm install
```

<<<<<<< HEAD
### Opção B) Baixar ZIP

1. Baixe o ZIP do repositório.
2. Extraia em uma pasta (ex.: `C:\Projetos\PIZZAFAI`).
3. Abra o terminal nessa pasta e rode:
=======
Passo 1 — Instalar NODE e dependências

Site para instalar o NODE: https://nodejs.org/en/download

Dê dois cliques em InstalarDependencias.bat

   ```bash
   npm install
   ```

---

## ▶️ Execução

### 1) Desenvolvimento (sem build)

```bash
npx ts-node src/index.ts
```

### 2) Build + execução

```bash
npx tsc
node dist/index.js
```

### 3) Via arquivos `.bat`

* **`InstalarDependencias.bat`** → instala as dependências (`npm install`)
* **`PIZZAFAI-RUN.bat`** → compila e executa (`npx tsc` + `node dist/index.js`)

---

## ✅ Checklist de Funcionalidades

* Cadastro de clientes
* Cadastro e listagem de produtos
* Catálogo padrão inicial
* Pedidos com desconto de 10% para CPF cadastrado
* Comprovantes TXT numerados
* Registro de vendas de pizzas em CSV
* Relatórios de pizzas vendidas por dia
* Relatórios de pizzas vendidas por mês

---

## 👥 Equipe

* CLEITON GABRIEL MUCHENSKI COSTA – RA: 2508311
* JOÃO PEDRO RIBEIRO DA SILVA – RA: 2502715
* HENRIQUE GABRIEL CESARONI – RA: 2502407
* PEDRO HENRIQUE DOS SANTOS AMORIM – RA: 2507980
* JOÃO LUCAS FRANGIOTTI - RA: 2501625

---

## Fluxograma

<img width="798" height="918" alt="image" src="https://github.com/user-attachments/assets/5feaf17a-3815-4da1-b909-3f64bcbed214" />

## 
