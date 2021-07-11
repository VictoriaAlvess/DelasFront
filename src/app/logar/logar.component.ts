import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.component.html',
  styleUrls: ['./logar.component.css']
})

export class LogarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  usuario: Usuario = new Usuario()
  genero: string;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService : AuthService, //injeção de dependencia
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  generos(event: any){
    this.genero = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.usuario.genero = this.genero
    this.usuario.tipoUser = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha){
      alert('As senhas estão incorretas!')
      console.log(this.usuario)
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=>{
        this.usuario = resp
        console.log(this.usuario)
        this.router.navigate(['/logar'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.usuario = this.userLogin.usuario     
      environment.id = this.userLogin.id

      this.router.navigate(['/feed'])
    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos!')
      }
    })
  }



}
