import { Temas } from "./Temas";
import { Usuario } from "./Usuario";

export class Postagem {
    public id: number;
    public fotoPost: string;
    public curtidas: number;
    public textoPost: string;
    public dataPost: Date;
    public usuarios: Usuario; //duvida relacionamento
    public temas: Temas;

}