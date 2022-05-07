import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogNoReferenceComponent } from 'src/app/dialog-no-reference/dialog-no-reference.component';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-analyzet',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  porcentaje: number;

  constructor(private aiService: AiService, private router: Router,public dialog: MatDialog) {
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

  onNoReferenceDialog() {
    this.dialog.open(DialogNoReferenceComponent);
  }

}
