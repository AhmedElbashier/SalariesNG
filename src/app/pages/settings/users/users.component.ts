import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Table } from 'primeng/table';
import { User, UserService } from '../../../services/user.service';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
    `
      :host ::ng-deep .p-dialog .user-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  userDialog!: boolean;
  userEditDialog!: boolean;
  users!: User[];
  user!: User;
  selectedUsers!: User[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];
  role!: any[];

  exportColumns!: any[];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  ngOnInit() {
    this.Delete = 'حذف';
    this.getData();
  }
  getData() {
    this.users = [];
    this.userService.getUsers().subscribe(
      (res: any) => {
        (this.users = res), this.cdr.detectChanges();
        console.log('Success', res);
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'تم',
          detail:
            'حدث خطأ في عرض البيانات, الرجاء التحقق من الاتصال بقاعدة البيانات',
          life: 3000,
        });
      }
    );
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  editUser(user: User) {
    this.user = { ...user };
    this.userEditDialog = true;
  }
  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد حذف المستخدم  ' + user.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).then(
          (res: any) => {
            console.log('Success', res);
            this.messageService.add({
              severity: 'error',
              summary: 'تم',
              detail: 'تم حذف المستخدم',
              life: 3000,
            });
            this.users = this.users.filter((val) => val.id !== user.id);
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'فشل',
              detail: 'حدث خطأ ',
              life: 3000,
            });
          }
        );
      },
    });
    this.user = {};
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
  editUserD(user: User) {
    this.userService.editUser(user).then(
      (res: any) => {
        console.log('Success', res);
        this.messageService.add({
          severity: 'warn',
          summary: 'تم',
          detail: 'تمت تعديل المستخدم بنجاح',
          life: 3000,
        });
        this.getData();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );
    this.users = [...this.users];
    this.userEditDialog = false;
    this.user = {};
  }
  saveUser(user: User) {
    this.submitted = true;
    this.userService.addUser(user);
    this.getData();
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت اضافة المستخدم بنجاح',
      life: 3000,
    });
    this.users = [...this.users];
    this.userDialog = false;
    this.user = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  exportExcel() {
    const xlsx = 'xlsx';
    import(xlsx).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.users);
      const workbook = {
        Sheets: { المستخدمين: worksheet },
        SheetNames: ['المستخدمين'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'المستخدمين');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
