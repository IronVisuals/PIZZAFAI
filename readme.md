### NOMES E RA:

### CLEITON GABRIEL MUCHENSKI COSTA – RA: 2508311

### JOÃO PEDRO RIBEIRO DA SILVA – RA 2502715

### HENRIQUE GABRIEL CESARONI - RA: 2502407

### PEDRO HENRIQUE DOS SANTOS AMORIM – RA: 2507980

-----

# PIZZIFY — CLI de Pizzaria (TypeScript/Node)

Sistema de console para **cadastro de clientes**, **geração de pedidos** com **desconto por CPF cadastrado** e **emissão de comprovantes TXT numerados**.
Tudo salvo localmente em **CSV** (clientes) e **TXT** (recibos).

---

## ✨ Funcionalidades

* **Cadastro de clientes** (Nome, CPF, Telefone, Endereço) → persiste em `ativos/clientes.csv`
* **Pedidos**:

  * Sabores: Calabresa, Marguerita, Frango, Portuguesa
  * Tamanhos: Grande | Média | Pequena
  * Adicionais: Bebidas e Sobremesas (opcionais)
  * **Desconto automático de 10%** se o **CPF estiver cadastrado**
* **Comprovante TXT numerado**: `ativos/recibos/comprovantePedidoN.txt` (N incremental)
* **Consulta**:

  * Listar todos os clientes
  * Consultar cliente específico por **CPF** ou **ID**
* **Arquivos gerados**:

  * `ativos/clientes.csv` (dados dos clientes)
  * `ativos/recibos/comprovantePedido1.txt`, `...2.txt`, etc.

---

## 🗂️ Estrutura de Pastas (esperada)

```
PIZZIFY/
├─ src/
│  └─ index.ts                # (ou appmain.ts) código principal
├─ ativos/                    # criado/uso pelo app fora de src
│  ├─ clientes.csv            # criado automaticamente ao cadastrar o 1º cliente
│  └─ recibos/                # pasta de comprovantes
│     ├─ comprovantePedido1.txt
│     └─ comprovantePedido2.txt
├─ package.json
├─ tsconfig.json
└─ README.md
```

> **Importante:** o código usa `__dirname, "..", "ativos"` para **sair da pasta `src`** e gravar em `ativos/…` na **raiz do projeto**.

---

## 🔧 Pré-requisitos

* **Node.js** LTS (v18+)
* **npm** (vem com o Node)
* **TypeScript** como dev-dependency (o projeto já traz `"typescript"` no `package.json`)

---

## 📦 Instalação

```bash
# Clonar o repositório
git clone https://github.com/IronVisuals/PIZZIFY
cd PIZZIFY

# Instalar dependências
npm install
```

---

## ▶️ Como Executar

### Opção A) Executar diretamente com ts-node

Sem gerar pasta `dist`.

```bash
npx ts-node src/index.ts
```

> Se seu arquivo principal tiver outro nome (ex.: `appmain.ts`), ajuste o caminho:
> `npx ts-node src/appmain.ts`

### Opção B) Transpilar e rodar com Node

Gera JS em `dist/`.

```bash
# Transpilar
npx tsc

# Executar
node dist/index.js
```

---

## 🧭 Uso — Fluxo do Menu

1. **Abrir o programa** (ts-node ou Node, ver acima)
2. Você verá:

```
....::::MENU::PIZZIFY::::....
1: Cadastrar
2: Pedido
3: Consultar
9: Sair
Digite:
```

### 1) Cadastrar → Cliente

* Informe **Nome**, **CPF** (apenas números), **Telefone**, **Endereço**
* O cliente é salvo em `ativos/clientes.csv`
* O **ID** é incremental e controlado em memória (recalculado na carga do CSV)

### 2) Pedido

