import { UserConfigComponent } from './../../../modules/user/components/user-config/user-config.component';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user!: any

  constructor(
    private userService: UserService,
    private router:Router,
    private dialog: MatDialog,

    ){}

  ngOnInit(): void {
    this.user = this.userService.getUser()
  }

  openUserConfig(){
    const dialogRef = this.dialog.open(UserConfigComponent, {
      width: '40vw'
    })
    dialogRef.afterClosed().subscribe(() => {});
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
