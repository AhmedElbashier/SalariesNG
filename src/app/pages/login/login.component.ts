import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private messageService: MessageService) { }
  ngOnInit(): void {
  }
  username: any;
  password: any;

  login()
  {
       this.router.navigate(["dashboard"]);
       this.messageService.add({ severity: 'success', summary: 'نجاح', detail: 'مرحبا بك', life: 3000 });
       this.password = "";
       this.username = "";
  
  }
}

