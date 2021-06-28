import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/pages/interfaces/auth.iterface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin:10px;
    }
  `
  ]
})
export class HomeComponent implements OnInit {

  //auth!: Auth;

  get auth (): Auth{
    return this.authService.auth;
  }

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['./auth']);
  }

}
