import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analyzet',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  onReference(){
    console.log("aaaaaaaaa");
    this.router.navigate(['/referencia']);
  }

}
