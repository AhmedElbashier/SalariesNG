import { EmptyExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Department, SettingsService } from 'src/app/services/settings.service';
import { Emp, EmpService } from '../../services/emp.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent {
  id!: any;
  Emp!: Emp;
  detailDialog!: boolean;
  detailEditDialog!: boolean;
  EmpEditDialog!: boolean;
  submitted!: boolean;
  Delete!: string;
  rent!: any;
  detail!:Emp;
  details!:Emp[];
  departments!:Department[];
  constructor(
      private router: Router,private settingService: SettingsService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.settingService.getDepartments().subscribe(
      (res: any) => {
        this.departments = res,
          console.log(this.departments.length);
      });


      this.id = localStorage.getItem("EmpId");
      this.EmpService.getEmp(this.id).subscribe(
          (res: any) => {
              this.Emp = res
          },
          (error) => console.log(error));

  }

  editEmp(Emp: Emp) {
    this.detail = {...Emp};
      this.detailDialog = true;

  }
  hideDialog() {
      this.detailDialog = false;
      this.submitted = false;
  }

  editEmpD(Emp: Emp) {
      this.submitted = true;
      this.EmpService.editEmp(Emp);
      this.messageService.add({ severity: 'warn', summary: 'تم بنجاح', detail: 'تمت تعديل بيانات الموظف بنجاح', life: 3000 });
      this.Emp = {};
      this.reloadCurrentRoute();
  }


  openNew() {
    this.detail = {};
    this.submitted = false;
    this.detailDialog = true;
}
editDetail(detail: Emp) {
    this.detail = { ...detail };
    this.detailEditDialog = true;
}

editBuilding(building: Emp) {
    this.detailEditDialog = true;

}
deleteDetail(detail: Emp) {
    this.confirmationService.confirm({
        message: 'هل أنت متاكد من انك تريد حذف  الموظف ' + detail.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.EmpService.deleteEmp(detail.id);
            this.details = this.details.filter(val => val.id !== detail.id);
            this.detail = {};
            this.messageService.add({ severity: 'error', summary: 'Successful', detail: 'تم حذف بيانات الموظف', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

editBuildingD(emp: Emp) {
    this.submitted = true;
    this.EmpService.editEmp(emp);
    this.messageService.add({ severity: 'warn', summary: 'تم بنجاح', detail: 'تمت تعديل بيانات الموظف بنجاح', life: 3000 });
    this.detail = {};
    this.reloadCurrentRoute();
}
findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.details.length; i++) {
        if (this.details[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}
saveDetail(detail: Emp) {
  this.submitted = true;
  detail.name = this.Emp.name;
  this.EmpService.editEmp(detail);
  this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة وحدة الموظف بنجاح', life: 3000 });
  this.detail = {};
  this.reloadCurrentRoute();
}
createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}







  exportExcel() {
    const newLocal = "xlsx";
      import(newLocal).then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.Emp);
        const workbook = { Sheets: { 'الموظفين الإداريين': worksheet }, SheetNames: ['الموظفين الإداريين'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "الموظفين الإداريين");
  
      });
    }
  
    saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + this.Emp.name+ new Date().getTime() + EXCEL_EXTENSION);
    }
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['dashboard/adminEmp']);
      });
    }
}
