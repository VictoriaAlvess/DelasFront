import { Postagem } from "./Postagem";

export class Usuario{
    public id: number;
    public nome: string;
    public genero: string;
    public dataNasc: Date;
    public email: string;
    public senha: string;
    public usuario: string;
    public telefone: string;
    public fotoPerfil: string;
    public endereco: string;
    public url: string;
    public bio: string;
    public tipoUser: string; //mais possibilidades(empreendedora, padrão, admin)

    public postagens: Postagem[];
}