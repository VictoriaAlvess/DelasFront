import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  
  id = environment.id

  usuario: Usuario = new Usuario()
  genero: string;
  confirmarSenha: string;
  tipoUsuario: string;
  idUser: number 
  

  constructor(
    private authService: AuthService, //injeção de dependencia
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)


   this.idUser = this.route.snapshot.params['id']
   this.findByIdUser(this.idUser)
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
}

  
}
