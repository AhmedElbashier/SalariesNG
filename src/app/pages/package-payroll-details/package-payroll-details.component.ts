import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Package,PackagePayRoll,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-package-payroll-details',
  templateUrl: './package-payroll-details.component.html',
  styleUrls: ['./package-payroll-details.component.scss']
})
export class PackagePayrollDetailsComponent {
  @ViewChild('dt') dt: Table | undefined;

  Disabled!: boolean;
  PackagesDialog!: boolean;
  PackagesEditDialog!: boolean;
  Packages!: Package[];
  Package!: Package;
  PackagePayRolls!: PackagePayRoll[];
  PackagePayRoll!: PackagePayRoll;
  selectedPackages!: Package[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];
  month:any;
  MonthDialog!:boolean;
  exportColumns!: any[];
  left:any;
  left1:any;
  left2:any;

  constructor(private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }
  applyFilterGlobal($event: any, stringVal: any) {
      this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
 async ngOnInit(): Promise<void> {
  const options = { style: "decimal", useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2, decimalSeparator: "," };
    this.Package = {} as  Package;
    this.PackagePayRoll = {} as  PackagePayRoll;
    this.PackagePayRolls = {} as  PackagePayRoll[];
    this.month = localStorage.getItem("packageMonth");
    this.Package.id = localStorage.getItem("packageId");
    this.Package.name = localStorage.getItem("packageName");
    this.Package.program = localStorage.getItem("packageProgram");
    this.Package.sylbus = localStorage.getItem("packageSylbus");
    this.Package.semester = localStorage.getItem("packageSemester");
    this.Package.period = localStorage.getItem("packagePeriod");
    this.Package.firstMonth = localStorage.getItem("packageFirstMonth");
    this.Package.secondMonth = localStorage.getItem("packageSecondMonth");
    this.Package.thirdMonth = localStorage.getItem("packageThirdMonth");
    this.Package.firstMonthPayRoll = localStorage.getItem("packageFirstMonthPayRoll");
    this.Package.secondMonthPayRoll = localStorage.getItem("packageSecondMonthPayRoll");
    this.Package.thirdMonthPayRoll = localStorage.getItem("packageThirdMonthPayRoll");
    this.Package.amount = localStorage.getItem("packageAmount")
    const y = new Date().getFullYear();
    if(this.Package.period=="1")
    {
      this.PackagePayRoll.packageId = this.Package.id;
      this.PackagePayRoll.name = this.Package.name;
      this.PackagePayRoll.program = this.Package.program;
      this.PackagePayRoll.sylbus = this.Package.sylbus;
      this.PackagePayRoll.semester = this.Package.semester;
      this.PackagePayRoll.period = "شهر واحد";
      this.PackagePayRoll.firstMonth = this.Package.firstMonth;
      this.PackagePayRoll.secondMonth = "لا يوجد";
      this.PackagePayRoll.thirdMonth = "لا يوجد";
      this.PackagePayRoll.firstMonthPayRoll = "1";
      this.PackagePayRoll.secondMonthPayRoll = "0";
      this.PackagePayRoll.thirdMonthPayRoll = "0";
      this.PackagePayRoll.amount = this.Package.amount;
      this.PackagePayRoll.left = "0";
      this.PackagePayRoll.payRollYear = y;
      this.PackagePayRoll.payRollMonth = this.month;
      this.PackagePayRoll.user = "Admin";
      this.Package.firstMonthPayRoll="1";
      this.Package.secondMonthPayRoll="0";
      this.Package.thirdMonthPayRoll="0";
      this.PackagePayRolls= [this.PackagePayRoll];
    }
    if(this.Package.period=="2")
    {
      if(this.Package.firstMonthPayRoll=="0")
      {
        this.PackagePayRoll.amount = parseInt(this.PackagePayRoll.amount)/2;
        this.PackagePayRoll.left = parseInt(this.PackagePayRoll.amount.toFixed()).toLocaleString();
      }
      this.PackagePayRoll.packageId = this.Package.id;
      this.PackagePayRoll.name = this.Package.name;
      this.PackagePayRoll.program = this.Package.program;
      this.PackagePayRoll.sylbus = this.Package.sylbus;
      this.PackagePayRoll.semester = this.Package.semester;
      this.PackagePayRoll.period = "شهرين";
      this.PackagePayRoll.firstMonth = this.Package.firstMonth;
      this.PackagePayRoll.secondMonth = this.Package.secondMonth
      this.PackagePayRoll.thirdMonth = "لا يوجد";
      this.PackagePayRoll.firstMonthPayRoll = "1";
      this.PackagePayRoll.secondMonthPayRoll = "1";
      this.PackagePayRoll.thirdMonthPayRoll = "0";
      this.PackagePayRoll.amount = parseInt(this.PackagePayRoll.amount)/2;
      this.PackagePayRoll.left = parseInt(this.PackagePayRoll.amount.toFixed()).toLocaleString();
      this.PackagePayRoll.payRollYear = y;
      this.PackagePayRoll.payRollMonth = this.month;
      this.PackagePayRoll.user = "Admin";
      this.Package.firstMonthPayRoll="1";
      this.Package.secondMonthPayRoll="1";
      this.Package.thirdMonthPayRoll="0";
      this.PackagePayRolls= [this.PackagePayRoll];
    }
    if(this.Package.period=="3")
    {
      if(this.Package.firstMonthPayRoll=="0"&&this.Package.thirdMonthPayRoll=="0"&&this.Package.secondMonthPayRoll=="0")
      {
        this.PackagePayRoll.left=parseInt((this.Package.amount-this.Package.amount/3).toFixed());
      }
      else if(this.Package.secondMonthPayRoll=="0"&&this.Package.firstMonthPayRoll=="1")
      {
        this.PackagePayRoll.left=parseInt((this.Package.amount-this.Package.amount/3*(2)).toFixed());
        // this.PackagePayRoll.left = parseInt((this.PackagePayRoll.left + this.PackagePayRoll.left).toFixed()).toLocaleString();
      }
      else if(this.Package.thirdMonthPayRoll=="0"&&this.Package.secondMonthPayRoll=="1"&&this.Package.firstMonthPayRoll=="1")
      {
        this.PackagePayRoll.left="0";
      }
      this.PackagePayRoll.packageId = this.Package.id;
      this.PackagePayRoll.name = this.Package.name;
      this.PackagePayRoll.program = this.Package.program;
      this.PackagePayRoll.sylbus = this.Package.sylbus;
      this.PackagePayRoll.semester = this.Package.semester;
      this.PackagePayRoll.period = "ثلاثة أشهر";
      this.PackagePayRoll.firstMonth = this.Package.firstMonth;
      this.PackagePayRoll.secondMonth = this.Package.secondMonth;
      this.PackagePayRoll.thirdMonth = this.Package.thirdMonth;
      this.PackagePayRoll.firstMonthPayRoll = "1";
      this.PackagePayRoll.secondMonthPayRoll = "1";
      this.PackagePayRoll.thirdMonthPayRoll = "1";
      this.PackagePayRoll.amount = parseInt(this.Package.amount) - parseInt(this.PackagePayRoll.left);
      this.PackagePayRoll.payRollYear = y;
      this.PackagePayRoll.payRollMonth = this.month;
      this.PackagePayRoll.user = "Admin";
      this.Package.firstMonthPayRoll="1";
      this.Package.secondMonthPayRoll="1";
      this.Package.thirdMonthPayRoll="1";
      this.PackagePayRolls= [this.PackagePayRoll];
    }

  }
  async payRoll(payRoll:any)
  {
    await this.settingService.editPackage(this.Package);
    await this.settingService.addPackagePayRoll(payRoll);
    this.messageService.add({
      severity: 'success',
      summary: 'تم',
      detail: 'تم تأكيد التسليم و التسلم بنجاح',
      life: 3000,
    });
    this.Disabled = true;
  }
  print()
  {
    localStorage.setItem("packageInvoiceId",this.PackagePayRoll.id);
    localStorage.setItem("packageInvoicePackageId",this.PackagePayRoll.packageId);
    localStorage.setItem("packageInvoiceName",this.PackagePayRoll.name);
    localStorage.setItem("packageInvoiceProgram",this.PackagePayRoll.program);
    localStorage.setItem("packageInvoiceSylbus",this.PackagePayRoll.sylbus);
    localStorage.setItem("packageInvoiceSemester",this.PackagePayRoll.semester);
    localStorage.setItem("packageInvoicePeriod",this.PackagePayRoll.period);
    localStorage.setItem("packageInvoiceFirstMonth",this.PackagePayRoll.firstMonth);
    localStorage.setItem("packageInvoiceSecondMonth",this.PackagePayRoll.secondMonth);
    localStorage.setItem("packageInvoiceThirdMonth",this.PackagePayRoll.thirdMonth);
    localStorage.setItem("packageInvoiceFirstMonthPayRoll",this.PackagePayRoll.firstMonthPayRoll);
    localStorage.setItem("packageInvoiceSecondMonthPayRoll",this.PackagePayRoll.secondMonthPayRoll);
    localStorage.setItem("packageInvoiceThirdMonthPayRoll",this.PackagePayRoll.thirdMonthPayRoll);
    localStorage.setItem("packageInvoiceAmount",this.PackagePayRoll.amount);
    localStorage.setItem("packageInvoicePayRollMonth",this.PackagePayRoll.payRollMonth);
    localStorage.setItem("packageInvoicePayRollYear",this.PackagePayRoll.payRollYear);
    localStorage.setItem("packageInvoiceLeft",this.PackagePayRoll.left);
    localStorage.setItem("packageInvoiceUser",this.PackagePayRoll.user);
    this.router.navigate(["/packageInvoice"]);
  }
}
