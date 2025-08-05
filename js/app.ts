import { DataService } from './services/DataService';
import { Cliente } from './models/Cliente';
import { Produto } from './models/Produto';
import { Venda } from './models/Venda';
import { ItemVenda } from './models/ItemVenda';

// Variáveis globais para armazenar os dados carregados
let clientes: any[] = [];
let produtos: any[] = [];
let vendas: Venda[] = [];

/**
 * @function carregarDadosIniciais
 * @description Carrega todos os dados (clientes, produtos, vendas) do localStorage
 * ao iniciar a aplicação.
 */
function carregarDadosIniciais(): void {
    clientes = DataService.carregarClientes();
    produtos = DataService.carregarProdutos();
    vendas = DataService.carregarVendas();
    console.log('Dados iniciais carregados:', { clientes, produtos, vendas });
}

/**
 * @function exibirMensagem
 * @description Exibe uma mensagem de feedback para o usuário (sucesso ou erro).
 * @param {string} texto - O texto da mensagem.
 * @param {'success' | 'error'} tipo - O tipo da mensagem ('success' ou 'error').
 */
function exibirMensagem(texto: string, tipo: 'success' | 'error'): void {
    const messageDiv = $('#message-area');
    if (messageDiv.length === 0) {
        // Cria a div de mensagem se ela não existir
        $('main.container').prepend('<div id="message-area"></div>');
        messageDiv.empty(); // Limpa conteúdo anterior
    }
    const newMessage = $(`<div class="message ${tipo}">${texto}</div>`);
    messageDiv.append(newMessage);

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
        newMessage.fadeOut(500, function() {
            $(this).remove();
            if (messageDiv.children().length === 0) {
                // Remove a message-area se estiver vazia
                messageDiv.remove();
            }
        });
    }, 5000);
}

/**
 * @function inicializarPagina
 * @description Função principal que é chamada no carregamento de cada página.
 * Responsável por chamar as funções específicas para cada URL.
 */
$(document).ready(() => {
    carregarDadosIniciais(); // Carrega os dados sempre que uma página é carregada

    // Verifica qual página estamos e chama a função de inicialização específica
    const path = window.location.pathname;

    if (path.includes('clientes.html')) {
        inicializarClientesPage();
    } else if (path.includes('produtos.html')) {
        inicializarProdutosPage();
    } else if (path.includes('vendas.html')) {
        inicializarVendasPage();
    }
    // index.html não precisa de inicialização específica além do carregamento de dados
});

// --- Funções Específicas para a Página de Clientes ---

function inicializarClientesPage(): void {
    renderizarTabelaClientes();

    $('#form-cliente').on('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const id = $('#cliente-id').val() as string;
        const nome = $('#cliente-nome').val() as string;
        const cpf = $('#cliente-cpf').val() as string;
        const email = $('#cliente-email').val() as string;
        const telefone = $('#cliente-telefone').val() as string;

        try {
            if (id) {
                // Modo edição
                const clienteExistente = clientes.find(c => c.id === id);
                if (clienteExistente) {
                    clienteExistente.nome = nome;
                    clienteExistente.documento = cpf; // documento é o CPF
                    clienteExistente.email = email;
                    clienteExistente.telefone = telefone;
                    exibirMensagem('Cliente atualizado com sucesso!', 'success');
                } else {
                    exibirMensagem('Cliente não encontrado para atualização.', 'error');
                }
            } else {
                // Modo cadastro
                const novoCliente = new Cliente(nome, cpf, email, telefone);
                clientes.push(novoCliente);
                exibirMensagem('Cliente cadastrado com sucesso!', 'success');
            }
            DataService.salvarClientes(clientes);
            renderizarTabelaClientes();
            limparFormularioCliente();
        } catch (error: any) {
            exibirMensagem(`Erro ao salvar cliente: ${error.message}`, 'error');
        }
    });

    // Delegar evento de clique para botões de edição/exclusão na tabela
    $('#tabela-clientes-body').on('click', '.btn-edit', function() {
        const clienteId = $(this).data('id');
        const cliente = clientes.find(c => c.id === clienteId);
        if (cliente) {
            $('#cliente-id').val(cliente.id);
            $('#cliente-nome').val(cliente.nome);
            $('#cliente-cpf').val(cliente.documento);
            $('#cliente-email').val(cliente.email);
            $('#cliente-telefone').val(cliente.telefone);
            $('#form-cliente-submit').text('Atualizar Cliente').removeClass('primary').addClass('info');
        }
    });

    $('#tabela-clientes-body').on('click', '.btn-delete', function() {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            const clienteId = $(this).data('id');
            clientes = clientes.filter(c => c.id !== clienteId);
            DataService.salvarClientes(clientes);
            renderizarTabelaClientes();
            exibirMensagem('Cliente excluído com sucesso!', 'success');
            limparFormularioCliente(); // Limpa o formulário caso o cliente excluído estivesse em edição
        }
    });

    $('#btn-limpar-cliente').on('click', limparFormularioCliente);
}

