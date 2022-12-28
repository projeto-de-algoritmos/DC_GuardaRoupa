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
  movimentosRestantes = 0;
  result = 'normal';
  draggable = true;

  gavetas: any[] = [];
  colors = ['yellow', 'green', 'red', 'blue', 'gray']

  //Variável que apenas indicará de qual gaveta a roupa está sendo retirada
  gavetaInicial = 0;

  options = [3,4,5,6,7,8,9,10];
  panelOpenState = false;

  ngOnInit(): void {
    this.start();
  }

  start(){
    this.result = 'normal';
    this.draggable = true;
    
    this.iniciaRoupas();
    this.setMovements();
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
    
    if(this.gavetaInicial != gaveta && this.draggable){
      if(to.length > 0){
        if(to[to.length-1].w > from[from.length-1].w){
          this.gavetas[gaveta-1].push(from[from.length-1]);
          this.gavetas[this.gavetaInicial-1].pop();
          this.movimentosRestantes--;
        }
      }
      else{
        this.gavetas[gaveta-1].push(from[from.length-1]);
        this.gavetas[this.gavetaInicial-1].pop();
        this.movimentosRestantes--;
      }
    }
  }

  atualizaRoupas(qtd: number){
    this.numeroDeRoupas = qtd;
    this.start();
  }

  setMovements(){
    this.movimentosRestantes = 2**this.numeroDeRoupas - 1;
  }

  getCharacter(): string{
    if(this.gavetas[1].length == this.numeroDeRoupas || this.gavetas[2] == this.numeroDeRoupas){
      this.result = 'happy';
      this.draggable = false;
      return '../assets/happy_character.png'
    }
    if(this.movimentosRestantes==0){
      this.result = 'tired';
      this.draggable = false;
      return '../assets/tired_character.png'
    }
    return '../assets/character.png';
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
