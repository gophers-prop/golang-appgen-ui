import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BoilerPlate{
    constructor(private http:HttpClient){}
    getBoilerPlate(request){
        var url = environment.serverUrl+"/simpleapp"
        return this.http.post(url,request,{responseType: 'arraybuffer'});
    }
}