import { Partial, PartialPayRoll, BooksAndResearch, PartialAdvance, PartialAdvanceAccount } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-partial-pay-roll-details',
  templateUrl: './partial-pay-roll-details.component.html',
  styleUrls: ['./partial-pay-roll-details.component.scss']
})
export class PartialPayRollDetailsComponent {
  name!: boolean;
  Partial!: Partial;
  partialPayRoll!: PartialPayRoll;
  partialPayRolls!: PartialPayRoll[];
  month: any;
  id: any;
  degreeRoller!: any;
  primarySalary!:any;
  booksAndResearch!:any;
  academicBase!:any;
  stamp!: any;
  contractValue!:any;
  persoanlTaxResult!: any;
  theBaseSubjectTax!: any;
  netBaseSalary!: any;
  netFinalSalary!: any;
  salaryBeforeDeduction!: any;
  salaryAfterDeduction!: any;
  Deductions!: any;
  employeeCost!: any;
  administrativeAssignment!:any;
  academicAllowance!:any;
  BooksAndResearch!:any;
  BooksAndResearchValue!:any;
  stampBase!: any;
  discountsTotal!: any;
  Disabled!:boolean;
  advance!: PartialAdvance[];
  advanceAccount!: PartialAdvanceAccount[];
  advanceTotal!:any;
  advancePeriod!:any;
  advanceBaseTotal!:any;
  advanceVariableTotal!:any;