/**
 * @function renderizarTabelaClientes
 * @description Renderiza a tabela de clientes na página.
 */
function renderizarTabelaClientes(): void {
    const tbody = $('#tabela-clientes-body');
    tbody.empty(); // Limpa a tabela antes de renderizar
    if (clientes.length === 0) {
        tbody.append('<tr><td colspan="6">Nenhum cliente cadastrado.</td></tr>');
        return;
    }

    clientes.forEach(cliente => {
        const row = `
            <tr>
                <td>${cliente.id.substring(0, 8)}...</td>
                <td>${cliente.nome}</td>
                <td>${cliente.documento}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td class="actions">
                    <button class="button info button-sm btn-edit" data-id="${cliente.id}">Editar</button>
                    <button class="button danger button-sm btn-delete" data-id="${cliente.id}">Excluir</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

/**
 * @function limparFormularioCliente
 * @description Limpa os campos do formulário de cliente e reseta o botão.
 */
function limparFormularioCliente(): void {
    $('#cliente-id').val('');
    $('#cliente-nome').val('');
    $('#cliente-cpf').val('');
    $('#cliente-email').val('');
    $('#cliente-telefone').val('');
    $('#form-cliente-submit').text('Cadastrar Cliente').removeClass('info').addClass('primary');
}

// --- Funções Específicas para a Página de Produtos ---

function inicializarProdutosPage(): void {
    renderizarTabelaProdutos();

    $('#form-produto').on('submit', function(event) {
        event.preventDefault();

        const id = $('#produto-id').val() as string;
        const nome = $('#produto-nome').val() as string;
        const preco = parseFloat($('#produto-preco').val() as string);
        const estoque = parseInt($('#produto-estoque').val() as string);

        try {
            if (id) {
                // Modo edição
                const produtoExistente = produtos.find(p => p.id === id);
                if (produtoExistente) {
                    produtoExistente.nome = nome;
                    produtoExistente.preco = preco;
                    produtoExistente.estoque = estoque;
                    exibirMensagem('Produto atualizado com sucesso!', 'success');
                } else {
                    exibirMensagem('Produto não encontrado para atualização.', 'error');
                }
            } else {
                // Modo cadastro
                const novoProduto = new Produto(nome, preco, estoque);
                produtos.push(novoProduto);
                exibirMensagem('Produto cadastrado com sucesso!', 'success');
            }
            DataService.salvarProdutos(produtos);
            renderizarTabelaProdutos();
            limparFormularioProduto();
        } catch (error: any) {
            exibirMensagem(`Erro ao salvar produto: ${error.message}`, 'error');
        }
    });

    $('#tabela-produtos-body').on('click', '.btn-edit', function() {
        const produtoId = $(this).data('id');
        const produto = produtos.find(p => p.id === produtoId);
        if (produto) {
            $('#produto-id').val(produto.id);
            $('#produto-nome').val(produto.nome);
            $('#produto-preco').val(produto.preco);
            $('#produto-estoque').val(produto.estoque);
            $('#form-produto-submit').text('Atualizar Produto').removeClass('primary').addClass('info');
        }
    });

    $('#tabela-produtos-body').on('click', '.btn-delete', function() {
        if (confirm('Tem certeza que deseja excluir este produto?')) {
            const produtoId = $(this).data('id');
            produtos = produtos.filter(p => p.id !== produtoId);
            DataService.salvarProdutos(produtos);
            renderizarTabelaProdutos();
            exibirMensagem('Produto excluído com sucesso!', 'success');
            limparFormularioProduto();
        }
    });

    $('#btn-limpar-produto').on('click', limparFormularioProduto);
}

/**
 * @function renderizarTabelaProdutos
 * @description Renderiza a tabela de produtos na página.
 */
function renderizarTabelaProdutos(): void {
    const tbody = $('#tabela-produtos-body');
    tbody.empty();
    if (produtos.length === 0) {
        tbody.append('<tr><td colspan="5">Nenhum produto cadastrado.</td></tr>');
        return;
    }

    produtos.forEach(produto => {
        const row = `
            <tr>
                <td>${produto.id.substring(0, 8)}...</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>${produto.estoque}</td>
                <td class="actions">
                    <button class="button info button-sm btn-edit" data-id="${produto.id}">Editar</button>
                    <button class="button danger button-sm btn-delete" data-id="${produto.id}">Excluir</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

/**
 * @function limparFormularioProduto
 * @description Limpa os campos do formulário de produto e reseta o botão.
 */
function limparFormularioProduto(): void {
    $('#produto-id').val('');
    $('#produto-nome').val('');
    $('#produto-preco').val('');
    $('#produto-estoque').val('');
    $('#form-produto-submit').text('Cadastrar Produto').removeClass('info').addClass('primary');
}

// --- Funções Específicas para a Página de Vendas ---

let itensDaVenda: ItemVenda[] = [];
let clienteSelecionado: Cliente | null = null;

function inicializarVendasPage(): void {
    popularSelectClientes();
    popularSelectProdutos();
    renderizarItensDaVenda(); // Garante que a lista de itens está vazia ao iniciar

    $('#select-cliente').on('change', function() {
        const clienteId = $(this).val() as string;
        clienteSelecionado = clientes.find(c => c.id === clienteId) || null;
        if (clienteSelecionado) {
            $('#info-cliente-selecionado').text(`Cliente selecionado: ${clienteSelecionado.nome} (CPF: ${clienteSelecionado.documento})`);
        } else {
            $('#info-cliente-selecionado').text('Nenhum cliente selecionado.');
        }
    });

    $('#btn-adicionar-produto').on('click', function() {
        const produtoId = $('#select-produto').val() as string;
        const quantidade = parseInt($('#quantidade-produto').val() as string);

        if (!produtoId || isNaN(quantidade) || quantidade <= 0) {
            exibirMensagem('Selecione um produto e uma quantidade válida.', 'error');
            return;
        }

        const produto = produtos.find(p => p.id === produtoId);
        if (!produto) {
            exibirMensagem('Produto não encontrado.', 'error');
            return;
        }

        if (quantidade > produto.estoque) {
            exibirMensagem(`Quantidade (${quantidade}) excede o estoque disponível (${produto.estoque}) para ${produto.nome}.`, 'error');
            return;
        }

        // Verifica se o item já existe na lista para atualizar a quantidade
        const itemExistente = itensDaVenda.find(item => item.produto.id === produto.id);

        try {
            if (itemExistente) {
                // Atualiza a quantidade do item existente
                itemExistente.quantidade += quantidade;
            } else {
                // Adiciona um novo item
                const novoItem = new ItemVenda(produto, quantidade);
                itensDaVenda.push(novoItem);
            }
            // Reduz o estoque do produto
            produto.estoque -= quantidade;
            DataService.salvarProdutos(produtos); // Salva o estoque atualizado
            popularSelectProdutos(); // Atualiza o select de produtos para refletir o estoque

            renderizarItensDaVenda();
            exibirMensagem(`Produto "${produto.nome}" adicionado/atualizado na venda!`, 'success');
            $('#quantidade-produto').val(1); // Reseta a quantidade
        } catch (error: any) {
            exibirMensagem(`Erro ao adicionar produto: ${error.message}`, 'error');
        }
    });

    $('#lista-itens-venda').on('click', '.btn-remove-item', function() {
        const index = $(this).data('index');
        if (confirm('Tem certeza que deseja remover este item da venda?')) {
            const itemRemovido = itensDaVenda[index];
            const produtoAssociado = produtos.find(p => p.id === itemRemovido.produto.id);
            if (produtoAssociado) {
                produtoAssociado.estoque += itemRemovido.quantidade; // Devolve o estoque
                DataService.salvarProdutos(produtos);
                popularSelectProdutos(); // Atualiza o select
            }
            itensDaVenda.splice(index, 1);
            renderizarItensDaVenda();
            exibirMensagem('Item removido da venda.', 'success');
        }
    });

    $('#btn-finalizar-venda').on('click', function() {
        if (!clienteSelecionado) {
            exibirMensagem('Selecione um cliente para finalizar a venda.', 'error');
            return;
        }
        if (itensDaVenda.length === 0) {
            exibirMensagem('Adicione pelo menos um produto à venda.', 'error');
            return;
        }

        try {
            const novaVenda = new Venda(clienteSelecionado, [...itensDaVenda]); // Cria uma cópia dos itens
            vendas.push(novaVenda);
            DataService.salvarVendas(vendas);

            exibirMensagem('Venda finalizada com sucesso! JSON gerado no console.', 'success');
            console.log('JSON da Venda Finalizada:', novaVenda.toJSON());

            // Resetar a tela de venda
            limparFormularioVenda();
            renderizarVendasRealizadas(); // Atualiza a lista de vendas passadas
        } catch (error: any) {
            exibirMensagem(`Erro ao finalizar venda: ${error.message}`, 'error');
        }
    });

    // Funções para a listagem de vendas realizadas
    renderizarVendasRealizadas();

    $('#tabela-vendas-realizadas-body').on('click', '.btn-view-details', function() {
        const vendaId = $(this).data('id');
        const venda = vendas.find(v => v.id === vendaId);
        if (venda) {
            // Exibir detalhes da venda em um modal ou seção específica
            alert(`Detalhes da Venda ID: ${venda.id}\nCliente: ${venda.cliente.nome}\nTotal: R$ ${venda.total.toFixed(2)}\nItens: ${venda.itens.length}`);
            console.log('Detalhes da Venda:', venda.toJSON());
        }
    });
}

/**
 * @function popularSelectClientes
 * @description Preenche o select de clientes na página de vendas.
 */
function popularSelectClientes(): void {
    const selectCliente = $('#select-cliente');
    selectCliente.empty().append('<option value="">Selecione um cliente</option>');
    clientes.forEach(cliente => {
        selectCliente.append(`<option value="${cliente.id}">${cliente.nome} (${cliente.documento})</option>`);
    });
}

/**
 * @function popularSelectProdutos
 * @description Preenche o select de produtos na página de vendas.
 * Filtra produtos com estoque > 0.
 */
function popularSelectProdutos(): void {
    const selectProduto = $('#select-produto');
    selectProduto.empty().append('<option value="">Selecione um produto</option>');
    produtos.filter(p => p.estoque > 0).forEach(produto => {
        selectProduto.append(`<option value="${produto.id}">${produto.nome} (R$ ${produto.preco.toFixed(2)} - Estoque: ${produto.estoque})</option>`);
    });
    // Se não houver produtos, desabilita o botão de adicionar
    if (produtos.filter(p => p.estoque > 0).length === 0) {
        $('#btn-adicionar-produto').prop('disabled', true);
    } else {
        $('#btn-adicionar-produto').prop('disabled', false);
    }
}

/**
 * @function renderizarItensDaVenda
 * @description Renderiza a lista de produtos que estão sendo adicionados à venda atual.
 */
function renderizarItensDaVenda(): void {
    const listaItens = $('#lista-itens-venda');
    listaItens.empty();
    let totalVendaAtual = 0;

    if (itensDaVenda.length === 0) {
        listaItens.append('<li class="list-group-item no-items">Nenhum produto adicionado à venda.</li>');
    } else {
        itensDaVenda.forEach((item, index) => {
            const li = `
                <li class="list-group-item">
                    <span>${item.produto.nome} (x${item.quantidade}) - R$ ${item.subtotal.toFixed(2)}</span>
                    <button class="button danger button-sm btn-remove-item" data-index="${index}">Remover</button>
                </li>
            `;
            listaItens.append(li);
            totalVendaAtual += item.subtotal;
        });
    }
    $('#total-venda-atual').text(`Total da Venda: R$ ${totalVendaAtual.toFixed(2)}`);
}

/**
 * @function limparFormularioVenda
 * @description Reseta o formulário de vendas e a lista de itens.
 */
function limparFormularioVenda(): void {
    $('#select-cliente').val('');
    clienteSelecionado = null;
    $('#info-cliente-selecionado').text('Nenhum cliente selecionado.');
    $('#select-produto').val('');
    $('#quantidade-produto').val(1);
    itensDaVenda = []; // Limpa os itens da venda
    renderizarItensDaVenda(); // Atualiza a UI
}

/**
 * @function renderizarVendasRealizadas
 * @description Renderiza a tabela de vendas já finalizadas.
 */
function renderizarVendasRealizadas(): void {
    const tbody = $('#tabela-vendas-realizadas-body');
    tbody.empty();

    if (vendas.length === 0) {
        tbody.append('<tr><td colspan="5">Nenhuma venda realizada ainda.</td></tr>');
        return;
    }

    vendas.forEach(venda => {
        const dataFormatada = venda.data.toLocaleDateString('pt-BR');
        const horaFormatada = venda.data.toLocaleTimeString('pt-BR');
        const row = `
            <tr>
                <td>${venda.id.substring(0, 8)}...</td>
                <td>${venda.cliente.nome}</td>
                <td>${dataFormatada} ${horaFormatada}</td>
                <td>${venda.itens.length}</td>
                <td>R$ ${venda.total.toFixed(2)}</td>
                <td class="actions">
                    <button class="button info button-sm btn-view-details" data-id="${venda.id}">Ver Detalhes</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}