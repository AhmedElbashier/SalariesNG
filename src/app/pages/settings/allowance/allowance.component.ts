import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Allowance, SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-allowance',
  templateUrl: './allowance.component.html',
  styleUrls: ['./allowance.component.scss']
})
export class AllowanceComponent {
  AllowancesDialog!: boolean;
  AllowancesEditDialog!: boolean;
  Allowances!: Allowance[];
  Allowance!: Allowance;
  selectedAllowances!: Allowance[];
  submitted!: boolean;
  Delete!: string;
  cols!: any[];

  exportColumns!: any[];
  dt: any;

  constructor(
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  ngOnInit() {
    this.Delete = 'حذف';
    this.settingService.getAllowances().then(
      (res: any) => {
        this.Allowances = res;
      },
      (error) => console.log(error)
    );
  }
  openNew() {
    this.Allowance = {};
    this.submitted = false;
    this.AllowancesDialog = true;
  }
  editAllowances(Allowances: Allowance) {
    this.Allowance = { ...Allowances };
    this.AllowancesEditDialog = true;
  }
  deleteAllowances(Allowances: Allowance) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف نوع البدلات  ' + Allowances.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.Allowances = this.Allowances.filter(
          (val) => val.id !== Allowances.id
        );
        this.settingService.deleteAllowance(Allowances.id);
        this.Allowance = {};
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تم حذف نوع البدلات',
          life: 3000,
        });
        this.reloadCurrentRoute();
      },
    });
  }

  hideDialog() {
    this.AllowancesDialog = false;
    this.submitted = false;
  }
  editAllowancesD(Allowances: Allowance) {
    this.settingService.editAllowance(Allowances);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت تعديل نوع البدلات بنجاح',
      life: 3000,
    });
    this.Allowances = [...this.Allowances];
    this.AllowancesDialog = false;
    this.Allowance = {};
    this.reloadCurrentRoute();
  }
  saveAllowances(Allowances: Allowance) {
    this.submitted = true;
    this.settingService.addAllowance(Allowances);
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تمت اضافة نوع البدلات بنجاح',
      life: 3000,
    });
    this.Allowances = [...this.Allowances];
    this.AllowancesDialog = false;
    this.Allowance = {};
    this.reloadCurrentRoute();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.Allowances.length; i++) {
      if (this.Allowances[i].id === id) {
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

  // exportPdf() {
  //     import("jspdf").then(jsPDF => {
  //         import("jspdf-autotable").then(x => {
  //             const doc = new jsPDF.default(0,0);
  //             doc.autoTable(this.exportColumns, this.Allowancess);
  //             doc.save('Allowancess.pdf');
  //         })
  //     })
  // }

  exportExcel() {
    const xlsx = 'xlsx';
    import(xlsx).then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.Allowances);
      const workbook = {
        Sheets: { "البدلات": worksheet },
        SheetNames: ['البدلات'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'البدلات');
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

  reloadCurrentRoute() {
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['dashboard/settings/Allowancess']);
    // });
  }
}
