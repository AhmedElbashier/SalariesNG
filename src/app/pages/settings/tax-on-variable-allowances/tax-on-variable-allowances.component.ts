import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  TaxOnVariableAllowances,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-tax-on-variable-allowances',
  templateUrl: './tax-on-variable-allowances.component.html',
  styleUrls: ['./tax-on-variable-allowances.component.scss'],
})
export class TaxOnVariableAllowancesComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  TaxOnVariableAllowancesDialog!: boolean;
  TaxOnVariableAllowancesEditDialog!: boolean;
  TaxOnVariableAllowances!: TaxOnVariableAllowances[];
  TaxOnVariableAllowance!: TaxOnVariableAllowances;
  selectedTaxOnVariableAllowances!: TaxOnVariableAllowances[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];

  exportColumns!: any[];

  constructor(
    private settingService: SettingsService,
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
  getData()
  {
    this.settingService.getTaxOnVariableAllowances().subscribe(
      (res: any) => {
        this.TaxOnVariableAllowances = res;
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
      }
    );
  }
  openNew() {
    this.TaxOnVariableAllowance = {};
    this.submitted = false;
    this.TaxOnVariableAllowancesDialog = true;
  }
  editTaxOnVariableAllowances(
    TaxOnVariableAllowances: TaxOnVariableAllowances
  ) {
    this.TaxOnVariableAllowance = { ...TaxOnVariableAllowances };
    this.TaxOnVariableAllowancesEditDialog = true;
  }
  deleteTaxOnVariableAllowances(
    TaxOnVariableAllowances: TaxOnVariableAllowances
  ) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف الضريبة  ' +
        TaxOnVariableAllowances.name +
        '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.TaxOnVariableAllowances = this.TaxOnVariableAllowances.filter(
          (val) => val.id !== TaxOnVariableAllowances.id
        );
        this.settingService.deleteTaxOnVariableAllowance(
          TaxOnVariableAllowances.id
        ).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم',
              detail: 'تم حذف الضريبة',
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
        this.TaxOnVariableAllowance = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.TaxOnVariableAllowancesDialog = false;
    this.submitted = false;
  }
  editTaxOnVariableAllowancesD(
    TaxOnVariableAllowances: TaxOnVariableAllowances
  ) {
    this.settingService.editTaxOnVariableAllowance(TaxOnVariableAllowances).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'warn',
              summary: 'تم ',
              detail: 'تمت تعديل الضريبة بنجاح',
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
    this.TaxOnVariableAllowances = [...this.TaxOnVariableAllowances];
    this.TaxOnVariableAllowancesDialog = false;
    this.TaxOnVariableAllowance = {};
    this.getData();
  }
  saveTaxOnVariableAllowances(
    TaxOnVariableAllowances: TaxOnVariableAllowances
  ) {
    this.submitted = true;
    this.settingService.addTaxOnVariableAllowance(TaxOnVariableAllowances).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الضريبة بنجاح',
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
    this.TaxOnVariableAllowances = [...this.TaxOnVariableAllowances];
    this.TaxOnVariableAllowancesDialog = false;
    this.TaxOnVariableAllowance = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.TaxOnVariableAllowances.length; i++) {
      if (this.TaxOnVariableAllowances[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.TaxOnVariableAllowances);
      const workbook = {
        Sheets: { 'الضريبة على البدلات المتغيرة': worksheet },
        SheetNames: ['الضريبة على البدلات المتغيرة'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الضريبة على البدلات المتغيرة');
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
