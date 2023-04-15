import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { empty } from 'rxjs';
import { PayRoll, PayRollService } from 'src/app/services/payroll.service';
import { Emp, EmpService } from '../../services/emp.service';


@Component({
  selector: 'app-admin-payroll',
  templateUrl: './admin-payroll.component.html',
  styleUrls: ['./admin-payroll.component.scss']
})
export class AdminPayrollComponent {

  y!:any
  Emps!: Emp[];
  selectedEmps!: Emp[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  Emp!: Emp;
  activityValues: number[] = [0, 100];
  EmpDialog!: boolean;
  submitted!: boolean;
  MonthlDialog!: boolean;
  month!: any;
  tt!: any;
  payRoll!: PayRoll[];
  constructor(private router: Router, private payRollService: PayRollService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.loading = false;
    this.tt = "إداري";
    this.EmpService.getEmpsByTt(this.tt).subscribe(
      (res: any) => {
        this.Emps = res
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'حطأ',
          detail: 'توجد مشكلة في التواصل مع قاعدة البيانات   ',
          life: 3000,
        });
      });
    this.statuses = [
      { label: 'true', value: 'عقد ساري' },
      { label: 'false', value: 'عقد مغلق' },
    ]
  }

  details(id: any,type:any) {
    localStorage.setItem("EmpId", id);
    localStorage.setItem("EmpType", type);
    this.MonthlDialog = true;
  }
  async detailsD(month: any) {
    if(month == null)
    {
      this.messageService.add({
        severity: 'error',
        summary: 'حطأ',
        detail: 'الرجاء تحديد الشهر اولاً',
        life: 3000,
      });
    }
    else
    {
    localStorage.setItem("RollMonth", month);
    this.y= new Date().getFullYear().toString();
    this.payRoll = await this.payRollService.getPayRollPromise(localStorage.getItem("EmpId"),localStorage.getItem("RollMonth"),this.y);
    if (Object.keys(this.payRoll).length===0||this.payRoll[0].valid=='0') {
      this.router.navigate(["dashboard/adminPayrollDetails"]);
    }
    else {
      this.messageService.add({ severity: 'errro', summary: 'حطأ', detail: 'تم صرف مرتب هذا الشهر من قبل', life: 3000 });
      this.MonthlDialog=false;
    }
    }
  }
  hideDialog() {
    this.EmpDialog = false;
    this.MonthlDialog = false;
  }
  new() {
    this.router.navigate(["dashboard/adminNew"]);
  }
  delete(Emp: Emp) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد العقار باسم المالك  ' + Emp.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Emps = this.Emps.filter(val => val.id !== Emp.id);
        this.EmpService.deleteEmp(Emp.id);
        this.Emp = {};
        this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم حذف العقار باسم', life: 3000 });
        this.reloadCurrentRoute();
      }
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard/adminEmp']);
    });
  }
  exportExcel() {
    const newLocal = "xlsx";
    import(newLocal).then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.Emps);
      const workbook = { Sheets: { 'العقارات': worksheet }, SheetNames: ['العقارات'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "العقارات");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }
  submit() {
    this.MonthlDialog = false;
  }
}
