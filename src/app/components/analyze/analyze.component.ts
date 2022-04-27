import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-analyzet',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  porcentaje: number;

  constructor(private aiService: AiService, private router: Router) {
    const arr = Object.values(this.aiService.outputs);
    console.log(arr);
    this.porcentaje = Math.max(...arr) * 100;
  }

  ngOnInit(): void {
  }

  onReference() {
    this.router.navigate(['/referencia']);
  }

  goBack() {
    this.router.navigate(['..']);
  }

}
