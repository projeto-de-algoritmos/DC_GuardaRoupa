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

  gavetas: any[] = [];
  colors = ['yellow', 'green', 'red', 'blue', 'gray']

  //Variável que apenas indicará de qual gaveta a roupa está sendo retirada
  gavetaInicial = 0;

  options = [3,4,5,6,7,8,9,10];

  ngOnInit(): void {
    this.iniciaRoupas();
  }

  iniciaRoupas(){
    let roupas: Roupa[] = [];

    this.gavetas[0] = [];
    this.gavetas[1] = [];
    this.gavetas[2] = [];

    let widith = 8;

    for(let i=0; i<this.numeroDeRoupas; i++){
      roupas.push({w: widith, color: this.colors[i % 5]})
      widith+=4;
    }
    roupas.reverse();
    this.gavetas[0] = roupas;
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

  atualizaRoupas(qtd: number){
    this.numeroDeRoupas = qtd;
    this.iniciaRoupas();
  }

  getMovements(): number{
    return 2**this.numeroDeRoupas - 1;
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
