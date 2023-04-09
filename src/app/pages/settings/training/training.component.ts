import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  Training,
  SettingsService,
  Department,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent {
  @ViewChild('dt') dt: Table | undefined;

  TrainingsDialog!: boolean;
  TrainingsEditDialog!: boolean;
  Trainings!: Training[];
  Training!: Training;
  selectedTrainings!: Training[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];
  departments!: Department[];
  department!: Department;
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
    this.settingService.getTrainings().subscribe(
      (res: any) => {
        (this.Trainings = res),
        this.cdr.detectChanges();
        console.log('Sucess', res);
          this.settingService.getTrainings().subscribe(
            (res: any) => {
              this.Trainings = res;
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
        this.settingService.getDepartments().subscribe(
          (res: any) => {
            (this.departments = res);
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
    this.Training = {};
    this.submitted = false;
    this.TrainingsDialog = true;
  }
  editTrainings(Trainings: Training) {
    this.Training = { ...Trainings };
    this.TrainingsEditDialog = true;
  }
  deleteTrainings(Trainings: Training) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد حذف المتدرب  ' + Trainings.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Trainings = this.Trainings.filter(
          (val) => val.id !== Trainings.id
        );
        this.settingService.deleteTraining(Trainings.id).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'error',
              summary: 'تم ',
              detail: 'تم حذف المتدرب',
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
        this.Training = {};
        this.getData();
      },
    });
  }
  hideDialog() {
    this.TrainingsDialog = false;
    this.submitted = false;
  }
  editTrainingsD(Trainings: Training) {
    this.settingService.editTraining(Trainings).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم ',
          detail: 'تمت تعديل المتدرب بنجاح',
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
    this.Trainings = [...this.Trainings];
    this.TrainingsDialog = false;
    this.Training = {};
    this.getData();
  }
  saveTrainings(Trainings: Training) {
    this.submitted = true;
    this.Training.dept = this.department.name;
    this.settingService.addTraining(Trainings).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة المتدرب بنجاح',
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
    this.Trainings = [...this.Trainings];
    this.TrainingsDialog = false;
    this.Training = {};
    this.getData();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Trainings.length; i++) {
      if (this.Trainings[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.Trainings);
      const workbook = { Sheets: { الحزم: worksheet }, SheetNames: ['الحزم'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الحزم');
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
