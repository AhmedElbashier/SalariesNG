import { TrainingPayRoll } from './../../services/settings.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Training, SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-training-payroll-details',
  templateUrl: './training-payroll-details.component.html',
  styleUrls: ['./training-payroll-details.component.scss'],
})
export class TrainingPayrollDetailsComponent {
  @ViewChild('dt') dt: Table | undefined;

  Training!: Training;
  TrainingPayRoll!: TrainingPayRoll;
  id: any;
  month: any;
  year!:any;
  name: any;
  dept: any;
  amount: any;
  Trainings!: Training[];
  Disabled!:boolean;
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
    this.TrainingPayRoll = {} as TrainingPayRoll;
    this.id = localStorage.getItem('trainingId');
    this.month = localStorage.getItem('trainingMonth');
    if(this.month=="1")
    {
      this.month=="يناير";
    }
    else if(this.month=="2")
    {
      this.month=="يناير";
    }
    else if(this.month=="2")
    {
      this.month=="فبراير";
    }
    else if(this.month=="3")
    {
      this.month=="مارس";
    }
    else if(this.month=="4")
    {
      this.month=="ابريل";
    }
    else if(this.month=="5")
    {
      this.month=="مايو";
    }
    else if(this.month=="6")
    {
      this.month=="يونيو";
    }
    else if(this.month=="7")
    {
      this.month=="يوليو";
    }
    else if(this.month=="8")
    {
      this.month=="أغسطس";
    }
    else if(this.month=="9")
    {
      this.month=="سبتمبر";
    }
    else if(this.month=="10")
    {
      this.month=="أكتوبر";
    }
    else if(this.month=="11")
    {
      this.month=="نوفمبر";
    }
    else if(this.month=="12")
    {
      this.month=="ديسمبر";
    }
    this.name = localStorage.getItem('trainingName');
    this.dept = localStorage.getItem('trainingDept');
    this.amount = localStorage.getItem('trainingAmount');
    this.Trainings= await this.settingService.getTrainingById(this.id);
    const y = new Date().getFullYear();
    this.year = y;
  }
  print()
  {
    this.router.navigate(["/trainingInvoice"]);
  }
  payRoll()
  {
    this.TrainingPayRoll.id= this.id;
    this.TrainingPayRoll.name= this.name;
    this.TrainingPayRoll.dept= this.dept;
    this.TrainingPayRoll.amount= this.amount;
    this.TrainingPayRoll.month== this.month;
    this.TrainingPayRoll.year= this.year;
    this.TrainingPayRoll.user= "Admin";
    this.settingService.addTrainingPayRoll(this.TrainingPayRoll);
    this.messageService.add({
      severity: 'success',
      summary: 'تم',
      detail: 'تم تأكيد التسليم و التسلم بنجاح',
      life: 3000,
    });
    this.Disabled = true;

  }
}
