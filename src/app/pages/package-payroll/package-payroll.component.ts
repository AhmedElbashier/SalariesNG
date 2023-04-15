import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Package,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-package-payroll',
  templateUrl: './package-payroll.component.html',
  styleUrls: ['./package-payroll.component.scss']
})
export class PackagePayrollComponent {
  @ViewChild('dt') dt: Table | undefined;

  PackagesDialog!: boolean;
  PackagesEditDialog!: boolean;
  Packages!: Package[];
  Package!: Package;
  selectedPackages!: Package[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];
  month:any;
  MonthDialog!:boolean;
  exportColumns!: any[];
  package!:Package;
  constructor(private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }
  applyFilterGlobal($event: any, stringVal: any) {
      this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  ngOnInit() {
      this.Delete = "حذف";
      this.settingService.getPackages().subscribe(
          (res: any) => {
              this.Packages = res
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'حطأ',
              detail: 'توجد مشكلة في التواصل مع قاعدة البيانات   ',
              life: 3000,
            });
          });

  }
  openNew() {

      this.Package = {};
      this.submitted = false;
      this.PackagesDialog = true;
  }
  editPackages(Packages: Package) {
      this.Package = { ...Packages };
      this.PackagesEditDialog = true;
  }
  deletePackages(Packages: Package) {
      this.confirmationService.confirm({
          message: 'هل انت متأكد من أنك تريد حذف الحزمة  ' + Packages.name + '؟',
          header: 'تأكيد  ',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.Packages = this.Packages.filter(val => val.id !== Packages.id);
              this.settingService.deletePackage(Packages.id);
              this.Package = {};
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف الحزمة', life: 3000 });
          }
      });
  }

  details(Package:any)
  {
    this.confirmationService.confirm({
      message: 'الرجاء معرفة ان فترة التجزئة هي  ' + Package.period + ' اشهر' +"\n ابتداءً من شهر "+Package.firstMonth,
      header: 'تأكيد  ',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
      this.MonthDialog = true;
      this.package = Package;
      }
    });
  }
  detailsD(month:any,Package:any)
  {
    if(month == null)
    {
      this.messageService.add({
        severity: 'warn',
        summary: 'حطأ',
        detail: 'الرجاء تحديد الشهر اولاً',
        life: 3000,
      });
    }
    else
    {
    if(this.package.period=="3")

        if(month==this.package.firstMonth||month==this.package.secondMonth||month==this.package.thirdMonth)
        {
          if(this.package.firstMonthPayRoll=="0")
          {
                  if(month==this.package.firstMonth)
                  {
                    localStorage.setItem("packageMonth",month);
                    localStorage.setItem("packageId",this.package.id);
                    localStorage.setItem("packageName",this.package.name);
                    localStorage.setItem("packageProgram",this.package.program);
                    localStorage.setItem("packageSylbus",this.package.sylbus);
                    localStorage.setItem("packageSemester",this.package.semester);
                    localStorage.setItem("packagePeriod",this.package.period);
                    localStorage.setItem("packageFirstMonth",this.package.firstMonth);
                    localStorage.setItem("packageSecondMonth",this.package.secondMonth);
                    localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
                    localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
                    localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
                    localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
                    localStorage.setItem("packageAmount",this.package.amount);
                    this.router.navigate(["dashboard/packagePayrollDetails"]);
                  }
                  else
                  {
                    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'الرجاء صرف مرتب الشهر السابق اولاً', life: 3000 });
                  }

            }
          else if(month==this.package.firstMonth&&this.package.firstMonthPayRoll=="1"&&this.package.secondMonthPayRoll=="0"&&this.package.thirdMonthPayRoll=="0")
          {
              this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تم صرف هذا الشهر مسبقاً الرجاء اختيار الشهر التالي', life: 3000 });

          }
          else if(this.package.secondMonthPayRoll=="0"&&this.package.firstMonthPayRoll=="1")
          {
            if(month==this.package.secondMonth)
            {
              localStorage.setItem("packageMonth",month);
              localStorage.setItem("packageId",this.package.id);
              localStorage.setItem("packageName",this.package.name);
              localStorage.setItem("packageProgram",this.package.program);
              localStorage.setItem("packageSylbus",this.package.sylbus);
              localStorage.setItem("packageSemester",this.package.semester);
              localStorage.setItem("packagePeriod",this.package.period);
              localStorage.setItem("packageFirstMonth",this.package.firstMonth);
              localStorage.setItem("packageSecondMonth",this.package.secondMonth);
              localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
              localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
              localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
              localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
              localStorage.setItem("packageAmount",this.package.amount);
              this.router.navigate(["dashboard/packagePayrollDetails"]);
            }
            else
            {
              this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'الرجاء صرف مرتب الشهر السابق اولاً', life: 3000 });
            }

          }
          else if(month==this.package.secondMonth&&this.package.firstMonthPayRoll=="1"&&this.package.secondMonthPayRoll=="1"&&this.package.thirdMonthPayRoll=="0")
          {
              this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تم صرف هذا الشهر مسبقاً الرجاء اختيار الشهر التالي', life: 3000 });

          }
          else if(month==this.package.thirdMonth&&this.package.thirdMonthPayRoll=="0"&&this.package.firstMonthPayRoll=="1"&&this.package.secondMonthPayRoll=="1")
          {

              localStorage.setItem("packageMonth",month);
              localStorage.setItem("packageId",this.package.id);
              localStorage.setItem("packageName",this.package.name);
              localStorage.setItem("packageProgram",this.package.program);
              localStorage.setItem("packageSylbus",this.package.sylbus);
              localStorage.setItem("packageSemester",this.package.semester);
              localStorage.setItem("packagePeriod",this.package.period);
              localStorage.setItem("packageFirstMonth",this.package.firstMonth);
              localStorage.setItem("packageSecondMonth",this.package.secondMonth);
              localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
              localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
              localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
              localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
              localStorage.setItem("packageAmount",this.package.amount);
              this.router.navigate(["dashboard/packagePayrollDetails"]);
          }
          else
          {
              this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'لقد تم صرف كل مرتبات فترة التجزئة', life: 3000 });
          }
        }
        else
        {
          this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'الشهر خارج فترة التجزئة \n الرجاء اختيار الشهر مجددا', life: 3000 });
        }
    else if (this.package.period=="2")
    {
      if(month==this.package.firstMonth||month==this.package.secondMonth)
        {
          if(this.package.firstMonthPayRoll=="0")
          {
                  if(month==this.package.firstMonth)
                  {
                    localStorage.setItem("packageMonth",month);
                    localStorage.setItem("packageId",this.package.id);
                    localStorage.setItem("packageName",this.package.name);
                    localStorage.setItem("packageProgram",this.package.program);
                    localStorage.setItem("packageSylbus",this.package.sylbus);
                    localStorage.setItem("packageSemester",this.package.semester);
                    localStorage.setItem("packagePeriod",this.package.period);
                    localStorage.setItem("packageFirstMonth",this.package.firstMonth);
                    localStorage.setItem("packageSecondMonth",this.package.secondMonth);
                    localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
                    localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
                    localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
                    localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
                    localStorage.setItem("packageAmount",this.package.amount);
                    this.router.navigate(["dashboard/packagePayrollDetails"]);
                  }
                  else
                  {
                    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'الرجاء صرف مرتب الشهر السابق اولاً', life: 3000 });
                  }

            }
          else if(month==this.package.firstMonth&&this.package.firstMonthPayRoll=="1"&&this.package.secondMonthPayRoll=="0"&&this.package.thirdMonthPayRoll=="0")
          {
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم صرف هذا الشهر مسبقاً الرجاء اختيار الشهر التالي', life: 3000 });

          }
          else if(this.package.secondMonthPayRoll=="0"&&this.package.firstMonthPayRoll=="1")
          {
            if(month==this.package.secondMonth)
            {
              localStorage.setItem("packageMonth",month);
              localStorage.setItem("packageId",this.package.id);
              localStorage.setItem("packageName",this.package.name);
              localStorage.setItem("packageProgram",this.package.program);
              localStorage.setItem("packageSylbus",this.package.sylbus);
              localStorage.setItem("packageSemester",this.package.semester);
              localStorage.setItem("packagePeriod",this.package.period);
              localStorage.setItem("packageFirstMonth",this.package.firstMonth);
              localStorage.setItem("packageSecondMonth",this.package.secondMonth);
              localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
              localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
              localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
              localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
              localStorage.setItem("packageAmount",this.package.amount);
              this.router.navigate(["dashboard/packagePayrollDetails"]);
            }
            else
            {
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'الرجاء صرف مرتب الشهر السابق اولاً', life: 3000 });
            }

          }
          else
          {
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'لقد تم صرف كل مرتبات فترة التجزئة', life: 3000 });
          }
        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'الشهر خارج فترة التجزئة \n الرجاء اختيار الشهر مجددا', life: 3000 });
        }
    }
    else if (this.package.period=="1")
    {
      if(month==this.package.firstMonth)
        {
          if(this.package.firstMonthPayRoll=="0")
          {
                  if(month==this.package.firstMonth)
                  {
                    localStorage.setItem("packageMonth",month);
                    localStorage.setItem("packageId",this.package.id);
                    localStorage.setItem("packageName",this.package.name);
                    localStorage.setItem("packageProgram",this.package.program);
                    localStorage.setItem("packageSylbus",this.package.sylbus);
                    localStorage.setItem("packageSemester",this.package.semester);
                    localStorage.setItem("packagePeriod",this.package.period);
                    localStorage.setItem("packageFirstMonth",this.package.firstMonth);
                    localStorage.setItem("packageSecondMonth",this.package.secondMonth);
                    localStorage.setItem("packageThirdMonth",this.package.thirdMonth);
                    localStorage.setItem("packageFirstMonthPayRoll",this.package.firstMonthPayRoll);
                    localStorage.setItem("packageSecondMonthPayRoll",this.package.secondMonthPayRoll);
                    localStorage.setItem("packageThirdMonthPayRoll",this.package.thirdMonthPayRoll);
                    localStorage.setItem("packageAmount",this.package.amount);
                    this.router.navigate(["dashboard/packagePayrollDetails"]);
                  }
            }
          else if(month==this.package.firstMonth&&this.package.firstMonthPayRoll=="1")
          {
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'لقد تم صرف هذا المرتب لأن مرتب هذه الحزمة يصرف على شهر واحد', life: 3000 });

          }

        }
        else
        {
          this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'الشهر خارج فترة التجزئة \n الرجاء اختيار الشهر مجددا', life: 3000 });
        }
    }
  }

  }
  hideDialog() {
      this.PackagesDialog = false;
      this.submitted = false;
      this.MonthDialog = false;
  }
  editPackagesD(Packages: Package) {
      this.settingService.editPackage(Packages);
      this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الحزمة بنجاح', life: 3000 });
      this.Packages = [...this.Packages];
      this.PackagesDialog = false;
      this.Package = {};
  }
  savePackages(Packages: Package) {
      this.submitted = true;
      this.settingService.addPackage(Packages);
      this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الحزمة بنجاح', life: 3000 });
      this.Packages = [...this.Packages];
      this.PackagesDialog = false;
      this.Package = {};
  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.Packages.length; i++) {
          if (this.Packages[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  exportExcel() {
      const xlsx = "xlsx";
      import(xlsx).then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.Packages);
          const workbook = { Sheets: { 'الحزم': worksheet }, SheetNames: ['الحزم'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "الحزم");

      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data,fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION);
  }
  }
