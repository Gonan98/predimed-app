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

  generateMotive() {
    return `
    El paciente cuenta con un ${this.response.maxOutput.value * 100}% de probabilidad de presentar un presunto
    caso de ${this.disease.name}, por ello es que se requiere su inmediata transferencia a un centro de salud
    con mayor jerarquía para su atención oportuna.
    `
  }

  doPrediction(inputs: Neuron[]) : Observable<any> {
    return this.http.post<any>(this.URL, inputs);
  }
}
