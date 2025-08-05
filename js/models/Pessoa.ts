/**
 * @class Pessoa
 * @description Classe base que representa uma pessoa genérica no sistema.
 * Demonstra o conceito de Herança, onde outras classes podem herdar
 * propriedades e comportamentos comuns.
 */
export abstract class Pessoa { // 'abstract' impede que 'Pessoa' seja instanciada diretamente
    // Propriedades (atributos) da classe Pessoa.
    // 'protected' permite que classes filhas acessem essas propriedades.
    protected _id: string;
    protected _nome: string;
    protected _documento: string; // Ex: CPF para Cliente, CNPJ para Fornecedor (se existisse)

    /**
     * @constructor
     * @param {string} id - Identificador único da pessoa.
     * @param {string} nome - Nome da pessoa.
     * @param {string} documento - Documento de identificação da pessoa (e.g., CPF).
     */
    constructor(id: string, nome: string, documento: string) {
        this._id = id;
        this._nome = nome;
        this._documento = documento;
    }

    // Métodos Getters para acessar as propriedades de forma controlada (Encapsulamento).
    // O uso de 'get' permite acessar como `pessoa.id` em vez de `pessoa.getId()`.

    /**
     * @property {string} id - Retorna o ID da pessoa.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * @property {string} nome - Retorna o nome da pessoa.
     */
    public get nome(): string {
        return this._nome;
    }

    /**
     * @property {string} documento - Retorna o documento da pessoa.
     */
    public get documento(): string {
        return this._documento;
    }

    // Métodos Setters para modificar as propriedades (exemplo de Encapsulamento).
    // Permitem adicionar lógica de validação antes de alterar o valor.

    /**
     * @property {string} nome - Define o nome da pessoa.
     */
    public set nome(nome: string) {
        if (nome.trim() === '') {
            throw new Error('O nome não pode ser vazio.');
        }
        this._nome = nome;
    }

    /**
     * @property {string} documento - Define o documento da pessoa.
     */
    public set documento(documento: string) {
        if (documento.trim() === '') {
            throw new Error('O documento não pode ser vazio.');
        }
        this._documento = documento;
    }

    /**
     * @method exibirInformacoes
     * @description Método abstrato para ser implementado pelas classes filhas,
     * demonstrando Polimorfismo. Cada subclasse pode exibir informações
     * de uma maneira específica.
     */
    public abstract exibirInformacoes(): string;
}