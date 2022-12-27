import { Component, Input, OnInit } from '@angular/core';

interface Roupa {
  w: number;
  color: string;
}

@Component({
  selector: 'app-gaveta',
  templateUrl: './gaveta.component.html',
  styleUrls: ['./gaveta.component.css']
})

export class GavetaComponent implements OnInit {

  @Input() numeroDeRoupas: number = 0;

  constructor() { }

  widith = 8;
  roupas: Roupa[] = [];
  colors = ['yellow', 'green', 'red', 'blue', 'gray']

  ngOnInit(): void {
    for(let i=0; i<this.numeroDeRoupas; i++){
      this.roupas.push({w: this.widith, color: this.colors[i % 5]})
      this.widith+=4;
    }
    this.roupas.reverse();
  }

}
