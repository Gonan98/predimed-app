import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NeuralNetwork, Neuron } from '../models/NN';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  private URL = `${environment.API_URL}/diagnostic`;
  response: NeuralNetwork;
  constructor(private http: HttpClient) {
    this.response = new NeuralNetwork();
  }

  doPrediction(inputs: Neuron[]) : Observable<any> {
    return this.http.post<any>(this.URL, inputs);
  }
}
