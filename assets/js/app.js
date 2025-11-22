// Estado da aplicação
let state = {
    clientes: [],
    produtos: [],
    pedidoAtual: {
        cliente: null,
        pizza: null,
        tamanho: 1.0,
        bebida: null,
        sobremesa: null
    }
};
// expõe para usos eventuais
window.state = state;

// Configuração da API
const API_BASE_URL = 'http://localhost:3000'; // Ajuste conforme sua configuração

// Funções de navegação
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    const el = document.getElementById(sectionId);
    if (el) el.classList.add('active');
}

// API Real - Comunicação com o back-end
class PizzaFaiAPI {
    static async getClientes() {
        try {
            const response = await fetch(`${API_BASE_URL}/clientes`);
            if (!response.ok) throw new Error('Erro ao buscar clientes');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            // Fallback para dados mockados (inclui localStorage)
            return this.getClientesMock();
        }
    }

    static async getProdutos() {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`);
            if (!response.ok) throw new Error('Erro ao buscar produtos');
            const produtos = await response.json();

            // Mescla com produtos locais (se houver)
            let localProd = [];
            try {
                const stored = localStorage.getItem('pizzafai_produtos');
                localProd = stored ? JSON.parse(stored) : [];
            } catch (e) { localProd = []; }

            const all = Array.isArray(produtos) ? [...produtos, ...localProd] : produtos;
            return {
                PIZZA: all.filter(p => p.categoria === 'PIZZA' && p.ativo),
                BEBIDA: all.filter(p => p.categoria === 'BEBIDA' && p.ativo),
                SOBREMESA: all.filter(p => p.categoria === 'SOBREMESA' && p.ativo)
            };
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            return this.getProdutosMock();
        }
    }

    static async cadastrarCliente(cliente) {
        try {
            const response = await fetch(`${API_BASE_URL}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente)
            });

            if (!response.ok) throw new Error('Erro ao cadastrar cliente');
            return await response.json();
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            // Simula sucesso se o back-end não estiver disponível
            // Armazena cliente localmente no localStorage para aparecer nas listagens
            try {
                const localKey = 'pizzafai_clientes';
                const stored = localStorage.getItem(localKey);
                const arr = stored ? JSON.parse(stored) : [];
                const newCliente = { id: Date.now(), ...cliente };
                arr.push(newCliente);
                localStorage.setItem(localKey, JSON.stringify(arr));
                // Atualiza estado local (se disponível)
                if (window.state && Array.isArray(window.state.clientes)) {
                    window.state.clientes.push(newCliente);
                }
                return { success: true, cliente: newCliente, message: 'Cliente cadastrado localmente' };
            } catch (e) {
                return { success: true, id: Date.now(), message: 'Cliente cadastrado localmente' };
            }
        }
    }

    static async cadastrarProduto(produto) {
        try {
            const response = await fetch(`${API_BASE_URL}/produtos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
            if (!response.ok) throw new Error('Erro ao cadastrar produto');
            return await response.json();
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            try {
                const localKey = 'pizzafai_produtos';
                const stored = localStorage.getItem(localKey);
                const arr = stored ? JSON.parse(stored) : [];
                const newProd = { id: Date.now(), ...produto };
                arr.push(newProd);
                localStorage.setItem(localKey, JSON.stringify(arr));
                return { success: true, produto: newProd, message: 'Produto cadastrado localmente' };
            } catch (e) {
                return { success: false, message: 'Falha ao salvar produto localmente' };
            }
        }
    }

    static async finalizarPedido(pedido) {
        try {
            const response = await fetch(`${API_BASE_URL}/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido)
            });

            if (!response.ok) throw new Error('Erro ao finalizar pedido');
            return await response.json();
        } catch (error) {
            console.error('Erro ao finalizar pedido:', error);
            // Simula sucesso se o back-end não estiver disponível
            // Gera e baixa um comprovante (tenta PDF via jsPDF; cai para .txt se necessário)
            const baseFilename = `comprovantePedido${Date.now()}`;
            try {
                const downloaded = await generateAndDownloadComprovante(pedido, baseFilename);
                return {
                    success: true,
                    comprovante: downloaded,
                    total: pedido.total,
                    message: 'Pedido processado localmente'
                };
            } catch (e) {
                console.error('Falha ao gerar comprovante localmente:', e);
                return {
                    success: true,
                    comprovante: `${baseFilename}.txt`,
                    total: pedido.total,
                    message: 'Pedido processado localmente (sem comprovante automático)'
                };
            }
        }
    }

    static async getRelatorioDia() {
        try {
            const response = await fetch(`${API_BASE_URL}/relatorios/dia`);
            if (!response.ok) throw new Error('Erro ao buscar relatório');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar relatório:', error);
            return this.getRelatorioDiaMock();
        }
    }

    static async getRelatorioMes() {
        try {
            const response = await fetch(`${API_BASE_URL}/relatorios/mes`);
            if (!response.ok) throw new Error('Erro ao buscar relatório');
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar relatório:', error);
            return this.getRelatorioMesMock();
        }
    }

    // Métodos mockados para quando o back-end não está disponível
    static async getClientesMock() {
        const base = [
            { id: 1, nome: "João Silva", cpf: "12345678900", telefone: "(11) 9999-9999", endereco: "Rua A, 123" },
            { id: 2, nome: "Maria Santos", cpf: "98765432100", telefone: "(11) 8888-8888", endereco: "Rua B, 456" }
        ];
        try {
            const localKey = 'pizzafai_clientes';
            const stored = localStorage.getItem(localKey);
            const local = stored ? JSON.parse(stored) : [];
            return [...base, ...local];
        } catch (e) {
            return base;
        }
    }

    static async getProdutosMock() {
        return {
            PIZZA: [
                { id: 1, nome: "Calabresa", preco: 25.00, categoria: "PIZZA" },
                { id: 2, nome: "Marguerita", preco: 25.00, categoria: "PIZZA" },
                { id: 3, nome: "Frango", preco: 25.00, categoria: "PIZZA" }
            ],
            BEBIDA: [
                { id: 4, nome: "Refrigerante 2L", preco: 15.00, categoria: "BEBIDA" },
                { id: 5, nome: "Cerveja", preco: 5.50, categoria: "BEBIDA" }
            ],
            SOBREMESA: [
                { id: 6, nome: "Sorvete Baunilha", preco: 15.00, categoria: "SOBREMESA" },
                { id: 7, nome: "Bolo Chocolate", preco: 12.00, categoria: "SOBREMESA" }
            ]
        };
    }

    static async getRelatorioDiaMock() {
        // Exemplo simples de relatório diário
        return [
            { dia: '2024-01-15', quantidade: 8 },
            { dia: '2024-01-16', quantidade: 12 },
            { dia: '2024-01-17', quantidade: 15 }
        ];
    }

    static async getRelatorioMesMock() {
        // Exemplo simples de relatório mensal
        return [
            { mes: '2024-01', quantidade: 150 },
            { mes: '2023-12', quantidade: 180 },
            { mes: '2023-11', quantidade: 140 }
        ];
    }
}

