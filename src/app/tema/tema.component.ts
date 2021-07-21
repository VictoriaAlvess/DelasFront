import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  temas: Temas = new Temas()
  listaTemas: Temas[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){


    window.scroll(0,0)

    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/logar'])
    }
    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Temas[]) => {
      this.listaTemas = resp
    })
  }
  cadastrar(){
    this.temaService.postTema(this.temas).subscribe((resp: Temas)=>{
    this.temas = resp
    this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
    this.findAllTemas()
    this.temas = new Temas()
  })
}
}