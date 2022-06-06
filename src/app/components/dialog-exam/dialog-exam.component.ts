import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-exam',
  templateUrl: './dialog-exam.component.html',
  styleUrls: ['./dialog-exam.component.css']
})
export class DialogExamComponent implements OnInit {
  exam: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
