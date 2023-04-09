import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  PerformanceIncentive,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-performance-incentive',
  templateUrl: './performance-incentive.component.html',
  styleUrls: ['./performance-incentive.component.scss'],
})
export class PerformanceIncentiveComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  PerformanceIncentivesDialog!: boolean;
  PerformanceIncentivesEditDialog!: boolean;
  PerformanceIncentives!: PerformanceIncentive[];
  PerformanceIncentive!: PerformanceIncentive;
  selectedPerformanceIncentives!: PerformanceIncentive[];
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
    this.settingService.getPerformanceIncentives().subscribe(
      (res: any) => {
        (this.PerformanceIncentives = res), this.cdr.detectChanges();
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
    this.PerformanceIncentive = {};
    this.submitted = false;
    this.PerformanceIncentivesDialog = true;
  }
  editPerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.PerformanceIncentive = { ...PerformanceIncentives };
    this.PerformanceIncentivesEditDialog = true;
  }
  deletePerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف القيمة الخاصة بي   ' +
        PerformanceIncentives.name +
        '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.settingService.deletePerformanceIncentive(
          PerformanceIncentives.id
        ).then(
          (res)=>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم',
              detail: 'تم حذف القيمة',
              life: 3000,
            });
            this.PerformanceIncentives = this.PerformanceIncentives.filter(
              (val) => val.id !== PerformanceIncentives.id
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
        this.PerformanceIncentive = {};
      },
    });
    this.getData();
  }

  hideDialog() {
    this.PerformanceIncentivesDialog = false;
    this.submitted = false;
  }
  editPerformanceIncentivesD(PerformanceIncentives: PerformanceIncentive) {
    this.settingService.editPerformanceIncentive(PerformanceIncentives).then(
      (res) =>
      this.messageService.add({
        severity: 'success',
        summary: 'تم ',
        detail: 'تمت تعديل القيمة',
        life: 3000,
      }),
      (error) =>
      {
        console.log("Error",error);
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );

    this.PerformanceIncentives = [...this.PerformanceIncentives];
    this.PerformanceIncentivesEditDialog = false;
    this.PerformanceIncentive = {};
    this.getData();

  }
  savePerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.submitted = true;
    this.settingService.addPerformanceIncentive(PerformanceIncentives).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة القيمة بنجاح',
          life: 3000,
        });
    this.getData();
    this.PerformanceIncentives = [...this.PerformanceIncentives];
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

    this.PerformanceIncentivesDialog = false;
    this.PerformanceIncentive = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.PerformanceIncentives.length; i++) {
      if (this.PerformanceIncentives[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.PerformanceIncentives);
      const workbook = {
        Sheets: { النسب: worksheet },
        SheetNames: ['النسب'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'النسب');
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
