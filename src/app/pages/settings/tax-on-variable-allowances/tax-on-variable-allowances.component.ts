import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TaxOnVariableAllowances,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';;
@Component({
  selector: 'app-tax-on-variable-allowances',
  templateUrl: './tax-on-variable-allowances.component.html',
  styleUrls: ['./tax-on-variable-allowances.component.scss']
})
export class TaxOnVariableAllowancesComponent {
 // dt: any;
 @ViewChild('dt') dt: Table | undefined;

 TaxOnVariableAllowancesDialog!: boolean;
 TaxOnVariableAllowancesEditDialog!: boolean;
 TaxOnVariableAllowances!: TaxOnVariableAllowances[];
 TaxOnVariableAllowance!: TaxOnVariableAllowances;
 selectedTaxOnVariableAllowances!: TaxOnVariableAllowances[];
 submitted!: boolean;
 Delete!: string;
 cols!: any[];

 exportColumns!: any[];

 constructor(private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }
 applyFilterGlobal($event: any, stringVal: any) {
     this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
 }
 ngOnInit() {
     this.Delete = "حذف";
     this.settingService.getTaxOnVariableAllowances().subscribe(
         (res: any) => {
             this.TaxOnVariableAllowances = res
         },
         (error) => console.log(error));
         
 }
 openNew() {

     this.TaxOnVariableAllowance = {};
     this.submitted = false;
     this.TaxOnVariableAllowancesDialog = true;
 }
 editTaxOnVariableAllowances(TaxOnVariableAllowances: TaxOnVariableAllowances) {
     this.TaxOnVariableAllowance = { ...TaxOnVariableAllowances };
     this.TaxOnVariableAllowancesEditDialog = true;
 }
 deleteTaxOnVariableAllowances(TaxOnVariableAllowances: TaxOnVariableAllowances) {
     this.confirmationService.confirm({
         message: 'هل انت متأكد من أنك تريد حذف الضريبة  ' + TaxOnVariableAllowances.name + '؟',
         header: 'تأكيد  ',
         icon: 'pi pi-exclamation-triangle',
         accept: () => {
             this.TaxOnVariableAllowances = this.TaxOnVariableAllowances.filter(val => val.id !== TaxOnVariableAllowances.id);
             this.settingService.deleteTaxOnVariableAllowance(TaxOnVariableAllowances.id);
             this.TaxOnVariableAllowance = {};
             this.messageService.add({ severity: 'error', summary: 'تم', detail: 'تم حذف الضريبة', life: 3000 });
             this.reloadCurrentRoute();
         }
     });
 }

 hideDialog() {
     this.TaxOnVariableAllowancesDialog = false;
     this.submitted = false;
 }
 editTaxOnVariableAllowancesD(TaxOnVariableAllowances: TaxOnVariableAllowances) {
     this.settingService.editTaxOnVariableAllowance(TaxOnVariableAllowances);
     this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الضريبة بنجاح', life: 3000 });
     this.TaxOnVariableAllowances = [...this.TaxOnVariableAllowances];
     this.TaxOnVariableAllowancesDialog = false;
     this.TaxOnVariableAllowance = {};
     this.reloadCurrentRoute();
 }
 saveTaxOnVariableAllowances(TaxOnVariableAllowances: TaxOnVariableAllowances) {
     this.submitted = true;
     this.settingService.addTaxOnVariableAllowance(TaxOnVariableAllowances);
     this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الضريبة بنجاح', life: 3000 });
     this.TaxOnVariableAllowances = [...this.TaxOnVariableAllowances];
     this.TaxOnVariableAllowancesDialog = false;
     this.TaxOnVariableAllowance = {};
     this.reloadCurrentRoute();
 }


 findIndexById(id: string): number {
     let index = -1;
     for (let i = 0; i < this.TaxOnVariableAllowances.length; i++) {
         if (this.TaxOnVariableAllowances[i].id === id) {
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

 // exportPdf() {
 //     import("jspdf").then(jsPDF => {
 //         import("jspdf-autotable").then(x => {
 //             const doc = new jsPDF.default(0,0);
 //             doc.autoTable(this.exportColumns, this.TaxOnVariableAllowancess);
 //             doc.save('TaxOnVariableAllowancess.pdf');
 //         })
 //     })
 // }

 exportExcel() {
     const xlsx = "xlsx";
     import(xlsx).then(xlsx => {
         const worksheet = xlsx.utils.json_to_sheet(this.TaxOnVariableAllowances);
         const workbook = { Sheets: { 'الضريبة على البدلات المتغيرة': worksheet }, SheetNames: ['الضريبة على البدلات المتغيرة'] };
         const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
         this.saveAsExcelFile(excelBuffer, "الضريبة على البدلات المتغيرة");
         
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

 reloadCurrentRoute() {
    //  let currentUrl = this.router.url;
    //  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //      this.router.navigate(['dashboard/settings/TaxOnVariableAllowancess']);
    //  });
   }
}