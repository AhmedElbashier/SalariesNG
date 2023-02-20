import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Emp, EmpService } from '../../services/emp.service';
@Component({
  selector: 'app-admin-emp',
  templateUrl: './admin-emp.component.html',
  styleUrls: ['./admin-emp.component.scss']
})
export class AdminEmpComponent {
  Emps!: Emp[];
  selectedEmps!: Emp[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  Emp!: Emp;
  activityValues: number[] = [0, 100];
  EmpDialog!: boolean;
  submitted!: boolean;
  tt!:any;

  constructor(private router: Router, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit(): void {
    this.loading = false;
    this.tt = "إداري";
    this.EmpService.getEmpsByTt(this.tt).subscribe(
      (res: any) => {
        this.Emps = res
        // this.loading = false;
      },
      (error) => console.log(error));
    this.statuses = [
      { label: 'true', value: 'عقد ساري' },
      { label: 'false', value: 'عقد مغلق' },
    ]
  }

  details(id: any) {
    localStorage.setItem("EmpId", id);
    this.router.navigate(["dashboard/adminDetails"]);
  }
  hideDialog() {
    this.EmpDialog = false;
  }
  new() {
    this.router.navigate(["dashboard/adminNew"]);
  }
  delete(Emp: Emp) {

    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد حذف الموظف  ' + Emp.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.Emps = this.Emps.filter(val => val.id !== Emp.id);
          this.EmpService.deleteEmp(Emp.id);
          this.Emp = {};
          this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم حذف الموظف باسم', life: 3000 });
          this.reloadCurrentRoute();
      }
  });

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['dashboard/adminEmp']);
    });

  }
  exportExcel() {
    const newLocal = "xlsx";
    import(newLocal).then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.Emps);
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
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }

}