  constructor(private router: Router, private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  async ngOnInit(): Promise<void> {
    const y = new Date().getFullYear();
    this.Partial = {} as Partial;
    this.partialPayRoll = {} as PartialPayRoll;
    this.month = localStorage.getItem("partialMonth");
    this.Partial.id = localStorage.getItem("partialId");
    this.Partial.name = localStorage.getItem("partialName");
    this.Partial.exp = localStorage.getItem("partialExp");
    this.Partial.degreeRoller = localStorage.getItem("partialDegreeRoller");
    this.Partial.administrativeAssignment = localStorage.getItem("partialAdministrativeAssignment");
    this.Partial.academicAllowance = localStorage.getItem("partialAcademicAllowance");
    this.Partial.contractValue = localStorage.getItem("partialContractValue");
    this.Partial.primarySalary = localStorage.getItem("partialPrimarySalary");
    this.Partial.department = localStorage.getItem("partialDepartment");
    this.Partial.program = localStorage.getItem("partialProgram");
    this.degreeRoller = this.Partial.degreeRoller;
    this.primarySalary = parseInt(this.Partial.primarySalary);
    this.contractValue = this.Partial.contractValue;
    this.administrativeAssignment = this.Partial.administrativeAssignment;
    this.academicAllowance = this.Partial.academicAllowance;

    ////////////////////////////////
    this.BooksAndResearch =await this.settingService.getBooksAndResearch("أكاديمي");
    this.stampBase = await this.settingService.getStampBaseByNamePromise("أكاديمي");
    this.BooksAndResearchValue = parseFloat(this.BooksAndResearch[0].value);
    this.stamp = parseInt(this.stampBase[0].value);
    this.BooksAndResearchValue  = parseInt(this.primarySalary) * parseFloat(this.BooksAndResearchValue);
    this.academicBase = parseInt(this.primarySalary) + parseInt(this.BooksAndResearchValue);
    this.netBaseSalary = parseInt(this.academicBase) - parseInt(this.stamp);
    this.theBaseSubjectTax = parseInt(this.Partial.contractValue)-parseInt(this.BooksAndResearchValue)-parseInt(this.stamp);
    this.advance = await this.settingService.getPartialAdvanceByPartialId(this.Partial.id);
      if(this.advance.length>0)
      {
        this.advanceAccount = await this.settingService.getPartialAdvanceAccountByPartialId(this.Partial.id);
      }
      else
      {
        console.log("Advance Account Error");
      }
      console.log(this.advance);
      console.log(this.advanceAccount);
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
    this.netFinalSalary =parseInt(this.Partial.contractValue)-parseInt(this.persoanlTaxResult)-parseInt(this.stamp);
    this.salaryBeforeDeduction = parseInt(this.Partial.contractValue);
    this.Deductions = parseInt(this.theBaseSubjectTax)+parseInt(this.stamp);
    this.salaryAfterDeduction = parseInt(this.theBaseSubjectTax)+parseInt(this.stamp);
    this.employeeCost = parseInt(this.salaryBeforeDeduction);
    this.advancePeriod = parseInt(this.advanceAccount[0].lastMonth) - parseInt (this.advanceAccount[0].firstMonth);
    this.advanceTotal = parseInt(this.advanceAccount[0].debit) / parseInt(this.advancePeriod);
    this.advanceBaseTotal = parseFloat(this.partialPayRoll.primarySalary) * 0.15;
    this.advanceVariableTotal = parseInt(this.advanceTotal) - parseInt(this.advanceBaseTotal);


    this.partialPayRoll.empId = this.Partial.id;
    this.partialPayRoll.empName = this.Partial.name;
    this.partialPayRoll.year = y;
    this.partialPayRoll.month = this.month;
    this.partialPayRoll.contractValue = this.Partial.contractValue;
    this.partialPayRoll.primarySalary = this.Partial.primarySalary;
    this.partialPayRoll.bookAndResearch = this.BooksAndResearchValue;
    this.partialPayRoll.academicBase = this.academicBase;
    this.partialPayRoll.stamp = this.stamp;
    this.partialPayRoll.theBaseSubjectTax = this.theBaseSubjectTax;
    this.partialPayRoll.personalTax = this.persoanlTaxResult;
    this.partialPayRoll.finalNetSalary = this.netFinalSalary;
    this.partialPayRoll.finalNetSalaryBeforeDiscount = this.salaryBeforeDeduction;
    this.partialPayRoll.finalSalaryDeduction = this.Deductions;
    this.partialPayRoll.finalSalaryAfterDeduction = this.salaryAfterDeduction;
    this.partialPayRoll.employeeCost = this.employeeCost;
    this.partialPayRoll.startingSalary = parseFloat(this.primarySalary) * 0.30;
    this.partialPayRoll.livingExpense = parseFloat(this.primarySalary) * 0.25;
    this.partialPayRoll.housingExpense = parseFloat(this.primarySalary) * 0.25;
    this.partialPayRoll.deportationExpense = parseFloat(this.primarySalary) * 0.20;
    this.partialPayRoll.valid = "0";
    this.partialPayRolls= [this.partialPayRoll];
    this.discountsTotal = parseInt(this.partialPayRoll.stamp)+parseInt(this.partialPayRoll.theBaseSubjectTax)+parseInt(this.partialPayRoll.personalTax);

  }

  payRollP(partialPayRoll:any)
  {
        this.settingService.addPartialPayRoll(partialPayRoll);
        this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم التأكيد', life: 3000 });
        this.Disabled = true;
  }
  print()
  {
    localStorage.setItem("partialInvoicePartialId",this.partialPayRoll.empId);
    localStorage.setItem("partialInvoicePartialName",this.partialPayRoll.empName);
    localStorage.setItem("partialInvoicePartialDept",this.Partial.department);
    localStorage.setItem("partialInvoicePartialProgram",this.Partial.program);
    localStorage.setItem("partialInvoicePrimarySalary",this.primarySalary);
    localStorage.setItem("partialInvoiceStampBase",this.partialPayRoll.stamp);
    localStorage.setItem("partialInvoicePrimaryPersonalTax",this.partialPayRoll.personalTax);
    localStorage.setItem("partialInvoiceTheBaseSubjectTax",this.partialPayRoll.theBaseSubjectTax);
    localStorage.setItem("partialInvoiceStartingSalary",this.partialPayRoll.startingSalary);
    localStorage.setItem("partialInvoiceLivingExpense",this.partialPayRoll.livingExpense);
    localStorage.setItem("partialInvoiceDeportationExpense",this.partialPayRoll.deportationExpense);
    localStorage.setItem("partialInvoiceHousingExpense",this.partialPayRoll.housingExpense);
    localStorage.setItem("partialInvoiceDiscountsTotal",this.discountsTotal);
    localStorage.setItem("academicBase",this.academicBase);
    localStorage.setItem("academicBookAndResearch",this.BooksAndResearchValue);
    localStorage.setItem("partialInvoiceMonth",this.month);
    localStorage.setItem("partialInvoiceProgram",this.Partial.program);
    localStorage.setItem("partialInvoiceDepartment",this.Partial.department);
    localStorage.setItem("partialInvoiceAdvanceTotal",this.advanceTotal);
    this.router.navigate(["/partialInvoice"]);
  }
}
