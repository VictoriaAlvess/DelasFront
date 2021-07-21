import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {

  id = environment.id
  usuario: Usuario = new Usuario()
  idUser: number 
  genero: string = 'mulher cisgênero'
  confirmarSenha: string;
  tipoUsuario: string;  

  constructor(
    private authService: AuthService, //injeção de dependencia
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/perfil'])
    }
    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }


  
  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  generos(event: any){
    this.genero = event.target.value
  }

  findByIdUser(id: number) {
      this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
        this.usuario = resp
      })
  }

  atualizar() {
    this.usuario.genero = this.genero
    // this.usuario.tipoUser = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('As senhas estão incorretas!')
      console.log(this.usuario)
    } else {
      this.authService.putUsuario(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        console.log(this.usuario)
        this.alertas.showAlertSuccess('Usuário atualizado com sucesso!, faça o login novamente.')
        environment.id = 0
        environment.token = ''
        environment.nome = ''
        environment.genero = ''
        environment.dataNasc = 0
        environment.usuario = ''
        environment.telefone =''
        environment.fotoPerfil = ''
        environment.endereco = ''
        environment.url= ''
        environment.bio = ''
        this.router.navigate(['/logar']);
      })
    }
  }

}
