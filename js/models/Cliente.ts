import { Pessoa } from './Pessoa'; // Importa a classe base Pessoa
import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

/**
 * @class Cliente
 * @extends Pessoa
 * @description Representa um cliente no sistema de vendas. Herda propriedades e métodos
 * da classe `Pessoa` e adiciona características específicas de um cliente.
 * Demonstra Encapsulamento, Herança e Abstração.
 */
export class Cliente extends Pessoa {
    // Propriedades específicas do Cliente (além das herdadas de Pessoa)
    private _email: string;
    private _telefone: string;

    /**
     * @constructor
     * @param {string} nome - Nome do cliente.
     * @param {string} cpf - CPF do cliente.
     * @param {string} email - Email do cliente.
     * @param {string} telefone - Telefone do cliente.
     * @param {string} [id] - ID opcional do cliente. Se não fornecido, um novo UUID é gerado.
     */
    constructor(nome: string, cpf: string, email: string, telefone: string, id?: string) {
        // Chama o construtor da superclasse `Pessoa`
        super(id || uuidv4(), nome, cpf); // Passa id (ou novo uuid), nome e cpf para Pessoa

        // Inicializa as propriedades específicas de Cliente
        this._email = email;
        this._telefone = telefone;
    }

    // Métodos Getters e Setters específicos para as propriedades de Cliente (Encapsulamento)

    /**
     * @property {string} email - Retorna o email do cliente.
     */
    public get email(): string {
        return this._email;
    }

    /**
     * @property {string} telefone - Retorna o telefone do cliente.
     */
    public get telefone(): string {
        return this._telefone;
    }

    /**
     * @property {string} email - Define o email do cliente.
     */
    public set email(email: string) {
        if (!email.includes('@')) {
            throw new Error('Email inválido.');
        }
        this._email = email;
    }

    /**
     * @property {string} telefone - Define o telefone do cliente.
     */
    public set telefone(telefone: string) {
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
    public exibirInformacoes(): string {
        return `Cliente: ${this.nome} (ID: ${this.id}, CPF: ${this.documento}, Email: ${this.email}, Telefone: ${this.telefone})`;
    }

    /**
     * @method toJSON
     * @description Converte o objeto Cliente para um formato JSON simples, útil para persistência.
     * @returns {object} Um objeto literal com as propriedades do cliente.
     */
    public toJSON(): object {
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
    public static fromJSON(json: any): Cliente {
        return new Cliente(json.nome, json.cpf, json.email, json.telefone, json.id);
    }
}