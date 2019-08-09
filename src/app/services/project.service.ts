import { Project } from '../models/project.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ProjectService {
	endpoint: any = environment.endpoint;
	public token;
	public headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private _http: HttpClient, private _userService: UserService) {
		this.token = _userService.getToken();
	}

	private extractData(res: Response) {
		return res || [] || {};
	}

	getTeams(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'teams/user/created', { headers: headers }).pipe(map(this.extractData));
	}

	getProjects(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'projects/', { headers: headers }).pipe(map(this.extractData));
	}

	public addProject(token, project: Project): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		let params = JSON.stringify(project);
		return this._http.post(this.endpoint + 'projects/', params, { headers: headers }).pipe(map(this.extractData));
	}

	public editProject(project: Project, token): Observable<any> {
		let params = JSON.stringify(project);
		let headers = this.headers.set('Authorization', token);
		return this._http.put(this.endpoint + 'projects/' + project._id, params, { headers: headers }).pipe(map(this.extractData));
	}

	public deleteProject(id, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.delete(this.endpoint + 'projects/' + id, { headers: headers }).pipe(map(this.extractData));
	}

	public getProject(id, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'projects/' + id, { headers: headers }).pipe(map(this.extractData));
	}
}
