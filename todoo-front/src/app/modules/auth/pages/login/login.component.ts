import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenService } from './../../../../core/services/token.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private ts: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm()
    if(this.tokenService.getToken() !== null){
      this.router.navigate(['/tasks']);
    }
  }

  createForm(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  sendForm(){
    if(this.form.invalid){
      this.ts.error('Por favor, preencha corretamente todos os campos.', 'Houve um problema');
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        this.tokenService.setToken(res.accessToken);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.ts.error('E-mail ou senha estão incorretos.', 'Houve um problema');
      }
    })
  }

}
