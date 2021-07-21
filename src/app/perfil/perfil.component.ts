import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  listaPostagens: Postagem[]
  
  id = environment.id

  usuario: Usuario = new Usuario()
  genero: string;
  confirmarSenha: string;
  tipoUsuario: string;
  idUser: number 
  

  constructor(
    private authService: AuthService, //injeção de dependencia
    private route: ActivatedRoute,
    private router: Router,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/logar'])
    }

    this.getAllPostagens()

   this.idUser = this.route.snapshot.params['id']
   this.findByIdUser(this.idUser)
   this.getAllPostagens()
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
}

getAllPostagens(){
  this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) =>{
    this.listaPostagens = resp
  })
}

  
}
