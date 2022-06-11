import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Disease } from '../models/Disease';
import { NeuralNetwork, Neuron } from '../models/NN';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {
  private URL = `${environment.API_URL}/diagnostic`;
  response: NeuralNetwork;
  disease: Disease;

  constructor(private http: HttpClient) {
    this.response = new NeuralNetwork();
    this.disease = new Disease();
  }

  doPrediction(inputs: Neuron[]) : Observable<any> {
    return this.http.post<any>(this.URL, inputs);
  }
}
