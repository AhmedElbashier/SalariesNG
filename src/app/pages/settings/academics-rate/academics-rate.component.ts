import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.detail as Emp;
    this.loading = false;
    this.tt = 'أكاديمي';
    this.getData();
    this.statuses = [
      { label: 'true', value: 'عقد ساري' },
      { label: 'false', value: 'عقد مغلق' },
    ];
  }
  getData()
  {
    this.EmpService.getEmpsByTt(this.tt).subscribe(
      (res: any) => {
        (this.Emps = res), this.cdr.detectChanges();
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
  details(Emp: Emp) {
    this.detail = { ...Emp };
    this.detailDialog = true;
  }
  editEmpD(emp: Emp) {
    this.EmpService.editEmp(emp).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تم تعديل النسبة بنجاح',
          life: 3000,
        });
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
    this.getData();
    this.detailDialog = false;
  }
  hideDialog() {
    this.EmpDialog = false;
    this.detailDialog = false;
  }
}
