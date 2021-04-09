import { StartConditions } from './start-conditions';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

 
@Injectable()
export class DataService {
 
    private url = "/api/";

    constructor(private http: HttpClient) {
    }

    simulate(startMatrix: Array<Array<number>>) {
        return this.http.post(this.url + "simulate", new StartConditions(startMatrix, "someRule"));
    }

    simulate126(startMatrix: Array<Array<number>>) {
        return this.http.post(this.url + "simulate126", new StartConditions(startMatrix, "someRule"));
    }
}