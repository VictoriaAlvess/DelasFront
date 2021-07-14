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

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization',environment.token)
    }
  }

  getAllTema(): Observable<Temas[]>{
    return this.http.get<Temas[]>('https://delasbackend.herokuapp.com/temas', this.token)

  }
  postTema(temas: Temas): Observable<Temas>{
    return this.http.post<Temas>('https://delasbackend.herokuapp.com/temas', temas, this.token)
  }

  getByIdTemas(id: number): Observable<Temas>{
    return this.http.get<Temas>(`https://delasbackend.herokuapp.com/temas/${id}`, this.token)
  }

  putTema(tema: Temas): Observable<Temas>{
    return this.http.put<Temas>('https://delasbackend.herokuapp.com/temas', tema, this.token)
  }

  deleteTema(id: number) { /* por ser parametro a gente passa ${id} entre crase*/ 
  return this.http.delete(`https://delasbackend.herokuapp.com/temas/${id}`, this.token)

}

}
