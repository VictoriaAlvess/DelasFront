import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.css']
})
export class PerfilEditComponent implements OnInit {

  
  usuario: Usuario = new Usuario()
  idUser: number 
  genero: string;
  confirmarSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService, //injeção de dependencia
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(['/logar'])
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
}
