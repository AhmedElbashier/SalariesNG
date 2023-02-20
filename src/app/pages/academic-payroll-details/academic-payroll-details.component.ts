import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emp, EmpService } from 'src/app/services/emp.service';
import { DegreeRoller, InternalExperience, SettingsService, StampBase, StampSign, TaxOnVariableAllowances, FirstSocialTaxOnVariableAllowance } from 'src/app/services/settings.service';
import { FirstSocialInsuranceComponent } from '../settings/first-social-insurance/first-social-insurance.component';
import { LastSocialInsuranceComponent } from '../settings/last-social-insurance/last-social-insurance.component';

@Component({
  selector: 'app-academic-payroll-details',
  templateUrl: './academic-payroll-details.component.html',
  styleUrls: ['./academic-payroll-details.component.scss']
})
export class AcademicPayrollDetailsComponent implements OnInit, AfterViewInit {

  Emp!: Emp;
  month: any;
  id: any;
  degreeRoller!: DegreeRoller;
  firstInsurance!: FirstSocialTaxOnVariableAllowance;
  lastInsurance!: FirstSocialTaxOnVariableAllowance;
  stampBase!: StampBase;
  stampSign!: StampSign;
  taxOnVariableAllowance!: TaxOnVariableAllowances;
  internalExp!: InternalExperience;

  firstInsuranceResult!: number;
  firstInsuranceValue!: number;
  primarySalary!: number;


  constructor(private router: Router, private settingService: SettingsService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  async ngOnInit(): Promise<void> {
    {
      var x;
      this.id = localStorage.getItem("EmpId");
      this.month = localStorage.getItem("RollMonth");
      this.EmpService.getEmp(this.id).subscribe(
        async (res: any) => {
          this.Emp = res,
            this.settingService.getDegreeRollerByNameAndExp(this.Emp.tt, this.Emp.exp,this.Emp.type).subscribe(
              (res: any) => {
                this.degreeRoller = res,
                console.log(this.degreeRoller);
              },
              (error) => console.log(error));
          this.settingService.getFirstSocialTaxOnVariableAllowanceByName(this.Emp.tt).subscribe(
            (res: any) => {
              this.firstInsurance = res,
                this.firstInsuranceValue = res.value,
                console.log(this.firstInsurance);
            },
            (error) => console.log(error));
          this.settingService.getStampBaseByName(this.Emp.tt).subscribe(
            (res: any) => {
              this.stampBase = res,
                console.log(this.stampBase);
            },
            (error) => console.log(error));
          this.settingService.getStampSignByName(this.Emp.tt).subscribe(
            (res: any) => {
              this.stampSign = res,
                console.log(this.stampSign);
            },
            (error) => console.log(error));
          this.settingService.getLastSocialTaxOnVariableAllowanceByName(this.Emp.tt).subscribe(
            (res: any) => {
              this.lastInsurance = res,
                console.log(this.lastInsurance);
            },
            (error) => console.log(error));
          this.settingService.getInternalExperienceByName(this.Emp.tt).subscribe(
            (res: any) => {
              this.internalExp = res,
                console.log(this.internalExp);
            },
            (error) => console.log(error));
        },
        (error) => console.log(error));
    }
  }
  ngAfterViewInit() {
    // console.log(""this.Emp);
  }
}
