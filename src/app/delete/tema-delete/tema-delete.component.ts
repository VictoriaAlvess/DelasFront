import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Temas } from 'src/app/model/Temas';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  temas: Temas = new Temas()
  idTemas: number


  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService

  ) { }

  ngOnInit() 
  {if(environment.token == ''){
    this.router.navigate(['/logar'])
  }

  this.idTemas= this.route.snapshot.params['id']
  this.findByIdTemas(this.idTemas)
}

findByIdTemas(id: number){
  this.temaService.getByIdTemas(id).subscribe((resp: Temas)=>{
    this.temas = resp
  })
}

apagar(){
  this.temaService.deleteTema(this.idTemas).subscribe(()=>{
    this.alertas.showAlertSuccess('Tema apagado com sucesso!')
    this.router.navigate(['/tema'])
  })
}

}