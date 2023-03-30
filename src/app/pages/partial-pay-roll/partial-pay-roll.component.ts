import { PartialPayRoll } from './../../services/settings.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Partial, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-partial-pay-roll',
  templateUrl: './partial-pay-roll.component.html',
  styleUrls: ['./partial-pay-roll.component.scss']
})
export class PartialPayRollComponent {
  @ViewChild('dt') dt: Table | undefined;

  PartialsDialog!: boolean;
  PartialsEditDialog!: boolean;
  Partials!: Partial[];
  Partial!: Partial;
  PartialPayRolls!: PartialPayRoll[];
  selectedPartials!: Partial[];
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
    this.settingService.getPartials().then(
      (res: any) => {
        this.Partials = res;
      },
      (error) => console.log(error)
    );
  }
  openNew() {
    this.Partial = {};
    this.submitted = false;
    this.PartialsDialog = true;
  }
  editPartials(Partials: Partial) {
    this.Partial = { ...Partials };
    this.PartialsEditDialog = true;
  }
  deletePartials(Partials: Partial) {
    this.confirmationService.confirm({
      message: 'هل انت متأكد من أنك تريد حذف الموظف الجزئي  ' + Partials.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Partials = this.Partials.filter(
          (val) => val.id !== Partials.id
        );
        this.settingService.deletePartial(Partials.id);
        this.Partial = {};
        this.messageService.add({
          severity: 'error',
          summary: 'تم ',
          detail: 'تم حذف الموظف الجزئي',
          life: 3000,
        });
      },
    });
  }

  details(Partial:any) {
    this.MonthDialog = true;
    this.Partial = Partial;
  }
  async detailsD(month: any) {
    const y= new Date().getFullYear().toString();
    this.PartialPayRolls = await this.settingService.getPartialPayRollByIdAndMonth(this.Partial.id,month,y);
    if (Object.keys(this.PartialPayRolls).length===0) {
    localStorage.setItem("partialMonth", month);
    localStorage.setItem("partialId", this.Partial.id);
    localStorage.setItem("partialName", this.Partial.name);
    localStorage.setItem("partialExp", this.Partial.exp);
    localStorage.setItem("partialDegreeRoller", this.Partial.degreeRoller);
    localStorage.setItem("partialAdministrativeAssignment", this.Partial.administrativeAssignment);
    localStorage.setItem("partialAcademicAllowance", this.Partial.academicAllowance);
    localStorage.setItem("partialContractValue", this.Partial.contractValue);
    localStorage.setItem("partialPrimarySalary", this.Partial.primarySalary);
    localStorage.setItem("partialDepartment", this.Partial.department);
    localStorage.setItem("partialProgram", this.Partial.program);
    this.router.navigate(["dashboard/partialPayRollDetails"]);
    }
    else
    {
      this.messageService.add({ severity: 'errro', summary: 'حطأ', detail: 'تم صرف مرتب هذا الشهر من قبل', life: 3000 });
      this.MonthDialog=false;
    }
  }
  hideDialog() {
    this.PartialsDialog = false;
    this.submitted = false;
  }
  editPartialsD(Partials: Partial) {
    this.settingService.editPartial(Partials);
    this.messageService.add({
      severity: 'warn',
      summary: 'تم ',
      detail: 'تمت تعديل الموظف الجزئي بنجاح',
      life: 3000,
    });
    this.Partials = [...this.Partials];
    this.PartialsDialog = false;
    this.Partial = {};
  }
  savePartials(Partials: Partial) {
    this.submitted = true;
    this.settingService.addPartial(Partials);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت اضافة الموظف الجزئي بنجاح',
      life: 3000,
    });
    this.Partials = [...this.Partials];
    this.PartialsDialog = false;
    this.Partial = {};
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Partials.length; i++) {
      if (this.Partials[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.Partials);
      const workbook = { Sheets: { الجزئيين: worksheet }, SheetNames: ['الجزئيين'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الجزئيين');
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
