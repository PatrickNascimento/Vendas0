import { Produto } from './Produto'; // Importa a classe Produto

/**
 * @class ItemVenda
 * @description Representa um item individual dentro de uma venda, associando um Produto
 * a uma quantidade específica e calculando o subtotal para esse item.
 * Demonstra Encapsulamento e Composição (uma Venda é "composta" por ItensVenda).
 */
export class ItemVenda {
    // Propriedades privadas para encapsulamento
    private _produto: Produto;
    private _quantidade: number;
    private _subtotal: number;

    /**
     * @constructor
     * @param {Produto} produto - O objeto Produto associado a este item de venda.
     * @param {number} quantidade - A quantidade do produto neste item.
     */
    constructor(produto: Produto, quantidade: number) {
        this._produto = produto;
        this._quantidade = quantidade;
        // O subtotal é calculado automaticamente no construtor
        this._subtotal = this.calcularSubtotal();
    }

    // Métodos Getters para acessar as propriedades

    /**
     * @property {Produto} produto - Retorna o objeto Produto associado.
     */
    public get produto(): Produto {
        return this._produto;
    }

    /**
     * @property {number} quantidade - Retorna a quantidade do produto neste item.
     */
    public get quantidade(): number {
        return this._quantidade;
    }

    /**
     * @property {number} subtotal - Retorna o subtotal deste item de venda.
     */
    public get subtotal(): number {
        return this._subtotal;
    }

    // Métodos Setters com validação (Encapsulamento)

    /**
     * @property {Produto} produto - Define o produto para este item.
     */
    public set produto(produto: Produto) {
        if (!produto) {
            throw new Error('Produto não pode ser nulo.');
        }
        this._produto = produto;
        this._subtotal = this.calcularSubtotal(); // Recalcula subtotal
    }

    /**
     * @property {number} quantidade - Define a quantidade para este item.
     */
    public set quantidade(quantidade: number) {
        if (quantidade <= 0) {
            throw new Error('A quantidade deve ser um valor positivo.');
        }
        this._quantidade = quantidade;
        this._subtotal = this.calcularSubtotal(); // Recalcula subtotal
    }

    /**
     * @method calcularSubtotal
     * @description Calcula o subtotal para este item de venda (preço * quantidade).
     * @returns {number} O subtotal do item.
     */
    private calcularSubtotal(): number {
        return this._produto.preco * this._quantidade;
    }

    /**
     * @method toJSON
     * @description Converte o objeto ItemVenda para um formato JSON simples.
     * @returns {object} Um objeto literal com as propriedades do item de venda.
     */
    public toJSON(): object {
        return {
            produto: this.produto.toJSON(), // Chama o toJSON do Produto para aninhar
            quantidade: this.quantidade,
            subtotal: this.subtotal
        };
    }

    /**
     * @method fromJSON
     * @description Método estático para criar uma instância de ItemVenda a partir de um objeto JSON.
     * @param {any} json - O objeto JSON a ser convertido.
     * @returns {ItemVenda} Uma nova instância de ItemVenda.
     */
    public static fromJSON(json: any): ItemVenda {
        // Recria o objeto Produto a partir do JSON aninhado
        const produto = Produto.fromJSON(json.produto);
        return new ItemVenda(produto, json.quantidade);
    }
}