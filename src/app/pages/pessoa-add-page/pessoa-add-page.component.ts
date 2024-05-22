import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pessoa } from 'src/app/model/pessoa.model';
import { PessoaService } from 'src/app/services/pessoa.service';
import { createPasswordStrengthValidator, createDateRangeValidator, createCPFValidator, createCNPJValidator
 } from 'src/app/validators';


// import { validateCpf } from 'src/app/validadores2';

@Component({
  selector: 'app-pessoa-add-page',
  templateUrl: './pessoa-add-page.component.html',
  styleUrls: ['./pessoa-add-page.component.css']
})
export class PessoaAddPageComponent implements OnInit {
  isFormError: boolean = false;
  pessoa: any = {};
  hobies = [
    'Dançar',
    'Jogar futebol',
    'Passear'
  ];
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: PessoaService, private activeRouter: ActivatedRoute) {
    this.formGroup = this.formBuilder.group({
      id: [null],
      nome: [''],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      hobie: [''],
      password: [''],
      startAt: [],
      endAt: [],
      cpf: ['', Validators.compose([Validators.required, createCPFValidator()]) ],
      cnpj: ['', Validators.compose([Validators.required, createCNPJValidator()]) ]
    }, {
      validators: [ createDateRangeValidator]
    });
  }

  ngOnInit(): void {
    const id = this.activeRouter.snapshot.paramMap.get('id');
    if (id) {
      this.formGroup.patchValue(this.service.buscar(id));
    }
  }

  salvar() {
    if (this.formGroup.valid) {
      if (this.formGroup.value.id) {
        this.service.editar(this.formToValue(this.formGroup));
      } else {
        this.service.salvar(this.formToValue(this.formGroup)).subscribe(p => {
          alert('pessoa salva com sucesso');
        });
      }
    } else {
      this.isFormError = true; // Defina isFormError como true para indicar que há um erro no formulário
      alert('Formulário Inválido');
    }
  }

  isError(control: 'email' | 'nome' | 'hobie' | 'cpf' | 'cnpj', validator: string) {
    return this.formGroup.controls[control].getError(validator) && this.isFormError;
  }

  formToValue(form: FormGroup): Pessoa {
    return {
      id: form.value.id!,
      nome: form.value.nome!,
      gender: 'MALE',
      status: 'ACTIVE',
      email: form.value.email!,
      hobie: form.value.hobie!
    };
  }
}
