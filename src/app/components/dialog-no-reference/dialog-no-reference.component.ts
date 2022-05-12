import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-no-reference',
  templateUrl: './dialog-no-reference.component.html',
  styleUrls: ['./dialog-no-reference.component.css']
})
export class DialogNoReferenceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onReference() {
    this.router.navigate(['/referencia']);
  }

}
