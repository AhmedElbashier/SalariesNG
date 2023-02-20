import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Department, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
  @ViewChild('dt') dt: Table | undefined;

  DepartmentsDialog!: boolean;
  DepartmentsEditDialog!: boolean;
  Departments!: Department[];
  Department!: Department;
  selectedDepartments!: Department[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];

  exportColumns!: any[];

  constructor(
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  ngOnInit() {
    this.Delete = 'حذف';
    this.settingService.getDepartments().subscribe(
      (res: any) => {
        this.Departments = res;
      },
      (error) => console.log(error)
    );
  }
  openNew() {
    this.Department = {};
    this.submitted = false;
    this.DepartmentsDialog = true;
  }
  editDepartments(Departments: Department) {
    this.Department = { ...Departments };
    this.DepartmentsEditDialog = true;
  }
  deleteDepartments(Departments: Department) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف القسم  ' + Departments.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Departments = this.Departments.filter(
          (val) => val.id !== Departments.id
        );
        this.settingService.deleteDepartment(Departments.id);
        this.Department = {};
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تم حذف القسم',
          life: 3000,
        });
        this.reloadCurrentRoute();
      },
    });
  }

  hideDialog() {
    this.DepartmentsDialog = false;
    this.submitted = false;
  }
  editDepartmentsD(Departments: Department) {
    this.settingService.editDepartment(Departments);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت تعديل القسم بنجاح',
      life: 3000,
    });
    this.Departments = [...this.Departments];
    this.DepartmentsDialog = false;
    this.Department = {};
    this.reloadCurrentRoute();
  }
  saveDepartments(Departments: Department) {
    this.submitted = true;
    this.settingService.addDepartment(Departments);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت اضافة القسم بنجاح',
      life: 3000,
    });
    this.Departments = [...this.Departments];
    this.DepartmentsDialog = false;
    this.Department = {};
    this.reloadCurrentRoute();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Departments.length; i++) {
      if (this.Departments[i].id === id) {
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

  // exportPdf() {
  //     import("jspdf").then(jsPDF => {
  //         import("jspdf-autotable").then(x => {
  //             const doc = new jsPDF.default(0,0);
  //             doc.autoTable(this.exportColumns, this.Departmentss);
  //             doc.save('Departmentss.pdf');
  //         })
  //     })
  // }

  exportExcel() {
    const xlsx = 'xlsx';
    import(xlsx).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Departments);
      const workbook = {
        Sheets: { القسمين: worksheet },
        SheetNames: ['القسمين'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'القسمين');
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

  reloadCurrentRoute() {
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['dashboard/settings/Departmentss']);
    // });
  }
}
