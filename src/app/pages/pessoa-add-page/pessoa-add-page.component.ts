import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoa-add-page',
  templateUrl: './pessoa-add-page.component.html',
  styleUrls: ['./pessoa-add-page.component.css']
})
export class PessoaAddPageComponent {

  pessoa: any = {}

  hobies = [
    'Dançar',
    'Jogar futebol',
    'Passear'
  ]

  salvar() {
    if(this.pessoa.nome === null  || this.pessoa.nome === "") {
      alert("Formulário invalido")
    } else {

    console.log('salvando pessoa')
    console.log(this.pessoa)
    }
  }
}
