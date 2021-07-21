import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private  http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://delasbackend.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://delasbackend.herokuapp.com/usuarios/cadastrar', usuario)
    
  }
  
  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://delasbackend.herokuapp.com/usuarios/${id}`, this.token)
  }

  putUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://delasbackend.herokuapp.com/usuarios/alterar', usuario, this.token)
  }

  adm(){
    let ok : boolean = false;
    if(environment.tipoUser == 'adm'){
      ok = true
    }
    return ok;
  }
  
}
