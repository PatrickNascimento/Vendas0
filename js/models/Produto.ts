import { v4 as uuidv4 } from 'uuid'; // Para gerar IDs únicos

/**
 * @class Produto
 * @description Representa um produto disponível para venda.
 * Demonstra Encapsulamento e Abstração.
 */
export class Produto {
    // Propriedades (atributos) do Produto.
    // O uso de '_' prefixando a propriedade indica que ela é "privada" ou interna à classe (convenção TS/JS).
    // No TypeScript, usamos 'private' para enforcecer o encapsulamento.
    private _id: string;
    private _nome: string;
    private _preco: number;
    private _estoque: number;

    /**
     * @constructor
     * @param {string} nome - Nome do produto.
     * @param {number} preco - Preço unitário do produto.
     * @param {number} estoque - Quantidade em estoque do produto.
     * @param {string} [id] - ID opcional do produto. Se não fornecido, um novo UUID é gerado.
     */
    constructor(nome: string, preco: number, estoque: number, id?: string) {
        this._id = id || uuidv4(); // Gera um ID único se nenhum for fornecido
        this._nome = nome;
        this._preco = preco;
        this._estoque = estoque;
    }

    // Métodos Getters para acessar as propriedades de forma controlada (Encapsulamento).
    // Isso evita o acesso direto e a modificação indevida.

    /**
     * @property {string} id - Retorna o ID do produto.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * @property {string} nome - Retorna o nome do produto.
     */
    public get nome(): string {
        return this._nome;
    }

    /**
     * @property {number} preco - Retorna o preço unitário do produto.
     */
    public get preco(): number {
        return this._preco;
    }

    /**
     * @property {number} estoque - Retorna a quantidade em estoque do produto.
     */
    public get estoque(): number {
        return this._estoque;
    }

    // Métodos Setters para modificar as propriedades (Encapsulamento).
    // Podem incluir lógica de validação.

    /**
     * @property {string} nome - Define o nome do produto.
     */
    public set nome(nome: string) {
        if (nome.trim() === '') {
            throw new Error('O nome do produto não pode ser vazio.');
        }
        this._nome = nome;
    }

    /**
     * @property {number} preco - Define o preço do produto.
     */
    public set preco(preco: number) {
        if (preco <= 0) {
            throw new Error('O preço deve ser um valor positivo.');
        }
        this._preco = preco;
    }

    /**
     * @property {number} estoque - Define a quantidade em estoque do produto.
     */
    public set estoque(estoque: number) {
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
    public toJSON(): object {
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
    public static fromJSON(json: any): Produto {
        return new Produto(json.nome, json.preco, json.estoque, json.id);
    }
}