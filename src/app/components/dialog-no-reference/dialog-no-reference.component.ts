import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReferredService } from 'src/app/services/referred.service';

@Component({
  selector: 'app-dialog-no-reference',
  templateUrl: './dialog-no-reference.component.html',
  styleUrls: ['./dialog-no-reference.component.css']
})
export class DialogNoReferenceComponent implements OnInit {

  constructor(private router: Router, private referredService: ReferredService) { }

  ngOnInit(): void {
  }
  onReference() {
    this.router.navigate(['/referencia']);
  }

  noReference() {
    this.referredService.setReferredSelected(false)
    console.log(this.referredService.getReferredSelected())
    this.router.navigate(['/referencia']);
  }

}
