import { finalize } from 'rxjs';
import { TokenService } from './../../../../core/services/token.service';
import { UserService } from './../../../../core/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-config-change-email',
  templateUrl: './user-config-change-email.component.html',
  styleUrls: ['./user-config-change-email.component.scss']
})
export class UserConfigChangeEmailComponent implements OnInit {
  form!:FormGroup;
  user!: any

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: DialogRef<UserConfigChangeEmailComponent>,
    private authService: AuthService,
    private ts: ToastrService,
    private tokenService:TokenService
  ){}

  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.createForm()
    this.setValuesForm()
  }

  createForm(){
    this.form = this.fb.group({
      email: [''],
      newEmail: ['', [Validators.required, Validators.email]]
    })
  }

  setValuesForm(){
    console.log(this.user);

    this.form.patchValue({
      email: this.user.email
    })
  }

  closeModal(){
    this.dialogRef.close()
  }

  validateExistingEmail(email: any){
    const control = this.form.get('newEmail')
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

  sendForm(){
    if(this.form.invalid){
      this.ts.error('Por favor, preencha corretamente o campo.', 'Houve um problema')
      return
    }
    this.authService.changeEmail(this.form.get('newEmail')?.value)
    .pipe(finalize(() => this.closeModal()))
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.tokenService.deleteToken()
        this.tokenService.setToken(res.accessToken);
        console.log('token',this.tokenService.getToken());
        console.log('user',this.userService.getUser());

      },
      error: (err) => {
        this.ts.error('Por favor, tente novamente mais tarde.', 'Houve um problema')
      }
    })
  }
}
