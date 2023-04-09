import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  FirstSocialTaxOnVariableAllowance,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-first-social-insurance',
  templateUrl: './first-social-insurance.component.html',
  styleUrls: ['./first-social-insurance.component.scss'],
})
export class FirstSocialInsuranceComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  FirstSocialTaxOnVariableAllowancesDialog!: boolean;
  FirstSocialTaxOnVariableAllowancesEditDialog!: boolean;
  FirstSocialTaxOnVariableAllowances!: FirstSocialTaxOnVariableAllowance[];
  FirstSocialTaxOnVariableAllowance!: FirstSocialTaxOnVariableAllowance;
  selectedFirstSocialTaxOnVariableAllowances!: FirstSocialTaxOnVariableAllowance[];
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
    this.settingService.getFirstSocialTaxOnVariableAllowance().subscribe(
      (res: any) => {
        this.FirstSocialTaxOnVariableAllowances = res;
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
    this.FirstSocialTaxOnVariableAllowance = {};
    this.submitted = false;
    this.FirstSocialTaxOnVariableAllowancesDialog = true;
  }
  editFirstSocialTaxOnVariableAllowances(
    FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance
  ) {
    this.FirstSocialTaxOnVariableAllowance = {
      ...FirstSocialTaxOnVariableAllowances,
    };
    this.FirstSocialTaxOnVariableAllowancesEditDialog = true;
  }
  deleteFirstSocialTaxOnVariableAllowances(
    FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance
  ) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف التأمين  ' +
        FirstSocialTaxOnVariableAllowances.name +
        '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.settingService.deleteFirstSocialTaxOnVariableAllowance(
          FirstSocialTaxOnVariableAllowances.id
        ).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم ',
              detail: 'تم حذف التأمين',
              life: 3000,
            });
            this.FirstSocialTaxOnVariableAllowances =
            this.FirstSocialTaxOnVariableAllowances.filter(
              (val) => val.id !== FirstSocialTaxOnVariableAllowances.id
            );
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
        this.FirstSocialTaxOnVariableAllowance = {};
        this.getData();
        },
    });
  }
  hideDialog() {
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.submitted = false;
  }
  editFirstSocialTaxOnVariableAllowancesD(
    FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance
  ) {
    this.settingService.editFirstSocialTaxOnVariableAllowance(
      FirstSocialTaxOnVariableAllowances
    ).then(
      (res) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم ',
          detail: 'تمت تعديل التأمين بنجاح',
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

    this.FirstSocialTaxOnVariableAllowances = [
      ...this.FirstSocialTaxOnVariableAllowances,
    ];
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.FirstSocialTaxOnVariableAllowance = {};
    this.getData();
  }
  saveFirstSocialTaxOnVariableAllowances(
    FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance
  ) {
    this.submitted = true;
    this.settingService.addFirstSocialTaxOnVariableAllowance(
      FirstSocialTaxOnVariableAllowances
    ).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة التأمين بنجاح',
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

    this.FirstSocialTaxOnVariableAllowances = [
      ...this.FirstSocialTaxOnVariableAllowances,
    ];
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.FirstSocialTaxOnVariableAllowance = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.FirstSocialTaxOnVariableAllowances.length; i++) {
      if (this.FirstSocialTaxOnVariableAllowances[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(
        this.FirstSocialTaxOnVariableAllowances
      );
      const workbook = {
        Sheets: { التأمين: worksheet },
        SheetNames: ['التأمين'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'التأمين');
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
