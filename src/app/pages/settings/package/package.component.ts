import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Package, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
})
export class PackageComponent {
  @ViewChild('dt') dt: Table | undefined;

  PackagesDialog!: boolean;
  PackagesEditDialog!: boolean;
  Packages!: Package[];
  Package!: Package;
  selectedPackages!: Package[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];

  exportColumns!: any[];

  constructor(
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  ngOnInit() {
    this.Delete = 'حذف';
    this.getData();
  }
  getData() {
    this.settingService.getPackages().subscribe(
      (res: any) => {
        this.Packages = res;
        this.cdr.detectChanges();
        console.log('Sucess', res);
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'تم',
          detail:
            'حدث خطأ في عرض البيانات, الرجاء التحقق من الاتصال بقاعدة البيانات',
          life: 3000,
        });
      }
    );
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
        this.settingService.deletePackage(Packages.id).then(
          (res) => {
            this.Packages = this.Packages.filter(
              (val) => val.id !== Packages.id
            );
            this.messageService.add({
              severity: 'error',
              summary: 'تم ',
              detail: 'تم حذف الحزمة',
              life: 3000,
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'فشل',
              detail: 'حدث خطأ ',
              life: 3000,
            });
          }
        );
        this.Package = {};
        this.getData;
      },
    });
  }

  hideDialog() {
    this.PackagesDialog = false;
    this.submitted = false;
  }
  editPackagesD(Packages: Package) {
    this.settingService.editPackage(Packages).then(
      (res) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'تم ',
          detail: 'تمت تعديل الحزمة بنجاح',
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );
    this.Packages = [...this.Packages];
    this.PackagesDialog = false;
    this.Package = {};
    this.getData();
  }
  savePackages(Packages: Package) {
    if (Packages.period == 'شهر') {
      Packages.period = '1';
      Packages.secondMonth = '0';
      Packages.thirdMonth = '0';
    } else if (Packages.period == 'شهرين') {
      Packages.period = '2';
      Packages.secondMonth = parseInt(Packages.firstMonth) + 1;
      Packages.thirdMonth = '0';
    } else if (Packages.period == 'ثلاثة أشهر') {
      Packages.period = '3';
      Packages.secondMonth = parseInt(Packages.firstMonth) + 1;
      Packages.thirdMonth = parseInt(Packages.firstMonth) + 2;
    }
    this.submitted = true;
    Packages.firstMonthPayRoll = parseInt(Packages.firstMonth);
    Packages.secondMonthPayRoll = parseInt(Packages.secondMonth);
    Packages.thirdMonthPayRoll = parseInt(Packages.thirdMonth);
    console.log(Packages);
    this.settingService.addPackage(Packages).then(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الحزمة بنجاح',
          life: 3000,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );
    this.Packages = [...this.Packages];
    this.PackagesDialog = false;
    this.Package = {};
    this.getData();
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
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  exportExcel() {
    const xlsx = 'xlsx';
    import(xlsx).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Packages);
      const workbook = { Sheets: { الحزم: worksheet }, SheetNames: ['الحزم'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'الحزم');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
