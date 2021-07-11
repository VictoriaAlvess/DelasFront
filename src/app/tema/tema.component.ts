import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';
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
    private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
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
    alert('Tema cadastrado com sucesso!')
    this.temas = new Temas()
  })
}
}
