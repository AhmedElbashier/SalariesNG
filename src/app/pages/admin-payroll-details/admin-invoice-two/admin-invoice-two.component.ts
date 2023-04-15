import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-invoice-two',
  templateUrl: './admin-invoice-two.component.html',
  styleUrls: ['./style.css']
})
export class AdminInvoiceTwoComponent {
  empId!:any;
  empName!:any;
  dept!:any;
  type!:any;
  variableTax!:any;
  lastInsurance!:any;
  stampSign!:any;
  personalTax!:any;
  theBaseSubjectTax!:any;
  FirstTableTotal!:any;
  month!:any;
  date!:any;
  year!:any;
  space!:any;
  startingSalary!:any;
  livingExpense!:any;
  deportationExpense!:any;
  housingExpense!:any;
  discountsSecondTotal!:any;
  taxAbsenceLastValue!:any;
  firstTableTotal!:any
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
  taxOnVariableAllowanceResult!:any;
  lastAllTotalRoll!:any;
  advanceTotal!:any;

  ngOnInit()
  {
    this.space = " ";
    const d = new Date().toLocaleDateString();
    this.date = d;
    const y = new Date().getFullYear();
    this.year = y;
    this.empId  =  localStorage.getItem("adminInvoiceEmpId");
    this.empName  =  localStorage.getItem("adminInvoiceEmpName");
    this.dept  =  localStorage.getItem("adminInvoiceEmpDept");
    this.type  =  localStorage.getItem("adminInvoiceEmpType");
    this.variableTax  =  localStorage.getItem("adminInvoiceVariableTax");
    this.lastInsurance  =  localStorage.getItem("adminInvoiceLastInsurance");
    this.stampSign  =  localStorage.getItem("adminInvoiceStampSign");
    this.taxOnVariableAllowanceResult  =  localStorage.getItem("adminInvoiceTaxOnVariableAllowanceResult");
    this.taxAbsenceLastValue  =  localStorage.getItem("adminInvoiceTaxAbsenceLastValue");
    this.discountsSecondTotal = localStorage.getItem("adminInvoiceDiscountsSecondTotal");
    this.allowance1 = localStorage.getItem("adminInvoiceAllowance1");
    this.allowance2 = localStorage.getItem("adminInvoiceAllowance2");
    this.allowance3 = localStorage.getItem("adminInvoiceAllowanc3");
    this.allowance4 = localStorage.getItem("adminInvoiceAllowance4");
    this.allowance5 = localStorage.getItem("adminInvoiceAllowance5");
    this.allowanceV1 = localStorage.getItem("adminInvoiceAllowanceV1");
    this.allowanceV2 = localStorage.getItem("adminInvoiceAllowanceV2");
    this.allowanceV3 = localStorage.getItem("adminInvoiceAllowanceV3");
    this.allowanceV4 = localStorage.getItem("adminInvoiceAllowanceV4");
    this.allowanceV5 = localStorage.getItem("adminInvoiceAllowanceV5");
    this.advanceTotal = localStorage.getItem("adminInvoiceAdvanceVariableTotal");
    this.lastAllTotalRoll = localStorage.getItem("adminInvoiceLastAllTotalRoll");
    this.allowanceV1 = parseInt(this.allowanceV1).toLocaleString();
    this.allowanceV2 = parseInt(this.allowanceV2).toLocaleString();
    this.allowanceV3 = parseInt(this.allowanceV3).toLocaleString();
    this.allowanceV4 = parseInt(this.allowanceV4).toLocaleString();
    this.allowanceV5 = parseInt(this.allowanceV5).toLocaleString();
    this.advanceTotal = parseInt(this.advanceTotal).toLocaleString();

    this.stampSign = parseInt(this.stampSign).toLocaleString();

    this.month  =  localStorage.getItem("adminInvoiceMonth2");
    if(this.month=="1")
    {
      this.month="يناير";
    }
    else if(this.month=="2")
    {
      this.month="يناير";
    }
    else if(this.month=="2")
    {
      this.month="فبراير";
    }
    else if(this.month=="3")
    {
      this.month="مارس";
    }
    else if(this.month=="4")
    {
      this.month="ابريل";
    }
    else if(this.month=="5")
    {
      this.month="مايو";
    }
    else if(this.month=="6")
    {
      this.month="يونيو";
    }
    else if(this.month=="7")
    {
      this.month="يوليو";
    }
    else if(this.month=="8")
    {
      this.month="أغسطس";
    }
    else if(this.month=="9")
    {
      this.month="سبتمبر";
    }
    else if(this.month=="10")
    {
      this.month="أكتوبر";
    }
    else if(this.month=="11")
    {
      this.month="نوفمبر";
    }
    else if(this.month=="12")
    {
      this.month="ديسمبر";
    }
  }
}
