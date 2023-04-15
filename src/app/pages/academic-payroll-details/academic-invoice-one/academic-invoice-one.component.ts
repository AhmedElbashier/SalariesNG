import { BooksAndResearch } from './../../../services/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-academic-invoice-one',
  templateUrl: './academic-invoice-one.component.html',
  styleUrls: ['./style.css']
})
export class AcademicInvoiceOneComponent {
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
  academicBase!:any;
  BookAndResearch!:any;
  advanceTotal!:any;

  ngOnInit()
  {
    this.space = " ";
    const d = new Date().toLocaleDateString();
    this.date = d;
    const y = new Date().getFullYear();
    this.year = y;
    this.empId  =  localStorage.getItem("academicInvoiceEmpId");
    this.empName  =  localStorage.getItem("academicInvoiceEmpName");
    this.dept  =  localStorage.getItem("academicInvoiceEmpDept");
    this.type  =  localStorage.getItem("academicInvoiceEmpType");
    this.primarySalary  =  localStorage.getItem("academicInvoicePrimarySalary");
    this.firstInsurance  =  localStorage.getItem("academicInvoicePrimaryFirstInsurance");
    this.stampBase  =  localStorage.getItem("academicInvoiceStampBase");
    this.personalTax  =  localStorage.getItem("academicInvoicePrimaryPersonalTax");
    this.theBaseSubjectTax  =  localStorage.getItem("academicInvoiceTheBaseSubjectTax");
    this.FirstTableTotal  =  localStorage.getItem("academicInvoiceNetBaseSalary");
    this.startingSalary = localStorage.getItem("academicInvoiceStartingSalary");
    this.livingExpense = localStorage.getItem("academicInvoiceLivingExpense");
    this.deportationExpense = localStorage.getItem("academicInvoiceDeportationExpense");
    this.housingExpense = localStorage.getItem("academicInvoiceHousingExpense");
    this.discountsTotal = localStorage.getItem("academicInvoiceDiscountsTotal");
    this.absenceLastValue = localStorage.getItem("academicInvoiceAbsenceLastValue");
    this.firstTableTotal = localStorage.getItem("academicInvoiceFirstTableTotal");
    this.academicBase = localStorage.getItem("academicBase");
    this.BookAndResearch = localStorage.getItem("academicBookAndResearch");
    this.advanceTotal = localStorage.getItem("adminInvoiceAdvanceBaseTotal");
    this.primarySalary = parseInt(this.primarySalary).toLocaleString();
    this.personalTax = parseInt(this.personalTax).toLocaleString();
    this.theBaseSubjectTax = parseInt(this.theBaseSubjectTax).toLocaleString();
    this.advanceTotal = parseInt(this.advanceTotal).toLocaleString();
    console.log(this.discountsTotal);
    if(this.absenceLastValue==="undefined")
    {
    this.absenceLastValue = 0;
    }
    this.month  =  localStorage.getItem("academicInvoiceMonth");
    if(this.month=="1")
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
    localStorage.setItem("academicInvoicePrint1","1");
  }
}
