"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const Pessoa_1 = require("./Pessoa"); // Importa a classe base Pessoa
const uuid_1 = require("uuid"); // Para gerar IDs únicos
/**
 * @class Cliente
 * @extends Pessoa
 * @description Representa um cliente no sistema de vendas. Herda propriedades e métodos
 * da classe `Pessoa` e adiciona características específicas de um cliente.
 * Demonstra Encapsulamento, Herança e Abstração.
 */
class Cliente extends Pessoa_1.Pessoa {
    /**
     * @constructor
     * @param {string} nome - Nome do cliente.
     * @param {string} cpf - CPF do cliente.
     * @param {string} email - Email do cliente.
     * @param {string} telefone - Telefone do cliente.
     * @param {string} [id] - ID opcional do cliente. Se não fornecido, um novo UUID é gerado.
     */
    constructor(nome, cpf, email, telefone, id) {
        // Chama o construtor da superclasse `Pessoa`
        super(id || (0, uuid_1.v4)(), nome, cpf); // Passa id (ou novo uuid), nome e cpf para Pessoa
        // Inicializa as propriedades específicas de Cliente
        this._email = email;
        this._telefone = telefone;
    }
    // Métodos Getters e Setters específicos para as propriedades de Cliente (Encapsulamento)
    /**
     * @property {string} email - Retorna o email do cliente.
     */
    get email() {
        return this._email;
    }
    /**
     * @property {string} telefone - Retorna o telefone do cliente.
     */
    get telefone() {
        return this._telefone;
    }
    /**
     * @property {string} email - Define o email do cliente.
     */
    set email(email) {
        if (!email.includes('@')) {
            throw new Error('Email inválido.');
        }
        this._email = email;
    }
    /**
     * @property {string} telefone - Define o telefone do cliente.
     */
    set telefone(telefone) {
        if (telefone.trim() === '') {
            throw new Error('Telefone não pode ser vazio.');
        }
        this._telefone = telefone;
    }
    /**
     * @method exibirInformacoes
     * @description Implementação do método abstrato de `Pessoa`.
     * Demonstra Polimorfismo, pois `Cliente` exibe suas informações
     * de uma maneira específica, diferente de outras possíveis subclasses de `Pessoa`.
     * @returns {string} Uma string formatada com as informações do cliente.
     */
    exibirInformacoes() {
        return `Cliente: ${this.nome} (ID: ${this.id}, CPF: ${this.documento}, Email: ${this.email}, Telefone: ${this.telefone})`;
    }
    /**
     * @method toJSON
     * @description Converte o objeto Cliente para um formato JSON simples, útil para persistência.
     * @returns {object} Um objeto literal com as propriedades do cliente.
     */
    toJSON() {
        return {
            id: this.id,
            nome: this.nome,
            cpf: this.documento, // 'documento' é o CPF neste caso
            email: this.email,
            telefone: this.telefone
        };
    }
    /**
     * @method fromJSON
     * @description Método estático para criar uma instância de Cliente a partir de um objeto JSON.
     * @param {any} json - O objeto JSON a ser convertido.
     * @returns {Cliente} Uma nova instância de Cliente.
     */
    static fromJSON(json) {
        return new Cliente(json.nome, json.cpf, json.email, json.telefone, json.id);
    }
}
exports.Cliente = Cliente;
