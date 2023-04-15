import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-invoice-one',
  templateUrl: './admin-invoice-one.component.html',
  styleUrls: ['./style.css']
})
export class AdminInvoiceOneComponent {

  empId!:any;
  empName!:any;
  dept!:any;
  type!:any;
  primarySalary!:any;
  firstInsurance!:any;
  stampBase!:any;
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
  discountsTotal!:any;
  absenceLastValue!:any;
  firstTableTotal!:any
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
    this.primarySalary  =  localStorage.getItem("adminInvoicePrimarySalary");
    this.firstInsurance  =  localStorage.getItem("adminInvoicePrimaryFirstInsurance");
    this.stampBase  =  localStorage.getItem("adminInvoiceStampBase");
    this.personalTax  =  localStorage.getItem("adminInvoicePrimaryPersonalTax");
    this.theBaseSubjectTax  =  localStorage.getItem("adminInvoiceTheBaseSubjectTax");
    this.FirstTableTotal  =  localStorage.getItem("adminInvoiceNetBaseSalary");
    this.startingSalary = localStorage.getItem("adminInvoiceStartingSalary");
    this.livingExpense = localStorage.getItem("adminInvoiceLivingExpense");
    this.deportationExpense = localStorage.getItem("adminInvoiceDeportationExpense");
    this.housingExpense = localStorage.getItem("adminInvoiceHousingExpense");
    this.discountsTotal = localStorage.getItem("adminInvoiceDiscountsTotal");
    this.absenceLastValue = localStorage.getItem("adminInvoiceAbsenceLastValue");
    this.firstTableTotal = localStorage.getItem("adminInvoiceFirstTableTotal");
    this.advanceTotal = localStorage.getItem("adminInvoiceAdvanceBaseTotal");
    this.primarySalary = parseInt(this.primarySalary).toLocaleString();
    this.personalTax = parseInt(this.personalTax).toLocaleString();
    this.theBaseSubjectTax = parseInt(this.theBaseSubjectTax).toLocaleString();
    this.advanceTotal = parseInt(this.advanceTotal).toLocaleString();

    this.month  =  localStorage.getItem("adminInvoiceMonth");
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
    localStorage.setItem("adminInvoicePrint1","1");
  }
}
