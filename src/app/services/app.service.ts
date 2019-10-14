import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) {}

  getData(url): Observable<any> {
    return this.httpClient.get(url);
  }
}
