import { Component, OnInit } from '@angular/core';
import { Roupa } from './interfaces/roupa.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() {}

  numeroDeRoupas = 3

  widith = 8;
  roupas: Roupa[] = [];
  colors = ['yellow', 'green', 'red', 'blue', 'gray']

  gavetas: any[] = [];

  //Variável que apenas indicará de qual gaveta a roupa está sendo retirada
  gavetaInicial = 0;

  ngOnInit(): void {
    this.iniciaRoupas();
    this.gavetas[0] = this.roupas;
  }

  iniciaRoupas(){
    this.gavetas[0] = [];
    this.gavetas[1] = [];
    this.gavetas[2] = [];

    for(let i=0; i<this.numeroDeRoupas; i++){
      this.roupas.push({w: this.widith, color: this.colors[i % 5]})
      this.widith+=4;
    }
    this.roupas.reverse();
  }

  hanoi(gaveta: number){
    let from = this.gavetas[this.gavetaInicial-1];
    let to = this.gavetas[gaveta-1];
    
    if(this.gavetaInicial != gaveta){
      if(to.length > 0){
        if(to[to.length-1].w > from[from.length-1].w){
          this.gavetas[gaveta-1].push(from[from.length-1]);
          this.gavetas[this.gavetaInicial-1].pop();
        }
      }
      else{
        this.gavetas[gaveta-1].push(from[from.length-1]);
        this.gavetas[this.gavetaInicial-1].pop();
      }
    }
  }

  onDrop(event: any, gaveta: number) {
    event.preventDefault();
    this.hanoi(gaveta);
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDragStart(gaveta: number){
    this.gavetaInicial = gaveta;
  }
  
}
