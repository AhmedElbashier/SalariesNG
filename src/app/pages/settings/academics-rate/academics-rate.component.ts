import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Emp, EmpService } from '../../../services/emp.service';
@Component({
  selector: 'app-academics-rate',
  templateUrl: './academics-rate.component.html',
  styleUrls: ['./academics-rate.component.scss'],
})
export class AcademicsRateComponent {
  Emps!: Emp[];
  detailDialog!: boolean;
  selectedEmps!: Emp[];
  representatives!: any[];
  statuses!: any[];
  loading: boolean = true;
  Emp!: Emp;
  activityValues: number[] = [0, 100];
  EmpDialog!: boolean;
  submitted!: boolean;
  tt!: any;
  detail!: Emp;

  constructor(
    private router: Router,
    private EmpService: EmpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.detail as Emp;
    this.loading = false;
    this.tt = 'أكاديمي';

    this.EmpService.getEmpsByTt(this.tt).subscribe(
      (res: any) => {
        this.Emps = res;
        // this.loading = false;
      },
      (error) => console.log(error)
    );
    this.statuses = [
      { label: 'true', value: 'عقد ساري' },
      { label: 'false', value: 'عقد مغلق' },
    ];
  }

  details(Emp: Emp) {
    this.detail = { ...Emp };
    this.detailDialog = true;
  }
  editEmpD(emp: Emp) {
    this.EmpService.editEmp(emp);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تم تعديل النسبة بنجاح',
      life: 3000,
    });
    this.detailDialog = false;
  }
  hideDialog() {
    this.EmpDialog = false;
  }
}
