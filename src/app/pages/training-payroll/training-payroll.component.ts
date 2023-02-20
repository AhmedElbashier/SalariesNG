import { TrainingPayRoll } from './../../services/settings.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Training, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-training-payroll',
  templateUrl: './training-payroll.component.html',
  styleUrls: ['./training-payroll.component.scss'],
})
export class TrainingPayrollComponent {
  @ViewChild('dt') dt: Table | undefined;

  TrainingsDialog!: boolean;
  TrainingsEditDialog!: boolean;
  Trainings!: Training[];
  Training!: Training;
  TrainingPayRolls!: TrainingPayRoll[];
  selectedTrainings!: Training[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];
  month: any;
  MonthDialog!: boolean;
  exportColumns!: any[];

  constructor(
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  async ngOnInit(): Promise<void> {
    this.Delete = 'حذف';
    this.settingService.getTrainings().subscribe(
      (res: any) => {
        this.Trainings = res;
      },
      (error) => console.log(error)
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
      message: 'هل انت متأكد من أنك تريد حذف الحزمة  ' + Trainings.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Trainings = this.Trainings.filter(
          (val) => val.id !== Trainings.id
        );
        this.settingService.deleteTraining(Trainings.id);
        this.Training = {};
        this.messageService.add({
          severity: 'error',
          summary: 'تم ',
          detail: 'تم حذف الحزمة',
          life: 3000,
        });
      },
    });
  }

  details(Training:any) {
    this.MonthDialog = true;
    this.Training = Training;
  }
  async detailsD(month: any) {
    this.TrainingPayRolls = await this.settingService.getTrainingPayRollById(this.Training.id,month);
    if (Object.keys(this.TrainingPayRolls).length===0) {
    localStorage.setItem("trainingMonth", month);
    localStorage.setItem("trainingId", this.Training.id);
    localStorage.setItem("trainingName", this.Training.name);
    localStorage.setItem("trainingDept", this.Training.dept);
    localStorage.setItem("trainingAmount", this.Training.amount);
    this.router.navigate(["dashboard/trainingPayRollDetails"]);
    }
    else
    {
      this.messageService.add({ severity: 'errro', summary: 'حطأ', detail: 'تم صرف مرتب هذا الشهر من قبل', life: 3000 });
      this.MonthDialog=false;
    }
  }
  hideDialog() {
    this.TrainingsDialog = false;
    this.submitted = false;
  }
  editTrainingsD(Trainings: Training) {
    this.settingService.editTraining(Trainings);
    this.messageService.add({
      severity: 'warn',
      summary: 'تم ',
      detail: 'تمت تعديل الحزمة بنجاح',
      life: 3000,
    });
    this.Trainings = [...this.Trainings];
    this.TrainingsDialog = false;
    this.Training = {};
  }
  saveTrainings(Trainings: Training) {
    this.submitted = true;
    this.settingService.addTraining(Trainings);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت اضافة الحزمة بنجاح',
      life: 3000,
    });
    this.Trainings = [...this.Trainings];
    this.TrainingsDialog = false;
    this.Training = {};
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
