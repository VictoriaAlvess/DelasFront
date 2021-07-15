import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Temas } from '../model/Temas';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  id = environment.id
  nome = environment.nome
  fotoPerfil = environment.fotoPerfil
   

  usuario: Usuario = new Usuario()
  idUser = environment.id

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Temas = new Temas()
  listaTemas: Temas[]
  idTema: number
  

  constructor(
    private router: Router,
    private temaService: TemaService,
    private authService: AuthService,
    private postagemService: PostagemService

  ) { }

  ngOnInit() {

    window.scroll(0,0)
    this.sidebar()

    if(environment.token == ''){
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/logar'])
    }

    
    this.temaService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
    //this.getByIdTemas()
    //console.log(environment)
  }

  sidebar(){
    let sidebar = document.querySelector('.sidebar');
    let closeBtn = document.querySelector('#btn');
    let searchBtn = document.querySelector('.bx-search');

    closeBtn?.addEventListener('click', ()=>{
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    searchBtn?.addEventListener('click', ()=>{
      sidebar?.classList.toggle('open');
      menuBtnChange();
    });

    function menuBtnChange(){
      if(sidebar?.classList.contains('open')){
        closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Temas[]) =>{
      this.listaTemas = resp
    });
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
      this.listaPostagens = resp
    });
  }

  getByIdTemas(){
    this.temaService.getByIdTemas(this.idTema).subscribe((resp: Temas)=>{
      this.tema = resp
    });
  }

  getByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: Usuario)=>{
      this.usuario = resp
    });
  }

  findByIdTemas(){
    this.temaService.getByIdTemas(this.idTema).subscribe((resp: Temas)=>{
      this.tema = resp
    });
  }
  

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:Usuario)=>{
      this.usuario = resp
    });
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.temas = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
       this.postagem = resp
       alert('Postagem realizada com sucesso! ✔️')
       this.postagem = new Postagem()
       this.getAllPostagens()
     })

    //console.log(this.postagem)

  }

  cancelar(){
    
  }

}