* Digite o **CPF do cliente** para validar o desconto (se **cadastrado** → **10% off**)
* Escolha **sabor** (1–4) e **tamanho** (1–3)
* Se desejar, adicione **bebida** e/ou **sobremesa**
* O **TOTAL** já sai **com desconto aplicado** (quando aplicável)
* É gerado **comprovante numerado** em `ativos/recibos/`:

  * `comprovantePedido1.txt`, `comprovantePedido2.txt`, …

### 3) Consultar

* **Lista completa** de clientes
* Consulta de **cliente específico**:

  * por **CPF**
  * por **ID**

---

## 🧠 Lógica Principal (resumo técnico)

* **Carregamento de clientes (`carregarClientes`)**
  Lê `ativos/clientes.csv` (se existir), pula o cabeçalho e carrega `Cliente[]` em memória.
  Ajusta `proximoIdCliente` com base no maior `ID` encontrado.

* **Salvar cliente (`salvarCliente`)**
  Cria o arquivo com **cabeçalho** se não existir e **apenda** o novo cliente (formato `;`-separado).

* **Desconto por CPF**
  Ao iniciar um **pedido**, lê o CPF informado:

  ```ts
  const clienteCadastrado = clientes.find(c => c.cpf === cpfCliente);
  let desconto = clienteCadastrado ? 0.10 : 0;
  const total = (precoBase + precoBebida + precoSobremesa) * (1 - desconto);
  ```

  O resumo e o comprovante mostram **nome do cliente** (se cadastrado) e **percentual de desconto**.

* **Comprovante numerado (TXT)**
  O código garante a pasta `ativos/recibos` fora da `src`:

  ```ts
  const dir = path.join(__dirname, "..", "ativos", "recibos");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const arquivos = fs.readdirSync(dir);
  const comprovantes = arquivos.filter(a => a.startsWith("comprovantePedido") && a.endsWith(".txt"));
  const numero = comprovantes.length + 1;

  const filePath = path.join(dir, `comprovantePedido${numero}.txt`);
  fs.writeFileSync(filePath, conteudoTXT, "utf-8");
  ```

  Assim, cada novo pedido cria `…Pedido1.txt`, `…Pedido2.txt`, etc.

---

## 📄 Formatos de Arquivo

### `ativos/clientes.csv`

Cabeçalho + linhas `;`-separadas:

```
ID;Nome;CPF;Telefone;Endereco
1;Maria Silva;12345678900;11999990000;Rua A, 123
2;João Souza;98765432100;11888887777;Av. B, 456
```

### `ativos/recibos/comprovantePedidoN.txt`

Exemplo:

```
===== COMPROVANTE DO PEDIDO =====
Data/Hora: 20/09/2025 16:45:12
Cliente: Maria Silva
----------------------------------
Pizza: Grande de Calabresa
Bebida: Refrigerante 2 litros
Sobremesa: Bolo de chocolate
----------------------------------
Desconto: 10%
TOTAL: R$ 72.90
==================================
```

---

## 🛠️ Scripts úteis (sugestão)

No seu `package.json`, adicione:

```json
{
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts",
    "clean": "rimraf dist"
  }
}
```

> Instale `ts-node` e (opcional) `rimraf`:
>
> ```bash
> npm i -D ts-node
> npm i -D rimraf
> ```

---

▶️ Como Executar (via .BAT)

Baixe o ZIP do repositório no GitHub:
PIZZIFY - Download ZIP

Extraia o conteúdo em uma pasta no seu computador (ex.: C:\Projetos\PIZZIFY).

Passo 1 — Instalar dependências

Dê dois cliques em InstalarDependencias.bat

Isso vai instalar automaticamente todas as bibliotecas necessárias (npm install).

Passo 2 — Rodar o sistema

Depois de instalar, dê dois cliques em PIZZIFY-RUN.bat

O terminal será aberto e o sistema exibirá o menu:

....::::MENU::PIZZIFY::::....
1: Cadastrar
2: Pedido
3: Consultar
9: Sair
Digite:


Agora é só navegar no menu e usar o sistema 🚀
