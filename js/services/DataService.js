import { Cliente } from './models/Cliente';
import { Produto } from './models/Produto';
import { Venda } from './models/Venda';
/**
 * @class DataService
 * @description Classe responsável por gerenciar a persistência de dados (Clientes, Produtos, Vendas)
 * utilizando o localStorage do navegador.
 * Demonstra Encapsulamento e Abstração do mecanismo de armazenamento.
 * Funciona como um "repositório" simples.
 */
export class DataService {
    // --- Métodos para Clientes ---
    /**
     * @method salvarClientes
     * @description Salva um array de objetos Cliente no localStorage, convertendo-os para JSON.
     * @param {Cliente[]} clientes - O array de clientes a ser salvo.
     */
    static salvarClientes(clientes) {
        // Converte cada objeto Cliente para um objeto JSON puro antes de salvar
        const clientesJSON = clientes.map(cliente => cliente.toJSON());
        localStorage.setItem(DataService.CLIENTES_KEY, JSON.stringify(clientesJSON));
    }
    /**
     * @method carregarClientes
     * @description Carrega clientes do localStorage e os reconstrói como objetos Cliente.
     * @returns {Cliente[]} Um array de objetos Cliente.
     */
    static carregarClientes() {
        const data = localStorage.getItem(DataService.CLIENTES_KEY);
        if (data) {
            const clientesJSON = JSON.parse(data);
            // Reconstrói cada objeto Cliente a partir do JSON usando o método estático fromJSON
            return clientesJSON.map(json => Cliente.fromJSON(json));
        }
        return [];
    }
    // --- Métodos para Produtos ---
    /**
     * @method salvarProdutos
     * @description Salva um array de objetos Produto no localStorage.
     * @param {Produto[]} produtos - O array de produtos a ser salvo.
     */
    static salvarProdutos(produtos) {
        const produtosJSON = produtos.map(produto => produto.toJSON());
        localStorage.setItem(DataService.PRODUTOS_KEY, JSON.stringify(produtosJSON));
    }
    /**
     * @method carregarProdutos
     * @description Carrega produtos do localStorage e os reconstrói como objetos Produto.
     * @returns {Produto[]} Um array de objetos Produto.
     */
    static carregarProdutos() {
        const data = localStorage.getItem(DataService.PRODUTOS_KEY);
        if (data) {
            const produtosJSON = JSON.parse(data);
            return produtosJSON.map(json => Produto.fromJSON(json));
        }
        return [];
    }
    // --- Métodos para Vendas ---
    /**
     * @method salvarVendas
     * @description Salva um array de objetos Venda no localStorage.
     * @param {Venda[]} vendas - O array de vendas a ser salvo.
     */
    static salvarVendas(vendas) {
        const vendasJSON = vendas.map(venda => venda.toJSON());
        localStorage.setItem(DataService.VENDAS_KEY, JSON.stringify(vendasJSON));
    }
    /**
     * @method carregarVendas
     * @description Carrega vendas do localStorage e as reconstrói como objetos Venda.
     * @returns {Venda[]} Um array de objetos Venda.
     */
    static carregarVendas() {
        const data = localStorage.getItem(DataService.VENDAS_KEY);
        if (data) {
            const vendasJSON = JSON.parse(data);
            return vendasJSON.map(json => Venda.fromJSON(json));
        }
        return [];
    }
}
/**
 * @private
 * @static
 * @property {string} CLIENTES_KEY - Chave para armazenar clientes no localStorage.
 */
DataService.CLIENTES_KEY = 'clientes';
/**
 * @private
 * @static
 * @property {string} PRODUTOS_KEY - Chave para armazenar produtos no localStorage.
 */
DataService.PRODUTOS_KEY = 'produtos';
/**
 * @private
 * @static
 * @property {string} VENDAS_KEY - Chave para armazenar vendas no localStorage.
 */
DataService.VENDAS_KEY = 'vendas';
