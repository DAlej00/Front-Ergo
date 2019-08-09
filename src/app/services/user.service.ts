import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public token;
	endpoint: any = environment.endpoint;
	public headers = new HttpHeaders().set('Content-Type', 'application/json');

	httpOptions = {
		headers:
			new HttpHeaders({
				'Content-Type': 'application/json'
			})
	};
	constructor(private http: HttpClient) {}

	private extractData(res: Response) {
		return res || [] || {};
	}

	public DoLogin(user): Observable<any> {
		let params = JSON.stringify(user);
		return this.http.post(this.endpoint + 'users/login', params, this.httpOptions).pipe(map(this.extractData));
	}

	public getRegistre(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this.http.get(this.endpoint + 'users/', { headers: headers });
	}

	public editUser(user: User, token): Observable<any> {
		let params = JSON.stringify(user);
		let headers = this.headers.set('Authorization', token);
		return this.http.put(this.endpoint + 'users/' + user._id, params, { headers: headers });
	}

	public deleteUser(id, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this.http.delete(this.endpoint + 'users/' + id, { headers: headers });
	}

	public Register(user): Observable<any> {
		let params = JSON.stringify(user);
		return this.http.post(this.endpoint + 'users/sign-up', params, this.httpOptions).pipe(map(this.extractData));
	}

	public getToken() {
		return localStorage.getItem('token');
	}

	public getIdentity() {
		return localStorage.getItem('identity');
	}

	public getUsers(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this.http.get(this.endpoint + 'users/all', { headers: headers }).pipe(map(this.extractData));
	}
}
