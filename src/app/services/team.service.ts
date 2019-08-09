import { Team } from './../models/team.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, identity } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamService {
	endpoint: any = environment.endpoint;
	public token;
	public headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private _http: HttpClient, private _userService: UserService) {
		this.token = _userService.getToken();
	}

	private extractData(res: Response) {
		return res || [] || {};
	}

	public editTeam(team: Team, token): Observable<any> {
		let params = JSON.stringify(team);
		let headers = this.headers.set('Authorization', token);
		return this._http.put(this.endpoint + 'teams/' + team._id, params, { headers: headers }).pipe(map(this.extractData));
	}

	public deleteTeam(id, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.delete(this.endpoint + 'teams/' + id, { headers: headers }).pipe(map(this.extractData));
	}

	public addTeam(token, team: Team): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		let params = JSON.stringify(team);
		return this._http.post(this.endpoint + 'teams/', params, { headers: headers }).pipe(map(this.extractData));
	}

	public getTeams(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'teams/', { headers: headers }).pipe(map(this.extractData));
	}

	public getUserTeams(token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.get(this.endpoint + 'teams/user', { headers: headers }).pipe(map(this.extractData));
	}

	public addMember(token, team: Team, idUser, idSupervisor): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.put(this.endpoint + 'teams/' + team._id + '/integrant/' + idUser + '/supervisor/' + idSupervisor, { headers: headers }).pipe(map(this.extractData));
	}

	public deleteMember(token, team: Team, idUser, idSupervisor): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this._http.delete(this.endpoint + 'teams/' + team._id + '/integrant/' + idUser + '/supervisor/' + idSupervisor, { headers: headers }).pipe(map(this.extractData));
	}
}