// Funções principais
async function carregarDados() {
    try {
        state.clientes = await PizzaFaiAPI.getClientes();
        state.produtos = await PizzaFaiAPI.getProdutos();

        // Normaliza retorno quando a API devolver um array de produtos
        if (Array.isArray(state.produtos)) {
            const produtosArr = state.produtos;
            state.produtos = {
                PIZZA: produtosArr.filter(p => p.categoria === 'PIZZA' && p.ativo),
                BEBIDA: produtosArr.filter(p => p.categoria === 'BEBIDA' && p.ativo),
                SOBREMESA: produtosArr.filter(p => p.categoria === 'SOBREMESA' && p.ativo)
            };
        }
        carregarPizzas();
        carregarBebidas();
        carregarSobremesas();
        carregarProdutosLista();
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert('Erro ao carregar dados. Verifique o console.');
    }
}

function carregarPizzas() {
    const container = document.getElementById('pizzas-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (state.produtos && state.produtos.PIZZA && state.produtos.PIZZA.length > 0) {
        state.produtos.PIZZA.forEach(pizza => {
            const div = document.createElement('div');
            div.className = 'pizza-option';
            div.innerHTML = `
                <strong>${pizza.nome}</strong>
                <div>Preço base: R$ ${pizza.preco.toFixed(2)}</div>
            `;
            // Passa a própria div para a função de seleção para evitar uso de "event" global
            div.addEventListener('click', () => selecionarPizza(pizza, div));
            container.appendChild(div);
        });
    } else {
        container.innerHTML = '<div class="no-data">Nenhuma pizza disponível</div>';
    }
}

