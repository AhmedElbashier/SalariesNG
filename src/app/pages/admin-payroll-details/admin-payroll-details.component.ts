import { PerformanceIncentive, Absence, Allowance } from './../../services/settings.service';
import { ConstantPool, VariableBinding } from '@angular/compiler';
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
  internalExpIncentive!:any;
  performance!:any
  performanceIncentive!:any;
  primarySalary!: any;
  startingSalary!: any;
  livingExpense!: any;
  housingExpense!: any;
  deportationExpense!: any;
  payRoll!: PayRoll;
  payRoll2!: PayRoll;
  payRolls!: any[];
  predecessors!:any;
  Disabled!:boolean;
  discountsTotal!:any;
  absence!:Absence[];
  absenceValue!:any;
  absenceValueCalc!:any;
  absenceValueAfterDeduction!:any;
  absenceLastValue!:any;
  taxAbsenceLastValue!:any;
  hours!:any;
  FirstTableTotal!:any;
  SecondTableTotal!:any;
  discountsSecondTotal!:any;
  lastAllTotalRoll!:any;
  allowance!:Allowance[];
  allowance1!:any;
  allowance2!:any;
  allowance3!:any;
  allowance4!:any;
  allowance5!:any;
  allowanceV1!:any;
  allowanceV2!:any;
  allowanceV3!:any;
  allowanceV4!:any;
  allowanceV5!:any;

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
      this.absence = await this.settingService.getAbsenceByName(this.Emp.name,this.month);
      this.lastInsurance = await this.settingService.getLastSocialTaxOnVariableAllowanceByNamePromise(this.Emp.tt);
      this.stampBase = await this.settingService.getStampBaseByNamePromise(this.Emp.tt);
      this.stampSign = await this.settingService.getStampSignByNamePromise(this.Emp.tt);
      this.internalExp = await this.settingService.getInternalExperienceByNamePromise(this.Emp.tt);
      this.internalExpIncentive = parseInt(this.internalExp[0].value)* parseInt(this.Emp.internalExp);
      this.taxOnVariableAllowance = await this.settingService.getTaxOnVariableAllowanceByNamePromise(this.Emp.tt);
      this.performance = await this.settingService.getPerformanceIncentive(this.Emp.tt);
      this.allowance = await this.settingService.getAllowances();
      this.performanceIncentive = parseFloat(this.Emp.rate) * parseInt(this.performance[0].value);
      this.degreeRoller[0].value= parseInt(this.degreeRoller[0].value) + parseInt(this.performanceIncentive) + parseInt(this.internalExpIncentive);
      this.firstInsuracneResult = parseFloat(this.degreeRoller[0].primarySalary) * parseFloat(this.firstInsurance[0].value);
      this.theBaseSubjectTax = parseFloat(this.degreeRoller[0].primarySalary) - parseFloat(this.firstInsuracneResult);
      this.theBaseSubjectTax = parseFloat(this.theBaseSubjectTax) - parseFloat(this.stampBase[0].value);
      this.absenceValue = parseInt(this.degreeRoller[0].value) / 192;
      if(Object(this.absence).keys.length!=0)
      {
      this.hours = this.absence[0].hours;
      }
      else
      {
        this.hours = "0";
      }
      this.absenceValueCalc = parseInt(this.absenceValue)* parseInt(this.hours);
      this.absenceValueAfterDeduction = parseInt(this.absenceValue) * parseInt(this.hours);
      this.absenceLastValue = parseInt(this.degreeRoller[0].primarySalary) / parseInt(this.degreeRoller[0].value);
      this.absenceLastValue = parseFloat(this.absenceLastValue) * parseFloat(this.absenceValueAfterDeduction);
      this.absenceLastValue = parseInt(this.absenceLastValue.toFixed());
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

      this.payRoll.empId = this.id;
      this.payRoll.empName = this.Emp.name;
      this.payRoll.month = this.month;
      this.payRoll.degreeRoller = this.degreeRoller[0].value;
      this.payRoll.primarySalary = this.degreeRoller[0].primarySalary;
      this.payRoll.firstInsurance = this.firstInsuracneResult;
      this.payRoll.lastInsurance = parseInt(this.lastInsuracneResult.toFixed());
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
      this.allowance1 = this.allowance[0].name;
      this.allowance2 = this.allowance[1].name;
      this.allowance3 = this.allowance[2].name;
      this.allowance4 = this.allowance[3].name;
      this.allowance5 = this.allowance[4].name;
      this.allowanceV1= parseFloat( this.payRoll.variableTax ) * parseFloat(this.allowance[0].percentage);
      this.allowanceV2= parseFloat( this.payRoll.variableTax ) * parseFloat(this.allowance[1].percentage);
      this.allowanceV3= parseFloat( this.payRoll.variableTax ) * parseFloat(this.allowance[2].percentage);
      this.allowanceV4= parseFloat( this.payRoll.variableTax ) * parseFloat(this.allowance[3].percentage);
      this.allowanceV5= parseFloat( this.payRoll.variableTax ) * parseFloat(this.allowance[4].percentage);
      // this.discountsTotal = parseInt(this.payRoll.firstInsurance)+parseInt(this.payRoll.stampBase)+parseInt(this.payRoll.personalTax);
      // this.discountsSecondTotal = parseInt(this.payRoll.lastInsurance) + parseInt(this.payRoll.stampSign)+parseInt(this.payRoll.taxOnVariableAllowanceResult);
      // this.FirstTableTotal = parseFloat(this.degreeRoller[0].primarySalary) - parseFloat(this.discountsTotal);
      // this.FirstTableTotal = parseFloat(this.FirstTableTotal) - parseFloat(this.absenceLastValue);
      // this.taxAbsenceLastValue= parseFloat(this.absenceValueCalc) - parseFloat(this.absenceLastValue);
      // this.SecondTableTotal = parseInt(this.variableTax) -  parseInt (this.taxAbsenceLastValue);
      if(Object(this.absence).keys.length==0)
      {
        this.absenceLastValue= "0";
        this.absenceValueCalc = "0";
        this.hours="0";
      }
      else
      {
      this.absenceValue = parseInt(this.degreeRoller[0].value) / 192;
      this.hours = this.absence[0].hours;
      this.absenceValueCalc = parseInt(this.absenceValue)* parseInt(this.hours);
      this.absenceValueAfterDeduction = parseInt(this.absenceValue) * parseInt(this.hours);
      this.absenceLastValue = parseInt(this.degreeRoller[0].primarySalary) / parseInt(this.degreeRoller[0].value);
      this.absenceLastValue = parseFloat(this.absenceLastValue) * parseFloat(this.absenceValueAfterDeduction);
      this.absenceLastValue = parseInt(this.absenceLastValue.toFixed());
      }

      this.discountsTotal = parseInt(this.payRoll.firstInsurance)+parseInt(this.payRoll.stampBase)+parseInt(this.payRoll.personalTax);
      this.discountsSecondTotal = parseInt(this.payRoll.lastInsurance) + parseInt(this.payRoll.stampSign)+parseInt(this.payRoll.taxOnVariableAllowanceResult);
      this.FirstTableTotal = parseFloat(this.degreeRoller[0].primarySalary) - parseFloat(this.discountsTotal);
      this.FirstTableTotal = parseFloat(this.FirstTableTotal) - parseFloat(this.absenceLastValue);
      this.taxAbsenceLastValue= parseFloat(this.absenceValueCalc) - parseFloat(this.absenceLastValue);
      this.SecondTableTotal = parseInt(this.variableTax) -  parseInt (this.taxAbsenceLastValue);
      this.SecondTableTotal = parseInt(this.SecondTableTotal) - parseInt(this.discountsSecondTotal);
      this.lastAllTotalRoll = parseInt(this.FirstTableTotal) + parseInt(this.SecondTableTotal);
      this.lastAllTotalRoll= parseInt(this.lastAllTotalRoll.toFixed()).toLocaleString();
      this.FirstTableTotal= parseInt(this.FirstTableTotal.toFixed()).toLocaleString();
      this.SecondTableTotal= parseInt(this.SecondTableTotal.toFixed()).toLocaleString();
      this.payRoll.startingSalary = parseInt(this.payRoll.startingSalary.toFixed()).toLocaleString();
      this.payRoll.livingExpense = parseInt(this.payRoll.livingExpense.toFixed()).toLocaleString();
      this.payRoll.housingExpense = parseInt(this.payRoll.housingExpense.toFixed()).toLocaleString();
      this.payRoll.deportationExpense = parseInt(this.payRoll.deportationExpense.toFixed()).toLocaleString();
      this.payRoll.firstInsurance = parseInt(this.payRoll.firstInsurance.toFixed()).toLocaleString();
      this.payRoll.lastInsurance = parseInt(this.payRoll.lastInsurance.toFixed()).toLocaleString();
      this.payRoll.taxOnVariableAllowanceResult = parseInt(this.payRoll.taxOnVariableAllowanceResult.toFixed()).toLocaleString();
      this.payRoll.personalTax = parseInt(this.payRoll.personalTax.toFixed()).toLocaleString();
      this.payRoll.variableTax = parseInt(this.payRoll.variableTax.toFixed()).toLocaleString();
      this.discountsTotal = parseInt(this.discountsTotal.toFixed()).toLocaleString();
      this.discountsSecondTotal = parseInt(this.discountsSecondTotal.toFixed()).toLocaleString();
      this.payRoll.discountsTotal = this.discountsTotal;
      this.payRoll.absenceLastValue = this.absenceLastValue;
      this.payRoll.firstTableTotal = this.FirstTableTotal;
      this.payRoll.allowance1 = this.allowance1;
      this.payRoll.allowance2 = this.allowance2;
      this.payRoll.allowance3 = this.allowance3;
      this.payRoll.allowance4 = this.allowance4;
      this.payRoll.allowance5 = this.allowance5;
      this.payRoll.allowanceV1 = this.allowanceV1;
      this.payRoll.allowanceV2 = this.allowanceV2;
      this.payRoll.allowanceV3 = this.allowanceV3;
      this.payRoll.allowanceV4 = this.allowanceV4;
      this.payRoll.allowanceV5 = this.allowanceV5;
      this.payRoll.taxAbsenceLastValue = this.taxAbsenceLastValue;
      this.payRoll.discountsSecondTotal = this.discountsSecondTotal;
      this.payRoll.lastAllTotalRoll = this.lastAllTotalRoll;

      this.payRolls= [this.payRoll];

      }
    }

  payRollP(payRoll:any)
  {
    this.payRollService.addPayRoll(payRoll);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت التأكيد', life: 3000 });
    this.Disabled = true;
  }
  print()
  {
    if(localStorage.getItem("adminInvoicePrint1")==null)
    {
    localStorage.setItem("adminInvoiceEmpId",this.payRoll.empId);
    localStorage.setItem("adminInvoiceEmpName",this.payRoll.empName);
    localStorage.setItem("adminInvoiceEmpDept",this.Emp.dept);
    localStorage.setItem("adminInvoiceEmpType",this.Emp.type);
    localStorage.setItem("adminInvoicePrimarySalary",this.payRoll.primarySalary);
    localStorage.setItem("adminInvoicePrimaryFirstInsurance",this.payRoll.firstInsurance);
    localStorage.setItem("adminInvoiceStampBase",this.payRoll.stampBase);
    localStorage.setItem("adminInvoicePrimaryPersonalTax",this.payRoll.personalTax);
    localStorage.setItem("adminInvoiceTheBaseSubjectTax",this.payRoll.theBaseSubjectTax);
    localStorage.setItem("adminInvoiceNetBaseSalary",this.FirstTableTotal);
    localStorage.setItem("adminInvoiceStartingSalary",this.payRoll.startingSalary);
    localStorage.setItem("adminInvoiceLivingExpense",this.payRoll.livingExpense);
    localStorage.setItem("adminInvoiceDeportationExpense",this.payRoll.deportationExpense);
    localStorage.setItem("adminInvoiceHousingExpense",this.payRoll.housingExpense);
    localStorage.setItem("adminInvoiceDiscountsTotal",this.payRoll.discountsTotal);
    localStorage.setItem("adminInvoiceAbsenceLastValue",this.payRoll.absenceLastValue);
    localStorage.setItem("adminInvoiceFirstTableTotal",this.payRoll.secondTableTotal);
    localStorage.setItem("adminInvoiceMonth",this.month);
    this.router.navigate(["/adminInvoiceOne"]);
    }
    else
    {
    this.messageService.add({ severity: 'warning', summary: 'فشل', detail: 'تمت الطباعة من قبل', life: 3000 });
    }
  }
  print2()
  {
    if(localStorage.getItem("adminInvoicePrint2")==null)
    {
    localStorage.setItem("adminInvoiceEmpId",this.payRoll.empId);
    localStorage.setItem("adminInvoiceEmpName",this.payRoll.empName);
    localStorage.setItem("adminInvoiceEmpDept",this.Emp.dept);
    localStorage.setItem("adminInvoiceEmpType",this.Emp.type);
    localStorage.setItem("adminInvoiceVariableTax",this.payRoll.variableTax);
    localStorage.setItem("adminInvoiceLastInsurance",this.payRoll.lastInsurance);
    localStorage.setItem("adminInvoiceStampSign",this.payRoll.stampSign);
    localStorage.setItem("adminInvoiceTaxOnVariableAllowanceResult",this.payRoll.taxOnVariableAllowanceResult);
    localStorage.setItem("adminInvoiceTaxAbsenceLastValue",this.taxAbsenceLastValue);
    localStorage.setItem("adminInvoiceDiscountsSecondTotal",this.payRoll.discountsSecondTotal);
    localStorage.setItem("adminInvoiceAllowance1",this.payRoll.allowance1);
    localStorage.setItem("adminInvoiceAllowance2",this.payRoll.allowance2);
    localStorage.setItem("adminInvoiceAllowanc3",this.payRoll.allowance3);
    localStorage.setItem("adminInvoiceAllowance4",this.payRoll.allowance4);
    localStorage.setItem("adminInvoiceAllowance5",this.payRoll.allowance5);
    localStorage.setItem("adminInvoiceAllowanceV1",this.payRoll.allowanceV1);
    localStorage.setItem("adminInvoiceAllowanceV2",this.payRoll.allowanceV2);
    localStorage.setItem("adminInvoiceAllowanceV3",this.payRoll.allowanceV3);
    localStorage.setItem("adminInvoiceAllowanceV4",this.payRoll.allowanceV4);
    localStorage.setItem("adminInvoiceAllowanceV5",this.payRoll.allowanceV5);
    localStorage.setItem("adminInvoiceLastAllTotalRoll",this.payRoll.lastAllTotalRoll);
    localStorage.setItem("adminInvoiceMonth2",this.month);
    this.router.navigate(["/adminInvoiceTwo"]);}
    else
    {
    this.messageService.add({ severity: 'warning', summary: 'فشل', detail: 'تمت الطباعة من قبل', life: 3000 });
    }
  }
}
