import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Department, SettingsService } from 'src/app/services/settings.service';
import { Emp, EmpService } from '../../services/emp.service';

@Component({
  selector: 'app-academic-new',
  templateUrl: './academic-new.component.html',
  styleUrls: ['./academic-new.component.scss']
})
export class AcademicNewComponent {
  unitDialog!: boolean;
  submitted!: boolean;
  rent!: any;
  Emps!: Emp[];
  Emp!: Emp;
  id: any;
  name: any
  department: any;
  departments!: Department[];
  exp: any;
  internalExp: any;
  bok: any;
  payrollType: any;
  recuirtDate: any;
  natioanlID: any;
  fib: any;
  type:any;
  tt:any;
  b!: [];
  constructor(
    private router: Router,private settingService: SettingsService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.Emp = { ...this.Emp };
    this.EmpService.getEmps().subscribe(
      (res: any) => {
        this.Emps = res
      },
      (error) => console.log(error));
      this.settingService.getDepartmentsByName("أكاديمي").subscribe(
        (res: any) => {
        this.departments = res,
          console.log(this.departments.length);


        // if (this.Emps.length == 0) {
        //   this.department = "P10001";

        // }
        // else if (this.Emps.length >=1) {
        //   this.department = "P";
        //   var patId;
        //   patId = this.Emps[this.Emps.length-1].department;
        //   patId = patId.substring(1);
        //   patId = parseInt(patId);
        //   this.department += patId + 1;
        // }
      },
      (error) => console.log(error));



  }
  EmpR(id: any) {
    this.id = id;
    console.log(this.id);


  }
  saveEmp(id: any, name: any, department:any, exp: any, internalExp:any,fib:any,bok:any,recuirtDate:any,natioanlID:any,type:any) {
    this.submitted = true;
    this.Emp.id = id;
    this.Emp.name = name;
    this.Emp.dept = department;
    this.Emp.exp = exp;
    this.Emp.internalExp = internalExp;
    this.Emp.fib = fib;
    this.Emp.bok = bok;
    this.Emp.recuirtDate = recuirtDate;
    this.Emp.nationalId = natioanlID;
    this.Emp.type = type;
    this.Emp.tt = "أكاديمي";

    this.EmpService.addEmp(this.Emp);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الموظف بنجاح', life: 3000 });
    this.Emp = {};
    this.department = "";
    this.exp = "";
    this.id = "";
    this.name = "";
    this.router.navigate(["dashboard/academicEmp"]);
  }
}
