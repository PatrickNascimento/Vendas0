import { Cliente } from './Cliente';
import { ItemVenda } from './ItemVenda';
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

/**
 * @class Venda
 * @description Representa uma transação de venda completa, associando um Cliente,
 * uma data e uma coleção de ItensVenda. Calcula o valor total da venda.
 * Demonstra Abstração, Encapsulamento e Composição (contém Cliente e ItensVenda).
 */
export class Venda {
    // Propriedades privadas para encapsulamento
    private _id: string;
    private _cliente: Cliente;
    private _data: Date;
    private _itens: ItemVenda[]; // Array de objetos ItemVenda
    private _total: number;

    /**
     * @constructor
     * @param {Cliente} cliente - O objeto Cliente associado a esta venda.
     * @param {ItemVenda[]} itens - Um array de objetos ItemVenda que compõem a venda.
     * @param {string} [id] - ID opcional da venda. Se não fornecido, um novo UUID é gerado.
     * @param {Date} [data] - Data opcional da venda. Se não fornecida, a data atual é usada.
     */
    constructor(cliente: Cliente, itens: ItemVenda[], id?: string, data?: Date) {
        this._id = id || uuidv4(); // Gera um ID único se nenhum for fornecido
        this._cliente = cliente;
        this._data = data || new Date(); // Usa a data atual se nenhuma for fornecida
        this._itens = itens;
        this._total = this.calcularTotal(); // O total é calculado automaticamente
    }

    // Métodos Getters para acessar as propriedades

    /**
     * @property {string} id - Retorna o ID da venda.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * @property {Cliente} cliente - Retorna o objeto Cliente da venda.
     */
    public get cliente(): Cliente {
        return this._cliente;
    }

    /**
     * @property {Date} data - Retorna a data da venda.
     */
    public get data(): Date {
        return this._data;
    }

    /**
     * @property {ItemVenda[]} itens - Retorna o array de ItensVenda desta venda.
     */
    public get itens(): ItemVenda[] {
        return this._itens;
    }

    /**
     * @property {number} total - Retorna o valor total da venda.
     */
    public get total(): number {
        return this._total;
    }

    // Métodos Setters com validação (Encapsulamento)

    /**
     * @property {Cliente} cliente - Define o cliente para esta venda.
     */
    public set cliente(cliente: Cliente) {
        if (!cliente) {
            throw new Error('Cliente não pode ser nulo.');
        }
        this._cliente = cliente;
    }

    /**
     * @property {ItemVenda[]} itens - Define os itens para esta venda.
     * Recalcula o total ao alterar os itens.
     */
    public set itens(itens: ItemVenda[]) {
        if (!itens || itens.length === 0) {
            throw new Error('A venda deve ter pelo menos um item.');
        }
        this._itens = itens;
        this._total = this.calcularTotal(); // Recalcula o total
    }

    /**
     * @method adicionarItem
     * @description Adiciona um novo item à venda e recalcula o total.
     * @param {ItemVenda} item - O ItemVenda a ser adicionado.
     */
    public adicionarItem(item: ItemVenda): void {
        this._itens.push(item);
        this._total = this.calcularTotal();
    }

    /**
     * @method removerItem
     * @description Remove um item da venda pelo seu índice e recalcula o total.
     * @param {number} index - O índice do item a ser removido no array de itens.
     * @returns {boolean} True se o item foi removido, false caso contrário.
     */
    public removerItem(index: number): boolean {
        if (index >= 0 && index < this._itens.length) {
            this._itens.splice(index, 1);
            this._total = this.calcularTotal();
            return true;
        }
        return false;
    }

    /**
     * @method calcularTotal
     * @description Calcula o valor total da venda somando os subtotais de todos os itens.
     * @returns {number} O valor total da venda.
     */
    private calcularTotal(): number {
        return this._itens.reduce((sum, item) => sum + item.subtotal, 0);
    }

    /**
     * @method toJSON
     * @description Converte o objeto Venda para um formato JSON, ideal para persistência.
     * Inclui o cliente e os itens da venda, chamando seus respectivos toJSON().
     * @returns {object} Um objeto literal com as propriedades da venda.
     */
    public toJSON(): object {
        return {
            id: this.id,
            cliente: this.cliente.toJSON(), // Converte o cliente para JSON
            data: this.data.toISOString(),  // Converte a data para string ISO
            itens: this.itens.map(item => item.toJSON()), // Converte cada item para JSON
            total: this.total
        };
    }

    /**
     * @method fromJSON
     * @description Método estático para criar uma instância de Venda a partir de um objeto JSON.
     * É crucial para reconstruir objetos complexos a partir de dados salvos.
     * @param {any} json - O objeto JSON a ser convertido.
     * @returns {Venda} Uma nova instância de Venda.
     */
    public static fromJSON(json: any): Venda {
        const cliente = Cliente.fromJSON(json.cliente);
        const itens = json.itens.map((itemJson: any) => ItemVenda.fromJSON(itemJson));
        const data = new Date(json.data);
        return new Venda(cliente, itens, json.id, data);
    }
}