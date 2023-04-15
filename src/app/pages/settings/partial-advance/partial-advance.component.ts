import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PartialAdvance, PartialAdvanceAccount, Partial, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-partial-advance',
  templateUrl: './partial-advance.component.html',
  styleUrls: ['./partial-advance.component.scss']
})
export class PartialAdvanceComponent {
  name!: boolean;
  Partial!: Partial;
  Partials!: Partial[];
  selectedPartials!: Partial[];
  PartialDialog!: boolean;
  PartialEditDialog!: boolean;
  loading!: boolean;
  firstMonth!: any;
  secondMonth!: any;
  year!: any;
  amount!: any;
  advance!: PartialAdvance;
  advance2!: PartialAdvance;
  advanceAccount!: PartialAdvanceAccount;
  period!: any;
  periodLeft!: any;
  advancexists!: boolean;
  constructor(
    private router: Router,
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef

  ) {}
  async ngOnInit(): Promise<void> {
    {
      this.advanceAccount = {} as PartialAdvanceAccount;
      this.advance = {} as PartialAdvance;
      this.advance2 = {} as PartialAdvance;
      this.getData();
    }
  }
  async getData()
  {
    await this.settingService.getPartials().then(
      (res: any) => {
        this.Partials = res;
        this.cdr.detectChanges();
        console.log('Sucess', res);
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
      });
  }
  async details(Partial: any) {
    this.Partial = { ...Partial };
    this.advance = await this.settingService.getPartialAdvanceByPartialId(Partial.id);
    if (Object.keys(this.advance).length === 0) {
      this.PartialDialog = true;
      this.onReject();
      this.advancexists = false;
    } else {
      this.showConfirm();
      this.advancexists = true;
      this.PartialDialog = false;
    }
  }
  exportExcel() {
    const newLocal = 'xlsx';
    import(newLocal).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Partials);
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
    this.PartialDialog = true;
  }

  onReject() {
    this.messageService.clear('c');
  }
  async savePartialAdvance() {
    if (this.advancexists === false) {
      this.advance2.amount = this.amount;
      this.advance2.empId = this.Partial.id;
      this.advance2.empName = this.Partial.name;
      this.advance2.period =
        parseInt(this.secondMonth) - parseInt(this.firstMonth);
      this.advance2.periodLeft = this.advance2.period;
      this.advance2.periodTotal = this.advance2.period;

      ///////////////////////////////////////////////////////////////////////////////

      this.advanceAccount.credit = '0';
      this.advanceAccount.debit = this.amount;
      this.advanceAccount.empId = this.Partial.id;
      this.advanceAccount.empName = this.Partial.name;
      this.advanceAccount.firstMonth = this.firstMonth;
      this.advanceAccount.lastMonth = this.secondMonth;

      ///////////////////////////////////////////////////////////////////////////////

      console.log(this.advance2);
      console.log(this.advanceAccount);

      this.settingService.addPartialAdvance(this.advance2).then(
        (res) =>
        {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: 'تمت اضافة السلفية بنجاح',
            life: 3000,
          });
        },
        (error) =>
        {
          this.messageService.add({
            severity: 'error',
            summary: 'فشل',
            detail: 'حدث خطأ ',
            life: 3000,
          });
        }
      );
      this.settingService.addPartialAdvanceAccount(this.advanceAccount).then(
        (res) =>
        {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: 'تمت اضافة السلفية بنجاح',
            life: 3000,
          });
        },
        (error) =>
        {
          this.messageService.add({
            severity: 'error',
            summary: 'فشل',
            detail: 'حدث خطأ ',
            life: 3000,
          });
        }
      );
      this.PartialDialog = false;
      this.getData();

    } else if (this.advancexists === true) {
      this.advanceAccount = await this.settingService.getPartialAdvanceAccountByPartialId(
        this.Partial.id
      );
      this.advanceAccount.debit =
        parseInt(this.advanceAccount.debit) + parseInt(this.amount);
      this.advanceAccount.lastMonth = this.secondMonth;

      ///////////////////////////////////////////////////////////////////////////////

      this.advance2.amount = this.amount;
      this.advance2.empId = this.Partial.id;
      this.advance2.empName = this.Partial.name;
      this.advance2.period =
        parseInt(this.secondMonth) - parseInt(this.firstMonth);
      this.advance2.period = parseInt(this.advance2.period).toString();
      this.advance2.periodLeft = this.advance2.period;
      this.advance2.periodTotal = this.advance2.period;

      ///////////////////////////////////////////////////////////////////////////////

      this.settingService.addPartialAdvance(this.advance2).then(
        (res) =>
        {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: 'تمت اضافة السلفية بنجاح',
            life: 3000,
          });
        },
        (error) =>
        {
          this.messageService.add({
            severity: 'error',
            summary: 'فشل',
            detail: 'حدث خطأ ',
            life: 3000,
          });
        }
      );;
      this.settingService.editPartialAdvanceAccount(this.advanceAccount).then(
        (res) =>
        {
          this.messageService.add({
            severity: 'success',
            summary: 'تم بنجاح',
            detail: 'تمت اضافة السلفية بنجاح',
            life: 3000,
          });
        },
        (error) =>
        {
          this.messageService.add({
            severity: 'error',
            summary: 'فشل',
            detail: 'حدث خطأ ',
            life: 3000,
          });
        }
      );;

      this.PartialDialog = false;
      this.Partial = {};
      this.getData();

    }
  }
  hideDialog() {
    this.PartialDialog = false;
    this.Partial = {};
  }
  more(Partial: any) {
    this.router.navigate(['dashboard/partialAdvanceDetails']);
    localStorage.setItem('PartialAdvancePartialId', Partial.id);
  }
}
