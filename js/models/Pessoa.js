"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
/**
 * @class Pessoa
 * @description Classe base que representa uma pessoa genérica no sistema.
 * Demonstra o conceito de Herança, onde outras classes podem herdar
 * propriedades e comportamentos comuns.
 */
class Pessoa {
    /**
     * @constructor
     * @param {string} id - Identificador único da pessoa.
     * @param {string} nome - Nome da pessoa.
     * @param {string} documento - Documento de identificação da pessoa (e.g., CPF).
     */
    constructor(id, nome, documento) {
        this._id = id;
        this._nome = nome;
        this._documento = documento;
    }
    // Métodos Getters para acessar as propriedades de forma controlada (Encapsulamento).
    // O uso de 'get' permite acessar como `pessoa.id` em vez de `pessoa.getId()`.
    /**
     * @property {string} id - Retorna o ID da pessoa.
     */
    get id() {
        return this._id;
    }
    /**
     * @property {string} nome - Retorna o nome da pessoa.
     */
    get nome() {
        return this._nome;
    }
    /**
     * @property {string} documento - Retorna o documento da pessoa.
     */
    get documento() {
        return this._documento;
    }
    // Métodos Setters para modificar as propriedades (exemplo de Encapsulamento).
    // Permitem adicionar lógica de validação antes de alterar o valor.
    /**
     * @property {string} nome - Define o nome da pessoa.
     */
    set nome(nome) {
        if (nome.trim() === '') {
            throw new Error('O nome não pode ser vazio.');
        }
        this._nome = nome;
    }
    /**
     * @property {string} documento - Define o documento da pessoa.
     */
    set documento(documento) {
        if (documento.trim() === '') {
            throw new Error('O documento não pode ser vazio.');
        }
        this._documento = documento;
    }
}
exports.Pessoa = Pessoa;
