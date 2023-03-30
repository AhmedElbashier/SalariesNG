import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MessageService} from 'primeng/api';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService, private messageService: MessageService) { }
  users!: User[];
  username: any;
  password: any;
  ngOnInit(): void {
          localStorage.removeItem("Name");
          localStorage.removeItem("Username");
          localStorage.removeItem("Role");
          localStorage.removeItem("LastLogin");
  }

  login() {
    this.userService.getUser(this.username).subscribe(
      (res: any) => {
        this.users = res
        if (this.users.length===0) {

          this.messageService.add({ severity: 'warn', summary: 'خطأ', detail: 'خطأ في اسم المستخدم او كلمة المرور', life: 3000 });

          this.password = "";
          this.username = "";
        }
         else if (this.users[0].password === this.password) {
          localStorage.setItem("Name",this.users[0].name);
          localStorage.setItem("Username",this.users[0].username);
          localStorage.setItem("Role",this.users[0].role);
          localStorage.setItem("LastLogin",Date.now().toString());
          this.messageService.add({ severity: 'success', summary: 'تم التحقق', detail: 'مرحبا بك', life: 3000 });
          this.router.navigate(["dashboard/"]);
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'خطأ في كلمة المرور', life: 3000 });

            this.password = "";
            this.username = "";
          }
        },
      (error) => console.log(error));
    // this.router.navigate(["dashboard/statiscs"]);
    }
  }
