import { VariableBinding } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emp, EmpService } from 'src/app/services/emp.service';
import { PayRoll, PayRollService } from 'src/app/services/payroll.service';
import { DegreeRoller, FirstSocialTaxOnVariableAllowance, InternalExperience, LastSocialTaxOnVariableAllowance, SettingsService, StampBase, StampSign, TaxOnVariableAllowances } from 'src/app/services/settings.service';
import { FirstSocialInsuranceComponent } from '../settings/first-social-insurance/first-social-insurance.component';
import { LastSocialInsuranceComponent } from '../settings/last-social-insurance/last-social-insurance.component';

@Component({
  selector: 'app-admin-payroll-details',
  templateUrl: './admin-payroll-details.component.html',
  styleUrls: ['./admin-payroll-details.component.scss']
})
export class AdminPayrollDetailsComponent {
  name!: boolean;
  Emp!: Emp;
  month: any;
  id: any;
  degreeRoller!: any;
  firstInsurance!: any;
  lastInsurance!: any;
  stampBase!: any;
  stampSign!: any;
  taxOnVariableAllowance!: any;
  internalExp!: any;
  firstInsuracneResult!: any;
  lastInsuracneResult!: any;
  persoanlTaxResult!: any;
  theBaseSubjectTax!: any;
  netBaseSalary!: any;
  variableTax!: any;
  taxOnVariableAllowanceResult!: any;
  netBaseVariableAllowance!: any;
  finalNetSalary!: any;
  finalNetSalaryBeforeDiscount!: any;
  finalSalaryDeduction!: any;
  finalSalaryAfterDeduction!: any;
  taxTotal!: any;
  employeeCost!: any;

