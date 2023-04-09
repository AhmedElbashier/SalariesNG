import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StampSign, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-stamp-sign',
  templateUrl: './stamp-sign.component.html',
  styleUrls: ['./stamp-sign.component.scss'],
})
export class StampSignComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  StampSignsDialog!: boolean;
  StampSignsEditDialog!: boolean;
  StampSigns!: StampSign[];
  StampSign!: StampSign;
  selectedStampSigns!: StampSign[];
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
    this.settingService.getStampSigns().subscribe(
      (res: any) => {
        this.StampSigns = res;
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
    this.StampSign = {};
    this.submitted = false;
    this.StampSignsDialog = true;
  }
  editStampSigns(StampSigns: StampSign) {
    this.StampSign = { ...StampSigns };
    this.StampSignsEditDialog = true;
  }
  deleteStampSigns(StampSigns: StampSign) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد حذف الدمغة  ' + StampSigns.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.StampSigns = this.StampSigns.filter(
          (val) => val.id !== StampSigns.id
        );
        this.settingService.deleteStampSign(StampSigns.id).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم',
              detail: 'تم حذف الدمغة',
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
        this.StampSign = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.StampSignsDialog = false;
    this.submitted = false;
  }
  editStampSignsD(StampSigns: StampSign) {
    this.settingService.editStampSign(StampSigns).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم',
          detail: 'تمت تعديل الدمغة بنجاح',
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
    this.StampSigns = [...this.StampSigns];
    this.StampSignsDialog = false;
    this.StampSign = {};
    this.getData();
  }
  saveStampSigns(StampSigns: StampSign) {
    this.submitted = true;
    this.settingService.addStampSign(StampSigns).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الدمغة بنجاح',
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
    this.StampSigns = [...this.StampSigns];
    this.StampSignsDialog = false;
    this.StampSign = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.StampSigns.length; i++) {
      if (this.StampSigns[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.StampSigns);
      const workbook = {
        Sheets: { 'الدمغات على البدلات': worksheet },
        SheetNames: ['الدمغات على البدلات'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الدمغات على البدلات');
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
