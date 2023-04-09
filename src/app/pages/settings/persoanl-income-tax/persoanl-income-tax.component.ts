import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  SettingsService,
  PersonalIncomeTax,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-persoanl-income-tax',
  templateUrl: './persoanl-income-tax.component.html',
  styleUrls: ['./persoanl-income-tax.component.scss'],
})
export class PersoanlIncomeTaxComponent {
  @ViewChild('dt') dt: Table | undefined;

  PersonalIncomeTaxsDialog!: boolean;
  PersonalIncomeTaxsEditDialog!: boolean;
  PersonalIncomeTaxs!: PersonalIncomeTax[];
  PersonalIncomeTax!: PersonalIncomeTax;
  selectedPersonalIncomeTaxs!: PersonalIncomeTax[];
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
  getData() {
    this.settingService.getPersonalIncomeTaxs().subscribe(
      (res: any) => {
        this.PersonalIncomeTaxs = res;
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
    this.PersonalIncomeTax = {};
    this.submitted = false;
    this.PersonalIncomeTaxsDialog = true;
  }
  editPersonalIncomeTaxs(PersonalIncomeTaxs: PersonalIncomeTax) {
    this.PersonalIncomeTax = { ...PersonalIncomeTaxs };
    this.PersonalIncomeTaxsEditDialog = true;
  }
  deletePersonalIncomeTaxs(PersonalIncomeTaxs: PersonalIncomeTax) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف الضريبة  ' +
        PersonalIncomeTaxs.name +
        '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.PersonalIncomeTaxs = this.PersonalIncomeTaxs.filter(
          (val) => val.id !== PersonalIncomeTaxs.id
        );
        this.settingService.deletePersonalIncomeTax(PersonalIncomeTaxs.id).then(
          (res) => {
            this.messageService.add({
              severity: 'error',
              summary: 'تم ',
              detail: 'تم حذف الضريبة',
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
        this.PersonalIncomeTax = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.PersonalIncomeTaxsDialog = false;
    this.submitted = false;
  }
  editPersonalIncomeTaxsD(PersonalIncomeTaxs: PersonalIncomeTax) {
    this.settingService.editPersonalIncomeTax(PersonalIncomeTaxs).then(
      (res) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم ',
          detail: 'تمت تعديل الضريبة بنجاح',
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

    this.PersonalIncomeTaxs = [...this.PersonalIncomeTaxs];
    this.PersonalIncomeTaxsDialog = false;
    this.PersonalIncomeTax = {};
    this.getData();
  }
  savePersonalIncomeTaxs(PersonalIncomeTaxs: PersonalIncomeTax) {
    this.submitted = true;
    this.settingService.addPersonalIncomeTax(PersonalIncomeTaxs).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الضريبة بنجاح',
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
    this.PersonalIncomeTaxs = [...this.PersonalIncomeTaxs];
    this.PersonalIncomeTaxsDialog = false;
    this.PersonalIncomeTax = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.PersonalIncomeTaxs.length; i++) {
      if (this.PersonalIncomeTaxs[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.PersonalIncomeTaxs);
      const workbook = {
        Sheets: { 'الضريبة على الدخل الشخصي': worksheet },
        SheetNames: ['الضريبة على الدخل الشخصي'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الضريبة على الدخل الشخصي');
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
