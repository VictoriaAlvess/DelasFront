import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Temas } from '../model/Temas';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Temas[]>{
    return this.http.get<Temas[]>('http://localhost:8080/temas', this.token)

  }
  postTema(temas: Temas): Observable<Temas>{
    return this.http.post<Temas>('http://localhost:8080/temas', temas, this.token)
  }



}
