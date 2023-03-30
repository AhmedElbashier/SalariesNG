import { Absence } from './../../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emp, EmpService } from 'src/app/services/emp.service';
import { SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent {
  name!: boolean;
  Emp!: Emp;
  Emps!: Emp[];
  selectedEmps!: Emp[];
  EmpDialog!:boolean;
  EmpEditDialog!:boolean;
  loading!:boolean;
  month:any;
  hours:any;
  absence!:Absence;


  constructor(private router: Router, private settingService: SettingsService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  async ngOnInit(): Promise<void> {
    {
      await this.EmpService.getEmps().subscribe(
        (res: any) => {
          this.Emps = res
      },
      (error) => console.log(error));
    }
  }
  exportExcel() {
    const newLocal = "xlsx";
    import(newLocal).then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.Emps);
      const workbook = { Sheets: { 'الموظفيين الأكاديمين': worksheet }, SheetNames: ['الموظفيين الأكاديمين'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "الموظفيين الأكاديمين");

    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }
  details(Emp:any)
  {
    this.Emp = {...Emp};
    this.EmpDialog = true;
  }
  hideDialog()
  {
    this.EmpDialog = false;
  }
  save(hours:any,month:any,Emp:any)
  {
    console.log(Emp);
    this.absence = {} as Absence;
    this.absence.hours=hours;
    this.absence.month = month;
    this.absence.name = Emp.name;
    this.absence.empId = Emp.id;
    this.absence.year  = new Date().getFullYear();
    this.settingService.addAbsence(this.absence);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة عدد الساعات بنجاح', life: 3000 });
    this.EmpDialog = false;
  }
}