  ///////////////////
  primarySalary!: any;
  startingSalary!: any;
  livingExpense!: any;
  housingExpense!: any;
  deportationExpense!: any;
  payRoll!: PayRoll;
  payRoll2!: PayRoll;
  payRolls!: any[];
  constructor(private router: Router, private settingService: SettingsService,private payRollService:PayRollService, private EmpService: EmpService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  async ngOnInit(): Promise<void> {
    {
      this.payRoll = {} as PayRoll;
      this.payRoll2 = {} as PayRoll;
      this.payRolls = {} as PayRoll[];
      this.id = localStorage.getItem("EmpId");
      this.month = localStorage.getItem("RollMonth");
      this.Emp = await this.EmpService.getEmpPromise(this.id);
      this.degreeRoller = await this.settingService.getDegreeRollerByExpPromise(this.Emp.tt, this.Emp.exp,this.Emp.type);
      this.firstInsurance = await this.settingService.getFirstSocialTaxOnVariableAllowanceByNamePromise(this.Emp.tt);
      this.lastInsurance = await this.settingService.getLastSocialTaxOnVariableAllowanceByNamePromise(this.Emp.tt);
      this.stampBase = await this.settingService.getStampBaseByNamePromise(this.Emp.tt);
      this.stampSign = await this.settingService.getStampSignByNamePromise(this.Emp.tt);
      this.internalExp = await this.settingService.getInternalExperienceByNamePromise(this.Emp.tt);
      this.taxOnVariableAllowance = await this.settingService.getTaxOnVariableAllowanceByNamePromise(this.Emp.tt);

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      this.firstInsuracneResult = parseFloat(this.degreeRoller[0].primarySalary) * parseFloat(this.firstInsurance[0].value);
      this.theBaseSubjectTax = parseFloat(this.degreeRoller[0].primarySalary) - parseFloat(this.firstInsuracneResult);
      this.theBaseSubjectTax = parseFloat(this.theBaseSubjectTax) - parseFloat(this.stampBase[0].value);
      if (this.theBaseSubjectTax >= 120000) {
        this.persoanlTaxResult = (this.theBaseSubjectTax - 120000) * 0.2 + 9000;
      }
      else if (this.theBaseSubjectTax >= 90000) {
        this.persoanlTaxResult = (this.theBaseSubjectTax - 90000) * 0.15 + 4500;
      }
      else if (this.theBaseSubjectTax >= 60000) {
        this.persoanlTaxResult = (this.theBaseSubjectTax - 60000) * 0.1 + 1500;
      }
      else if (this.theBaseSubjectTax >= 30000) {
        this.persoanlTaxResult = (this.theBaseSubjectTax - 30000) * 0.5 + 0;
      }
      else {
        this.persoanlTaxResult = this.theBaseSubjectTax * 0;
      }
      ////////////////////////////////////////////////////////////////////////////////////////////
      this.netBaseSalary = parseFloat(this.theBaseSubjectTax) - parseFloat(this.persoanlTaxResult);
      this.variableTax = parseFloat(this.degreeRoller[0].value) - parseFloat(this.degreeRoller[0].primarySalary);
      this.taxOnVariableAllowanceResult = parseFloat(this.variableTax) * parseFloat(this.taxOnVariableAllowance[0].value);
      this.netBaseVariableAllowance = parseFloat(this.variableTax) - parseFloat(this.taxOnVariableAllowanceResult);
      this.netBaseVariableAllowance = parseFloat(this.netBaseVariableAllowance) - parseFloat(this.taxOnVariableAllowance[0].value);
      this.finalNetSalary = parseFloat(this.netBaseSalary) + parseFloat(this.netBaseVariableAllowance);
      this.finalNetSalaryBeforeDiscount = parseFloat(this.degreeRoller[0].primarySalary) + parseFloat(this.variableTax);
      this.finalSalaryDeduction = parseFloat(this.stampSign[0].value) + parseFloat(this.taxOnVariableAllowanceResult)
        + parseFloat(this.stampBase[0].value) + parseFloat(this.firstInsuracneResult);
      this.finalSalaryAfterDeduction = parseFloat(this.finalNetSalaryBeforeDiscount) - parseFloat(this.finalSalaryDeduction);
      this.lastInsuracneResult = parseFloat(this.degreeRoller[0].primarySalary) * parseFloat(this.lastInsurance[0].value);
      this.taxTotal = parseFloat(this.finalSalaryDeduction) + parseFloat(this.lastInsuracneResult);
      this.employeeCost = parseFloat(this.firstInsuracneResult) + parseFloat(this.stampBase[0].value) + parseFloat(this.persoanlTaxResult) +
        parseFloat(this.netBaseVariableAllowance) + parseFloat(this.taxOnVariableAllowanceResult) + parseFloat(this.stampSign[0].value) +
        parseFloat(this.lastInsuracneResult) + parseFloat(this.netBaseSalary);
      //////////////////////////////////////////////////////////////////////////
      this.payRoll.empId = this.id;
      this.payRoll.empName = this.Emp.name;
      this.payRoll.month = this.month;
      this.payRoll.degreeRoller = this.degreeRoller[0].value;
      this.payRoll.primarySalary = this.degreeRoller[0].primarySalary;
      this.payRoll.firstInsurance = this.firstInsuracneResult;
      this.payRoll.lastInsurance = this.lastInsuracneResult;
      this.payRoll.stampBase = this.stampBase[0].value;
      this.payRoll.theBaseSubjectTax = this.theBaseSubjectTax;
      this.payRoll.personalTax = this.persoanlTaxResult;
      this.payRoll.netBaseSalary = this.netBaseSalary;
      this.payRoll.variableTax = this.variableTax;
      this.payRoll.taxOnVariableAllowanceResult = this.taxOnVariableAllowanceResult;
      this.payRoll.stampSign = this.stampSign[0].value;
      this.payRoll.netBaseVariableAllowance = this.netBaseVariableAllowance;
      this.payRoll.finalNetSalary = this.finalNetSalary;
      this.payRoll.finalNetSalaryBeforeDiscount = this.finalNetSalaryBeforeDiscount;
      this.payRoll.finalSalaryDeduction = this.finalSalaryDeduction;
      this.payRoll.finalSalaryAfterDeduction = this.finalSalaryAfterDeduction;
      this.payRoll.taxTotal = this.taxTotal;
      this.payRoll.employeeCost = this.employeeCost;
      this.payRoll.startingSalary = parseFloat(this.degreeRoller[0].primarySalary) * 0.30;
      this.payRoll.livingExpense = parseFloat(this.degreeRoller[0].primarySalary) * 0.25;
      this.payRoll.housingExpense = parseFloat(this.degreeRoller[0].primarySalary) * 0.25;
      this.payRoll.deportationExpense = parseFloat(this.degreeRoller[0].primarySalary) * 0.20;
      this.payRoll.year =new Date().getFullYear();
      this.payRoll.empType ="إداري";
      this.payRoll.valid="0";
      this.payRoll2 = await this.payRollService.getPayRollPromise(this.payRoll.empId,this.month);
      if(Object.keys(this.payRoll2).length===0)
      {this.payRollService.addPayRoll(this.payRoll).subscribe();
      this.payRolls = await this.payRollService.getPayRollPromise(this.payRoll.empId,this.month);
      }
      else
      {
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'تم صف مرتب هذا الشهر مسبقاً', life: 3000 });
      }

    }

  }
}
