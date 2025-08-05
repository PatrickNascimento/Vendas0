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

    /**
     * @private
     * @static
     * @property {string} CLIENTES_KEY - Chave para armazenar clientes no localStorage.
     */
    private static readonly CLIENTES_KEY = 'clientes';

    /**
     * @private
     * @static
     * @property {string} PRODUTOS_KEY - Chave para armazenar produtos no localStorage.
     */
    private static readonly PRODUTOS_KEY = 'produtos';

    /**
     * @private
     * @static
     * @property {string} VENDAS_KEY - Chave para armazenar vendas no localStorage.
     */
    private static readonly VENDAS_KEY = 'vendas';

    // --- Métodos para Clientes ---

    /**
     * @method salvarClientes
     * @description Salva um array de objetos Cliente no localStorage, convertendo-os para JSON.
     * @param {Cliente[]} clientes - O array de clientes a ser salvo.
     */
    public static salvarClientes(clientes: Cliente[]): void {
        // Converte cada objeto Cliente para um objeto JSON puro antes de salvar
        const clientesJSON = clientes.map(cliente => cliente.toJSON());
        localStorage.setItem(DataService.CLIENTES_KEY, JSON.stringify(clientesJSON));
    }

    /**
     * @method carregarClientes
     * @description Carrega clientes do localStorage e os reconstrói como objetos Cliente.
     * @returns {Cliente[]} Um array de objetos Cliente.
     */
    public static carregarClientes(): Cliente[] {
        const data = localStorage.getItem(DataService.CLIENTES_KEY);
        if (data) {
            const clientesJSON: any[] = JSON.parse(data);
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
    public static salvarProdutos(produtos: Produto[]): void {
        const produtosJSON = produtos.map(produto => produto.toJSON());
        localStorage.setItem(DataService.PRODUTOS_KEY, JSON.stringify(produtosJSON));
    }

    /**
     * @method carregarProdutos
     * @description Carrega produtos do localStorage e os reconstrói como objetos Produto.
     * @returns {Produto[]} Um array de objetos Produto.
     */
    public static carregarProdutos(): Produto[] {
        const data = localStorage.getItem(DataService.PRODUTOS_KEY);
        if (data) {
            const produtosJSON: any[] = JSON.parse(data);
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
    public static salvarVendas(vendas: Venda[]): void {
        const vendasJSON = vendas.map(venda => venda.toJSON());
        localStorage.setItem(DataService.VENDAS_KEY, JSON.stringify(vendasJSON));
    }

    /**
     * @method carregarVendas
     * @description Carrega vendas do localStorage e as reconstrói como objetos Venda.
     * @returns {Venda[]} Um array de objetos Venda.
     */
    public static carregarVendas(): Venda[] {
        const data = localStorage.getItem(DataService.VENDAS_KEY);
        if (data) {
            const vendasJSON: any[] = JSON.parse(data);
            return vendasJSON.map(json => Venda.fromJSON(json));
        }
        return [];
    }
}