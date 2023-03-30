import { Absence, Advance } from './../../../services/settings.service';
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

  constructor(
    private router: Router,
    private settingService: SettingsService,
    private EmpService: EmpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  async ngOnInit(): Promise<void> {
    {
      await this.EmpService.getEmps().subscribe(
        (res: any) => {
          this.Emps = res;
        },
        (error) => console.log(error)
      );
    }
  }
  async details(Emp: any) {
    this.advance = await this.settingService.getAdvanceByEmpId(Emp);
    if (Object.keys(this.advance).length === 0) {
      this.EmpDialog = true;
    } else {
      this.showConfirm();
    }
    // this.router.navigate(['dashboard/advanceDetails']);
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
      summary: 'هذا الموظف لديه سلفيات مسبقة هل انت متأكد من أنك تريد اضافة المزيد من السلفيات؟',
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
  saveAbsence()
  {

  }
  hideDialog()
  {
    this.EmpDialog = false;
  }
}
