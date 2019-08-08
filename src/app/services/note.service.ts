import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notes } from '../models/notes.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  endpoint : any = environment.endpoint;

  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http:HttpClient){}

  private extractData(res:Response){
    return res || [] || {};
  }

  public getNotes(token): Observable<any>{
    let headers = this.headers.set('Authorization', token);
    return this._http.get(this.endpoint + 'notes/', {headers: headers}).pipe(map(this.extractData));
}

public createNotes(notes: Notes, token): Observable<any>{
    let params = JSON.stringify(notes);
    let headers = this.headers.set('Authorization', token);
    return this._http.post(this.endpoint + 'notes/', params, {headers: headers}).pipe(map(this.extractData))
}

public editNotes(notes: Notes, token): Observable<any>{
    let params = JSON.stringify(notes);
    let headers = this.headers.set('Authorization', token);
    return this._http.put(this.endpoint + 'notes/' + notes._id, params, {headers: headers}).pipe(map(this.extractData));
}

public deleteNotes(notes, token): Observable<any>{
    let headers = this.headers.set('Authorization', token);
    return this._http.delete(this.endpoint + 'notes/' + notes, {headers: headers}).pipe(map(this.extractData));
}


}

