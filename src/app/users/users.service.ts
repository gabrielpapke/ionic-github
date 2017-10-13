import { Headers, Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { User } from "./users.model";
import { Repo } from "../repos/repos.model";

@Injectable()

export class UsersService {
    public usersURL = 'https://api.github.com/users';
    public headers = new Headers({'Content-type': 'application/json'});
    public constructor(private http: Http) { }
    public currentPage = 1;

    public getByUsername(username: string): Observable<User> {
        let url = `${this.usersURL}/${username}`;
        return this.http.get(url)
            .catch(this.handleErrors)
            .map((response: Response) => response.json() as User);
    }

    public getPopularRepos(username:string, params?: object ): Observable<Repo[]> {
        let url = `${this.usersURL}/${username}/repos`;

        if (!params)
            params = {
                page: 1,
                per_page: 10
            }

        return this.http.get(url, { params: params})
            .catch(this.handleErrors)
            .map((response: Response) => response.json()); 
    }

    public handleErrors(error: Response) {
        console.log("Houve um erro => ", error);
        return Observable.throw(error);
    }
}