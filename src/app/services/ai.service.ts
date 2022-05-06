import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NNInput } from '../models/NNInput';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  
  private URL = `${environment.API_URL}/nn/predict`;
  input: NNInput[];
  outputs: number[]

  constructor(private http: HttpClient) {
    this.input = [];
    this.outputs = [];
  }

  doPrediction(inputs: number[]) : Observable<any> {
    return this.http.post<any>(this.URL, {
      inputs
    });
  }
}
