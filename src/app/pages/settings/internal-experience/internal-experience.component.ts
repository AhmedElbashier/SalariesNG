import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  InternalExperience,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-internal-experience',
  templateUrl: './internal-experience.component.html',
  styleUrls: ['./internal-experience.component.scss'],
})
export class InternalExperienceComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  InternalExperiencesDialog!: boolean;
  InternalExperiencesEditDialog!: boolean;
  InternalExperiences!: InternalExperience[];
  InternalExperience!: InternalExperience;
  selectedInternalExperiences!: InternalExperience[];
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
    this.settingService.getInternalExperiences().subscribe(
      (res: any) => {
        this.InternalExperiences = res;
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
    this.InternalExperience = {};
    this.submitted = false;
    this.InternalExperiencesDialog = true;
  }
  editInternalExperiences(InternalExperiences: InternalExperience) {
    this.InternalExperience = { ...InternalExperiences };
    this.InternalExperiencesEditDialog = true;
  }
  deleteInternalExperiences(InternalExperiences: InternalExperience) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف الحافز  ' +
        InternalExperiences.name +
        '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.settingService.deleteInternalExperience(InternalExperiences.id).then
        (
          (res) =>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم ',
              detail: 'تم حذف الحافز',
              life: 3000,
            });
            this.InternalExperiences = this.InternalExperiences.filter(
              (val) => val.id !== InternalExperiences.id
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
        this.InternalExperience = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.InternalExperiencesDialog = false;
    this.submitted = false;
  }
  editInternalExperiencesD(InternalExperiences: InternalExperience) {
    this.settingService.editInternalExperience(InternalExperiences).then(
      (res) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم ',
          detail: 'تمت تعديل الحافز بنجاح',
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
    this.InternalExperiences = [...this.InternalExperiences];
    this.InternalExperiencesEditDialog = false;
    this.InternalExperience = {};
    this.getData();

  }
  saveInternalExperiences(InternalExperiences: InternalExperience) {
    this.submitted = true;
    this.settingService.addInternalExperience(InternalExperiences).then
    (
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الحافز بنجاح',
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
    this.getData();
    this.InternalExperiences = [...this.InternalExperiences];
    this.InternalExperiencesDialog = false;
    this.InternalExperience = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.InternalExperiences.length; i++) {
      if (this.InternalExperiences[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.InternalExperiences);
      const workbook = {
        Sheets: { الحافز: worksheet },
        SheetNames: ['الحافز'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الحافز');
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
