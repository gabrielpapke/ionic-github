import { Headers, Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { User } from "./users.model";
// import { Repo } from "../../repos/shared/repo.model";

@Injectable()

export class UsersService {
    public usersURL = 'https://api.github.com/users';
    public headers = new Headers({'Content-type': 'application/json'});
    public constructor(private http: Http) { }

    public getByUsername(username: string): Observable<User> {
        let url = `${this.usersURL}/${username}`;

        return this.http.get(url)
            .catch(this.handleErrors)
            .map((response: Response) => response.json() as User);
    }

    // public getPopularRepos(username:string): Observable<Repo[]> {
    //     let url = `${this.usersURL}/${username}/repos`;
        
    //     return this.http.get(url)
    //         .catch(this.handleErrors)
    //         .map((response: Response) => response.json() as Repo[]);
    // }
    

    public handleErrors(error: Response) {
        console.log("Houve um erro => ", error);
        return Observable.throw(error);
    }
}