function carregarBebidas() {
    const select = document.getElementById('bebidaSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Nenhuma bebida</option>';
    
    if (state.produtos && state.produtos.BEBIDA && state.produtos.BEBIDA.length > 0) {
        state.produtos.BEBIDA.forEach(bebida => {
            const option = document.createElement('option');
            option.value = bebida.id;
            option.textContent = `${bebida.nome} - R$ ${bebida.preco.toFixed(2)}`;
            select.appendChild(option);
        });
    }
}

function carregarSobremesas() {
    const select = document.getElementById('sobremesaSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Nenhuma sobremesa</option>';
    
    if (state.produtos && state.produtos.SOBREMESA && state.produtos.SOBREMESA.length > 0) {
        state.produtos.SOBREMESA.forEach(sobremesa => {
            const option = document.createElement('option');
            option.value = sobremesa.id;
            option.textContent = `${sobremesa.nome} - R$ ${sobremesa.preco.toFixed(2)}`;
            select.appendChild(option);
        });
    }
}

function carregarProdutosLista() {
    const container = document.getElementById('listaProdutos');
    if (!container) return;
    
    container.innerHTML = '<h3>📦 Todos os Produtos</h3>';
    
    ['PIZZA', 'BEBIDA', 'SOBREMESA'].forEach(categoria => {
        const produtosCategoria = (state.produtos && state.produtos[categoria]) ? state.produtos[categoria] : [];
        if (produtosCategoria.length > 0) {
            const div = document.createElement('div');
            div.className = 'card';
            div.innerHTML = `<h4>${categoria}</h4>`;
            
            produtosCategoria.forEach(produto => {
                const prodDiv = document.createElement('div');
                prodDiv.className = 'product-item';
                prodDiv.innerHTML = `
                    <strong>${produto.nome}</strong>
                    <div>R$ ${produto.preco.toFixed(2)}</div>
                `;
                div.appendChild(prodDiv);
            });
            
            container.appendChild(div);
        }
    });
}

function selecionarPizza(pizza, element) {
    // Remove seleção anterior
    document.querySelectorAll('.pizza-option').forEach(el => el.classList.remove('selected'));

    // Adiciona seleção atual na div fornecida
    if (element && element.classList) element.classList.add('selected');
    state.pedidoAtual.pizza = pizza;
}

async function finalizarPedido() {
    const cpfEl = document.getElementById('cpfCliente');
    const cpf = cpfEl ? cpfEl.value : '';
    const tamanhoEl = document.getElementById('tamanhoPizza');
    const tamanho = tamanhoEl ? parseFloat(tamanhoEl.value) : 1.0;
    // Mantém no estado o tamanho selecionado
    state.pedidoAtual.tamanho = tamanho;
    const bebidaSel = document.getElementById('bebidaSelect');
    const bebidaId = bebidaSel ? bebidaSel.value : '';
    const sobremesaSel = document.getElementById('sobremesaSelect');
    const sobremesaId = sobremesaSel ? sobremesaSel.value : '';

    // Validações
    if (!state.pedidoAtual.pizza) {
        alert('Por favor, selecione uma pizza!');
        return;
    }

    // Encontra cliente
    const cliente = (state.clientes || []).find(c => c.cpf === cpf);
    state.pedidoAtual.cliente = cliente;

    // Calcula totais
    const precoPizza = state.pedidoAtual.pizza.preco * tamanho;
    const bebida = (state.produtos && state.produtos.BEBIDA) ? state.produtos.BEBIDA.find(b => b.id == bebidaId) : null;
    const sobremesa = (state.produtos && state.produtos.SOBREMESA) ? state.produtos.SOBREMESA.find(s => s.id == sobremesaId) : null;
    
    const precoBebida = bebida ? bebida.preco : 0;
    const precoSobremesa = sobremesa ? sobremesa.preco : 0;
    
    const totalBruto = precoPizza + precoBebida + precoSobremesa;
    const desconto = cliente ? 0.1 : 0;
    const total = totalBruto * (1 - desconto);

    // Mostra resumo
    const resumo = document.getElementById('resumoContent');
    if (resumo) {
        resumo.innerHTML = `
            <p><strong>Cliente:</strong> ${cliente ? cliente.nome : 'Não cadastrado'}</p>
            <p><strong>Pizza:</strong> ${state.pedidoAtual.pizza.nome} - R$ ${precoPizza.toFixed(2)}</p>
            <p><strong>Bebida:</strong> ${bebida ? bebida.nome : 'Nenhuma'} - R$ ${precoBebida.toFixed(2)}</p>
            <p><strong>Sobremesa:</strong> ${sobremesa ? sobremesa.nome : 'Nenhuma'} - R$ ${precoSobremesa.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${desconto * 100}%</p>
            <h3>Total: R$ ${total.toFixed(2)}</h3>
        `;

        const resumoBox = document.getElementById('resumoPedido');
        if (resumoBox) resumoBox.classList.remove('hidden');
    }

    // Envia para o back-end
    try {
        const resultado = await PizzaFaiAPI.finalizarPedido({
            cliente: state.pedidoAtual.cliente,
            pizza: state.pedidoAtual.pizza,
            tamanho,
            bebida,
            sobremesa,
            total,
            data: new Date().toISOString()
        });

        if (resultado.success) {
            alert(`Pedido finalizado com sucesso! ${resultado.message || ''} Comprovante: ${resultado.comprovante}`);
            
            // Limpa o pedido atual
            state.pedidoAtual = {
                cliente: null,
                pizza: null,
                tamanho: 1.0,
                bebida: null,
                sobremesa: null
            };
            
            // Limpa seleções visuais
            document.querySelectorAll('.pizza-option').forEach(el => {
                el.classList.remove('selected');
            });
            if (cpfEl) cpfEl.value = '';
            if (document.getElementById('bebidaSelect')) document.getElementById('bebidaSelect').value = '';
            if (document.getElementById('sobremesaSelect')) document.getElementById('sobremesaSelect').value = '';
        }
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        alert('Erro ao finalizar pedido. Verifique o console.');
    }
}

async function cadastrarCliente() {
    const nomeEl = document.getElementById('nomeCliente');
    const cpfEl = document.getElementById('cpfNovo');
    const telefoneEl = document.getElementById('telefoneCliente');
    const enderecoEl = document.getElementById('enderecoCliente');
    const nome = nomeEl ? nomeEl.value : '';
    const cpf = cpfEl ? cpfEl.value : '';
    const telefone = telefoneEl ? telefoneEl.value : '';
    const endereco = enderecoEl ? enderecoEl.value : '';

    if (!nome || !cpf) {
        alert('Por favor, preencha nome e CPF!');
        return;
    }

    try {
        const resultado = await PizzaFaiAPI.cadastrarCliente({ nome, cpf, telefone, endereco });
        console.log('Resposta da API:', resultado);

        if (resultado.success) {
            alert('Cliente cadastrado com sucesso!');
            // Limpa formulário
            if (nomeEl) nomeEl.value = '';
            if (cpfEl) cpfEl.value = '';
            if (telefoneEl) telefoneEl.value = '';
            if (enderecoEl) enderecoEl.value = '';
            
            // Se a API retornou o cliente criado localmente, atualiza o estado local
            if (resultado.cliente) {
                state.clientes.push(resultado.cliente);
            } else {
                // Recarrega clientes do back-end
                state.clientes = await PizzaFaiAPI.getClientes();
            }
        } else {
            alert(`Erro ao cadastrar: ${resultado.message || 'Erro desconhecido'}`);
        }
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro ao conectar com o servidor');
    }
}

async function listarClientes() {
    const container = document.getElementById('listaClientes');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Carregando clientes...</div>';

    try {
        // Usa o estado em memória quando disponível (inclui cadastros locais)
        let clientes = (state && Array.isArray(state.clientes) && state.clientes.length > 0) ? state.clientes : await PizzaFaiAPI.getClientes();

        container.innerHTML = '';
        if (!clientes || clientes.length === 0) {
            container.innerHTML = '<div class="no-data">Nenhum cliente cadastrado</div>';
            return;
        }

        clientes.forEach(cliente => {
            const div = document.createElement('div');
            div.className = 'client-card';
            div.innerHTML = `
                <strong>${cliente.nome}</strong>
                <div>CPF: ${cliente.cpf}</div>
                <div>Telefone: ${cliente.telefone}</div>
                <div>Endereço: ${cliente.endereco}</div>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        container.innerHTML = '<div class="error">Erro ao carregar clientes</div>';
    }
}

async function gerarRelatorioDia() {
    const container = document.getElementById('relatorioResultado');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Gerando relatório...</div>';
    
    try {
        let dados = await PizzaFaiAPI.getRelatorioDia();

        // Normaliza formatos diferentes de resposta para um array
        if (!Array.isArray(dados)) {
            if (dados && Array.isArray(dados.data)) dados = dados.data;
            else if (dados && Array.isArray(dados.items)) dados = dados.items;
            else if (dados && typeof dados === 'object') dados = Object.values(dados);
            else dados = [];
        }

        if (!dados || dados.length === 0) {
            container.innerHTML = '<div class="no-data">Nenhum dado no relatório</div>';
            return;
        }

        let html = '<div class="card"><h3>📅 Pizzas Vendidas por Dia</h3>';
        dados.forEach(item => {
            const dia = item.dia || item.date || item.data || (item[0] || '');
            const quantidade = item.quantidade || item.qtd || item.count || item[1] || 0;
            html += `<p>${dia}: ${quantidade} pizza(s)</p>`;
        });
        html += '</div>';

        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        container.innerHTML = '<div class="error">Erro ao gerar relatório</div>';
    }
}

async function gerarRelatorioMes() {
    const container = document.getElementById('relatorioResultado');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">Gerando relatório...</div>';
    
    try {
        let dados = await PizzaFaiAPI.getRelatorioMes();

        // Normaliza formatos diferentes de resposta para um array
        if (!Array.isArray(dados)) {
            if (dados && Array.isArray(dados.data)) dados = dados.data;
            else if (dados && Array.isArray(dados.items)) dados = dados.items;
            else if (dados && typeof dados === 'object') dados = Object.values(dados);
            else dados = [];
        }

        if (!dados || dados.length === 0) {
            container.innerHTML = '<div class="no-data">Nenhum dado no relatório</div>';
            return;
        }

        let html = '<div class="card"><h3>📈 Pizzas Vendidas por Mês</h3>';
        dados.forEach(item => {
            const mes = item.mes || item.month || item.mes_ref || (item[0] || '');
            const quantidade = item.quantidade || item.qtd || item.count || item[1] || 0;
            html += `<p>${mes}: ${quantidade} pizza(s)</p>`;
        });
        html += '</div>';

        container.innerHTML = html;
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        container.innerHTML = '<div class="error">Erro ao gerar relatório</div>';
    }
}

async function cadastrarProdutoFront() {
    const nomeEl = document.getElementById('nomeProduto');
    const categoriaEl = document.getElementById('categoriaProduto');
    const precoEl = document.getElementById('precoProduto');
    const ativoEl = document.getElementById('ativoProduto');
    const nome = nomeEl ? nomeEl.value.trim() : '';
    const categoria = categoriaEl ? categoriaEl.value : 'OUTRO';
    const precoRaw = precoEl ? precoEl.value.trim() : '';
    const ativo = ativoEl ? ativoEl.checked : true;

    if (!nome || !precoRaw) {
        alert('Por favor, preencha nome e preço do produto.');
        return;
    }

    const preco = parseFloat(precoRaw.replace(',', '.'));
    if (Number.isNaN(preco) || preco < 0) {
        alert('Preço inválido. Use um número, ex: 25.00');
        return;
    }

    try {
        const resultado = await PizzaFaiAPI.cadastrarProduto({ nome, categoria, preco, ativo });
        if (resultado.success) {
            alert('Produto cadastrado com sucesso!');
            // limpa formulário
            if (nomeEl) nomeEl.value = '';
            if (precoEl) precoEl.value = '';
            if (ativoEl) ativoEl.checked = true;

            // atualiza estado local (se retornar produto)
            if (resultado.produto) {
                state.produtos = state.produtos || { PIZZA: [], BEBIDA: [], SOBREMESA: [] };
                const catKey = resultado.produto.categoria || categoria;
                if (!state.produtos[catKey]) state.produtos[catKey] = [];
                state.produtos[catKey].push(resultado.produto);
            } else {
                state.produtos = await PizzaFaiAPI.getProdutos();
            }

            carregarPizzas();
            carregarBebidas();
            carregarSobremesas();
            carregarProdutosLista();
        } else {
            alert(`Erro ao cadastrar produto: ${resultado.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro no cadastro de produto:', err);
        alert('Erro ao cadastrar produto. Veja console.');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});

// Gera um comprovante (PDF preferencial) e força download no navegador.
async function generateAndDownloadComprovante(pedido, baseFilename) {
    const filenamePdf = `${baseFilename}.pdf`;

    const lines = [];
    lines.push('PizzaFai - Comprovante de Pedido');
    lines.push(`Data: ${new Date().toLocaleString()}`);
    if (pedido.cliente) {
        lines.push(`Cliente: ${pedido.cliente.nome} (CPF: ${pedido.cliente.cpf || 'N/A'})`);
    } else {
        lines.push('Cliente: Não cadastrado');
    }
    lines.push(`Pizza: ${pedido.pizza ? pedido.pizza.nome : 'N/A'}`);
    lines.push(`Tamanho: ${pedido.tamanho || 1}`);
    lines.push(`Bebida: ${pedido.bebida ? pedido.bebida.nome : 'Nenhuma'}`);
    lines.push(`Sobremesa: ${pedido.sobremesa ? pedido.sobremesa.nome : 'Nenhuma'}`);
    lines.push('');
    lines.push(`Total: R$ ${Number(pedido.total || 0).toFixed(2)}`);

    const content = lines.join('\n');

    // Tenta carregar jsPDF se não estiver presente
    if (!window.jspdf) {
        try {
            await new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                s.onload = () => resolve();
                s.onerror = () => reject(new Error('Falha ao carregar jsPDF'));
                document.head.appendChild(s);
            });
        } catch (err) {
            console.warn('jsPDF não pôde ser carregado, irá usar fallback TXT:', err);
        }
    }

    // Se jsPDF estiver disponível, gera PDF
    if (window.jspdf && window.jspdf.jsPDF) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
            const margin = 10;
            let y = 15;
            const lineHeight = 8;
            const linesArr = content.split('\n');
            doc.setFontSize(12);
            linesArr.forEach(line => {
                const split = doc.splitTextToSize(line, pageWidth - margin * 2);
                doc.text(split, margin, y);
                y += lineHeight * split.length;
                if (y > doc.internal.pageSize.getHeight() - 20) {
                    doc.addPage();
                    y = 20;
                }
            });
            doc.save(filenamePdf);
            return filenamePdf;
        } catch (err) {
            console.warn('Erro ao gerar PDF com jsPDF, usando TXT de fallback:', err);
        }
    }

    // Fallback: gera TXT e força download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseFilename}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return `${baseFilename}.txt`;
}
