import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/model/Temas';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  temas: Temas = new Temas()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /* esse if é padrão p/ todos components pra garantir que usuario ta logado */
  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    /*['id'] é o nome do paramentro que coloquei na rota.. se fosse nome teria que ser nome */
    let id = this.route.snapshot.params['id']
    this.findByIdTema(id)
  }

  findByIdTema(id: number){ 
    this.temaService.getByIdTemas(id).subscribe((resp: Temas) => {
      this.temas = resp
    })

  }

  atualizar(){
    this.temaService.putTema(this.temas).subscribe((resp: Temas)=>{
      this.temas = resp
      alert('Tema atualizado com sucesso')
      this.router.navigate(['/tema'])

    })
  }

}
