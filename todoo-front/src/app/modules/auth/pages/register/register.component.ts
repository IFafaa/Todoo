import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ts: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    })
  }


  sendForm(){
    if(this.form.invalid){
      this.ts.error('Por favor, preencha corretamente todos os campos.', 'Houve um problema')
      return
    }

    this.authService.register(this.form.value).subscribe({
      next: (res) => {
        console.log('res',res);
        this.router.navigate(['/auth/login']);
        this.ts.success('Conta criada com sucesso.', 'Sucesso')
      },
      error: (err) => {
        this.ts.error(err.message, 'Houve um problema')
      }
    })
  }


  validateExistingEmail(email: any){
    const control = this.form.get('email')
    const existingErrors = control?.errors || {};
    const existingEmailError = { existingEmail: true };
    this.authService.validEmail(email)
    .subscribe({
      next: (res) => {
        delete existingErrors['existingEmail'];
        control?.setErrors(existingErrors);
        control?.updateValueAndValidity({ onlySelf: false, emitEvent: true })
      },
      error: (err) => {
        control?.setErrors(Object.assign(existingErrors, existingEmailError));
      }
    })
  }

  validatePasswordMatch(){
    const password = this.form.get('password');
    const confirmPassword = this.form.get('confirmPassword');
    if(password && confirmPassword && password.value !== confirmPassword.value){
      confirmPassword.setErrors({ 'passwordMatch': true })
      return
    }
    if(!confirmPassword?.value){
      confirmPassword?.setErrors({ 'required': true })
      return
    }
    confirmPassword.setErrors(null);
  }
}
