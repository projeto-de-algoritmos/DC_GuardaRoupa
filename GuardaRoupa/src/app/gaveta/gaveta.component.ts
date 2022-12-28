import { Component, Input, OnInit } from '@angular/core';
import { Roupa } from '../interfaces/roupa.interface';

@Component({
  selector: 'app-gaveta',
  templateUrl: './gaveta.component.html',
  styleUrls: ['./gaveta.component.css']
})

export class GavetaComponent implements OnInit {

  @Input() roupas: Roupa[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onDrop(event: any) {
    event.preventDefault();
    console.log(event);
  }
  
  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

}
