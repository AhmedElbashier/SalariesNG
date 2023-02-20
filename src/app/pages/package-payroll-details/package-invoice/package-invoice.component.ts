import { Component } from '@angular/core';

@Component({
  selector: 'app-package-invoice',
  templateUrl: './package-invoice.component.html',
  styleUrls: ['./style.css']
})
export class PackageInvoiceComponent {
  id!: any;
  packageId!: any;
  name!: any;
  program!: any;
  sylbus!: any;
  semester!: any;
  period!: any;
  firstMonth!: any;
  secondMonth!: any;
  thirdMonth!: any;
  firstMonthPayRoll!: any;
  secondMonthPayRoll!: any;
  thirdMonthPayRoll!: any;
  amount!: any;
  payRollMonth!:any;
  payRollYear!:any;
  left!:any;
  user!:any;
  space!:any;
  date:any;
  ngOnInit()
  {
    this.space="";
    this.id = localStorage.getItem("packageInvoiceId");
    this.packageId = localStorage.getItem("packageInvoicePackageId");
    this.name = localStorage.getItem("packageInvoiceName");
    this.program = localStorage.getItem("packageInvoiceProgram");
    this.sylbus = localStorage.getItem("packageInvoiceSylbus");
    this.semester = localStorage.getItem("packageInvoiceSemester");
    this.period = localStorage.getItem("packageInvoicePeriod");
    this.firstMonth = localStorage.getItem("packageInvoiceFirstMonth");
    this.secondMonth = localStorage.getItem("packageInvoiceSecondMonth");
    this.thirdMonth = localStorage.getItem("packageInvoiceThirdMonth");
    this.firstMonthPayRoll = localStorage.getItem("packageInvoiceFirstMonthPayRoll");
    this.secondMonthPayRoll = localStorage.getItem("packageInvoiceSecondMonthPayRoll");
    this.thirdMonthPayRoll = localStorage.getItem("packageInvoiceThirdMonthPayRoll");
    this.amount = localStorage.getItem("packageInvoiceAmount");
    this.payRollMonth = localStorage.getItem("packageInvoicePayRollMonth");
    this.payRollYear = localStorage.getItem("packageInvoicePayRollYear");
    this.left = localStorage.getItem("packageInvoiceLeft");
    this.user = localStorage.getItem("packageInvoiceUser");
    const d = new Date().toLocaleDateString();
    this.date = d;
    console.log(this.payRollMonth)
    if(this.payRollMonth=="1")
    {
      this.payRollMonth="يناير";
    }
    if(this.payRollMonth=="2")
    {
      this.payRollMonth="فبراير";
    }
    if(this.payRollMonth=="3")
    {
      this.payRollMonth="مارس";
    }
    if(this.payRollMonth=="4")
    {
      this.payRollMonth="ابريل";
    }
    if(this.payRollMonth=="5")
    {
      this.payRollMonth="مايو";
    }
    if(this.payRollMonth=="6")
    {
      this.payRollMonth="يونيو";
    }
    if(this.payRollMonth=="7")
    {
      this.payRollMonth="يوليو";
    }
    if(this.payRollMonth=="8")
    {
      this.payRollMonth="اغسطس";
    }
    if(this.payRollMonth=="9")
    {
      this.payRollMonth="سبتمبر";
    }
    if(this.payRollMonth=="10")
    {
      this.payRollMonth="اكتوبر";
    }
    if(this.payRollMonth=="11")
    {
      this.payRollMonth="نوفمبر";
    }
    if(this.payRollMonth=="12")
    {
      this.payRollMonth="ديسيمبر";
    }
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    if(this.firstMonth=="1")
    {
      this.firstMonth="يناير";
    }
    if(this.firstMonth=="2")
    {
      this.firstMonth="فبراير";
    }
    if(this.firstMonth=="3")
    {
      this.firstMonth="مارس";
    }
    if(this.firstMonth=="4")
    {
      this.firstMonth="ابريل";
    }
    if(this.firstMonth=="5")
    {
      this.firstMonth="مايو";
    }
    if(this.firstMonth=="6")
    {
      this.firstMonth="يونيو";
    }
    if(this.firstMonth=="7")
    {
      this.firstMonth="يوليو";
    }
    if(this.firstMonth=="8")
    {
      this.firstMonth="اغسطس";
    }
    if(this.firstMonth=="9")
    {
      this.firstMonth="سبتمبر";
    }
    if(this.firstMonth=="10")
    {
      this.firstMonth="اكتوبر";
    }
    if(this.firstMonth=="11")
    {
      this.firstMonth="نوفمبر";
    }
    if(this.firstMonth=="12")
    {
      this.firstMonth="ديسيمبر";
    }
  }
}
