import { Headers, Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Repo } from "./repos.model";

@Injectable()

export class ReposService {
    public reposURL = 'https://api.github.com/repos';
    public headers = new Headers({'Content-type': 'application/json'});
    public constructor(private http: Http) { }


    public getByRepoName(full_name: string): Observable<Repo> {
        let url = `${this.reposURL}/${full_name}`;

        return this.http.get(url)
            .catch(this.handleErrors)
            .map((response: Response) => response.json() as Repo);
    }
    

    public handleErrors(error: Response) {
        console.log("Houve um erro => ", error);
        return Observable.throw(error);
    }
}