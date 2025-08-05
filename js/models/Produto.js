"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produto = void 0;
const uuid_1 = require("uuid"); // Para gerar IDs únicos
/**
 * @class Produto
 * @description Representa um produto disponível para venda.
 * Demonstra Encapsulamento e Abstração.
 */
class Produto {
    /**
     * @constructor
     * @param {string} nome - Nome do produto.
     * @param {number} preco - Preço unitário do produto.
     * @param {number} estoque - Quantidade em estoque do produto.
     * @param {string} [id] - ID opcional do produto. Se não fornecido, um novo UUID é gerado.
     */
    constructor(nome, preco, estoque, id) {
        this._id = id || (0, uuid_1.v4)(); // Gera um ID único se nenhum for fornecido
        this._nome = nome;
        this._preco = preco;
        this._estoque = estoque;
    }
    // Métodos Getters para acessar as propriedades de forma controlada (Encapsulamento).
    // Isso evita o acesso direto e a modificação indevida.
    /**
     * @property {string} id - Retorna o ID do produto.
     */
    get id() {
        return this._id;
    }
    /**
     * @property {string} nome - Retorna o nome do produto.
     */
    get nome() {
        return this._nome;
    }
    /**
     * @property {number} preco - Retorna o preço unitário do produto.
     */
    get preco() {
        return this._preco;
    }
    /**
     * @property {number} estoque - Retorna a quantidade em estoque do produto.
     */
    get estoque() {
        return this._estoque;
    }
    // Métodos Setters para modificar as propriedades (Encapsulamento).
    // Podem incluir lógica de validação.
    /**
     * @property {string} nome - Define o nome do produto.
     */
    set nome(nome) {
        if (nome.trim() === '') {
            throw new Error('O nome do produto não pode ser vazio.');
        }
        this._nome = nome;
    }
    /**
     * @property {number} preco - Define o preço do produto.
     */
    set preco(preco) {
        if (preco <= 0) {
            throw new Error('O preço deve ser um valor positivo.');
        }
        this._preco = preco;
    }
    /**
     * @property {number} estoque - Define a quantidade em estoque do produto.
     */
    set estoque(estoque) {
        if (estoque < 0) {
            throw new Error('O estoque não pode ser negativo.');
        }
        this._estoque = estoque;
    }
    /**
     * @method toJSON
     * @description Converte o objeto Produto para um formato JSON simples.
     * @returns {object} Um objeto literal com as propriedades do produto.
     */
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            preco: this.preco,
            estoque: this.estoque
        };
    }
    /**
     * @method fromJSON
     * @description Método estático para criar uma instância de Produto a partir de um objeto JSON.
     * @param {any} json - O objeto JSON a ser convertido.
     * @returns {Produto} Uma nova instância de Produto.
     */
    static fromJSON(json) {
        return new Produto(json.nome, json.preco, json.estoque, json.id);
    }
}
exports.Produto = Produto;
