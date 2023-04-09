import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  DegreeRoller,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-degree-roller',
  templateUrl: './degree-roller.component.html',
  styleUrls: ['./degree-roller.component.scss'],
})
export class DegreeRollerComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  DegreeRollersDialog!: boolean;
  DegreeRollersEditDialog!: boolean;
  AcademicsDialog!: boolean;
  AdminsDialog!: boolean;
  DegreeRollers!: DegreeRoller[];
  DegreeRoller!: DegreeRoller;
  selectedDegreeRollers!: DegreeRoller[];
  submitted!: boolean;
  Delete!: string;
  EmpType!: string;
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
    this.settingService.getDegreeRollers().subscribe(
      (res: any) => {
        this.DegreeRollers = res;
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
    this.DegreeRoller = {};
    this.submitted = false;
    this.DegreeRollersDialog = true;
  }
  Type(name: any) {
    if (name == 'إداري') {
        this.AdminsDialog = true;
    } else if (name == 'أكاديمي') {
        this.AcademicsDialog = true;
    }
  }
  editDegreeRollers(DegreeRollers: DegreeRoller) {
    this.DegreeRoller = { ...DegreeRollers };
    this.DegreeRollersEditDialog = true;
  }
  deleteDegreeRollers(DegreeRollers: DegreeRoller) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف مدخل الدرجة  ' + DegreeRollers.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.settingService.deleteDegreeRoller(DegreeRollers.id).then(
          (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف مدخل الدرجة',
              life: 3000,
            });
            this.DegreeRollers = this.DegreeRollers.filter(
              (val) => val.id !== DegreeRollers.id
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
        this.DegreeRoller = {};
        this.getData();
      },
    });
  }

  hideDialog() {
    this.DegreeRollersDialog = false;
    this.submitted = false;
  }
  editDegreeRollersD(DegreeRollers: DegreeRoller) {
    this.settingService.editDegreeRoller(DegreeRollers).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت تعديل مدخل الدرجة بنجاح',
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

    this.DegreeRollers = [...this.DegreeRollers];
    this.DegreeRollersDialog = false;
    this.DegreeRoller = {};
    this.getData();
  }
  saveDegreeRollers(DegreeRollers: DegreeRoller) {
    this.submitted = true;
    this.settingService.addDegreeRoller(DegreeRollers).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة مدخل الدرجة بنجاح',
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
    this.DegreeRollers = [...this.DegreeRollers];
    this.DegreeRollersDialog = false;
    this.DegreeRoller = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.DegreeRollers.length; i++) {
      if (this.DegreeRollers[i].id === id) {
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

  hideTypeDialog()
  {
    this.AdminsDialog = false;
    this.AcademicsDialog = false;
  }
  SaveAcademicType()
  {
    this.AcademicsDialog = false;
  }
  SaveAdminType()
  {
    this.AdminsDialog = false;
  }

  exportExcel() {
    const xlsx = 'xlsx';
    import(xlsx).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.DegreeRollers);
      const workbook = {
        Sheets: { 'مدخلات الدرجة': worksheet },
        SheetNames: ['مدخلات الدرجة'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'مدخلات الدرجة');
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
