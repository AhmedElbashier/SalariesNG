import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Allowance, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.scss'],
})
export class AllowanceComponent {
  AllowancesDialog!: boolean;
  AllowancesEditDialog!: boolean;
  Allowances!: Allowance[];
  Allowance!: Allowance;
  selectedAllowances!: Allowance[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];

  exportColumns!: any[];
  dt: any;

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
  getData() {
    this.settingService.getAllowances().then(
      (res: any) => {
        this.Allowances = res;
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
    this.Allowance = {};
    this.submitted = false;
    this.AllowancesDialog = true;
  }
  editAllowances(Allowances: Allowance) {
    this.Allowance = { ...Allowances };
    this.AllowancesEditDialog = true;
  }
  deleteAllowances(Allowances: Allowance) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف نوع البدلات  ' + Allowances.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.settingService.deleteAllowance(Allowances.id).then(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف نوع البدلات',
              life: 3000,
            });
            this.Allowances = this.Allowances.filter(
              (val) => val.id !== Allowances.id
            );
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
        this.Allowance = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.AllowancesDialog = false;
    this.submitted = false;
  }
  editAllowancesD(Allowances: Allowance) {
    this.settingService.editAllowance(Allowances).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت تعديل نوع البدلات بنجاح',
          life: 3000,
        });
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
    this.Allowances = [...this.Allowances];
    this.AllowancesDialog = false;
    this.Allowance = {};
    this.getData();
  }
  saveAllowances(Allowances: Allowance) {
    this.submitted = true;
    this.settingService.addAllowance(Allowances).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة نوع البدلات بنجاح',
          life: 3000,
        });
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
    this.Allowances = [...this.Allowances];
    this.AllowancesDialog = false;
    this.Allowance = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Allowances.length; i++) {
      if (this.Allowances[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.Allowances);
      const workbook = {
        Sheets: { البدلات: worksheet },
        SheetNames: ['البدلات'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'البدلات');
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
