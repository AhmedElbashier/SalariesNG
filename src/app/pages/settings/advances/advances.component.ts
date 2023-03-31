import {
  Absence,
  Advance,
  AdvanceAccount,
} from './../../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emp, EmpService } from 'src/app/services/emp.service';
import { SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.scss'],
})
export class AdvancesComponent implements OnInit {
  name!: boolean;
  Emp!: Emp;
  Emps!: Emp[];
  selectedEmps!: Emp[];
  EmpDialog!: boolean;
  EmpEditDialog!: boolean;
  loading!: boolean;
  firstMonth!: any;
  secondMonth!: any;
  year!: any;
  amount!: any;
  advance!: Advance;
  advance2!: Advance;
  advanceAccount!: AdvanceAccount;
  period!: any;
  periodLeft!: any;
  advancexists!: boolean;
  constructor(
    private router: Router,
    private settingService: SettingsService,
    private EmpService: EmpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  async ngOnInit(): Promise<void> {
    {
      this.advanceAccount = {} as AdvanceAccount;
      this.advance = {} as Advance;
      this.advance2 = {} as Advance;
      await this.EmpService.getEmps().subscribe(
        (res: any) => {
          this.Emps = res;
        },
        (error) => console.log(error)
      );
    }
  }
  async details(Emp: any) {
    this.Emp = { ...Emp };
    this.advance = await this.settingService.getAdvanceByEmpId(Emp.id);
    if (Object.keys(this.advance).length === 0) {
      this.EmpDialog = true;
      this.onReject();
      this.advancexists = false;
    } else {
      this.showConfirm();
      this.advancexists = true;
      this.EmpDialog = false;

    }
  }
  exportExcel() {
    const newLocal = 'xlsx';
    import(newLocal).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Emps);
      const workbook = {
        Sheets: { 'الموظفيين الأكاديمين': worksheet },
        SheetNames: ['الموظفيين الأكاديمين'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الموظفيين الأكاديمين');
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

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary:
        'هذا الموظف لديه سلفيات مسبقة هل انت متأكد من أنك تريد اضافة المزيد من السلفيات؟',
      detail: 'تأكيد للمتابعة',
    });
  }

  onConfirm() {
    this.messageService.clear('c');
    this.EmpDialog = true;
  }

  onReject() {
    this.messageService.clear('c');
  }
  async saveAdvance() {
    if (this.advancexists === false) {
      this.advance2.amount = this.amount;
      this.advance2.empId = this.Emp.id;
      this.advance2.empName = this.Emp.name;
      this.advance2.period =
        parseInt(this.secondMonth) - parseInt(this.firstMonth);
      this.advance2.periodLeft = this.advance2.period;
      this.advance2.periodTotal = this.advance2.period;

      ///////////////////////////////////////////////////////////////////////////////

      this.advanceAccount.credit = '0';
      this.advanceAccount.debit = this.amount;
      this.advanceAccount.empId = this.Emp.id;
      this.advanceAccount.empName = this.Emp.name;
      this.advanceAccount.firstMonth = this.firstMonth;
      this.advanceAccount.lastMonth = this.secondMonth;

      ///////////////////////////////////////////////////////////////////////////////

      console.log(this.advance2);
      console.log(this.advanceAccount);

      this.settingService.addAdvance(this.advance2);
      this.settingService.addAdvanceAccount(this.advanceAccount);
      this.messageService.add({
        severity: 'success',
        summary: 'تم بنجاح',
        detail: 'تمت اضافة السلفية بنجاح',
        life: 3000,
      });
      this.EmpDialog = false;
    } else if (this.advancexists === true) {
      this.advanceAccount = await this.settingService.getAdvanceAccountByEmpId(
        this.Emp.id
      );
      this.advanceAccount.debit =
        parseInt(this.advanceAccount.debit) + parseInt(this.amount);
      this.advanceAccount.lastMonth = this.secondMonth;

      ///////////////////////////////////////////////////////////////////////////////

      this.advance2.amount = this.amount;
      this.advance2.empId = this.Emp.id;
      this.advance2.empName = this.Emp.name;
      this.advance2.period =
        parseInt(this.secondMonth) - parseInt(this.firstMonth);
      this.advance2.period = parseInt(this.advance2.period).toString();
      this.advance2.periodLeft = this.advance2.period;
      this.advance2.periodTotal = this.advance2.period;

      ///////////////////////////////////////////////////////////////////////////////

      this.settingService.addAdvance(this.advance2);
      this.settingService.editAdvanceAccount(this.advanceAccount);
      this.messageService.add({
        severity: 'success',
        summary: 'تم بنجاح',
        detail: 'تمت اضافة السلفية بنجاح',
        life: 3000,
      });
      this.EmpDialog = false;
      this.Emp = {};
    }
  }
  hideDialog() {
    this.EmpDialog = false;
    this.Emp = {};
  }
  more(Emp:any)
  {
    this.router.navigate(["dashboard/advanceDetails"]);
    localStorage.setItem("AdvanceEmpId",Emp.id);
  }
}
