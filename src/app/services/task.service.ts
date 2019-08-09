import { Task } from './../models/task.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
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

	public addTask(task: Task, token): Observable<any> {
		let params = JSON.stringify(task);
		let headers = this.headers.set('Authorization', token);
		return this.http.post(this.endpoint + 'tasks/', params, { headers: headers }).pipe(map(this.extractData));
	}

	public getProjectTasks(projectId, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this.http.get(this.endpoint + 'tasks/project/' + projectId, { headers: headers }).pipe(map(this.extractData));
	}

	public deleteTask(taskId, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		return this.http.delete(this.endpoint + 'tasks/' + taskId, { headers: headers }).pipe(map(this.extractData));
	}

	public editTask(task: Task, token): Observable<any> {
		let headers = this.headers.set('Authorization', token);
		let params = JSON.stringify(task);
		return this.http.put(this.endpoint + 'tasks/' + task._id, params, { headers: headers }).pipe(map(this.extractData));
	}
}
