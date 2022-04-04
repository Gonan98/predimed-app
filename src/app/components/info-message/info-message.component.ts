import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css']
})
export class InfoMessageComponent implements OnInit {

  @Input() color = '';
  @Input() message = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}