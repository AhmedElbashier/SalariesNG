import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Partial,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-partial',
  templateUrl: './partial.component.html',
  styleUrls: ['./partial.component.scss']
})
export class PartialComponent {
  @ViewChild('dt') dt: Table | undefined;

  PackagesDialog!: boolean;
  PackagesEditDialog!: boolean;
  Partials!: Partial[];
  Partial!: Partial;
  selectedPackages!: Partial[];
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
      this.settingService.getPartials().then(
          (res: any) => {
              this.Partials = res
          },
          (error) => console.log(error));

  }
  openNew() {

      this.Partial = {};
      this.submitted = false;
      this.PackagesDialog = true;
  }
  editPackages(Partials: Partial) {
      this.Partial = { ...Partials };
      this.PackagesEditDialog = true;
  }
  deletePackages(Partials: Partial) {
      this.confirmationService.confirm({
          message: 'هل انت متأكد من أنك تريد حذف الموظف  ' + Partials.name + '؟',
          header: 'تأكيد  ',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.Partials = this.Partials.filter(val => val.id !== Partials.id);
              this.settingService.deletePackage(Partials.id);
              this.Partial = {};
              this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف الموظف', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.PackagesDialog = false;
      this.submitted = false;
  }
  editPackagesD(Partials: Partial) {
      this.settingService.editPartial(Partials);
      this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الموظف بنجاح', life: 3000 });
      this.Partials = [...this.Partials];
      this.PackagesDialog = false;
      this.Partial = {};
  }
  savePackages(Partials: Partial) {
      this.submitted = true;
      this.settingService.addPartial(Partials);
      this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الموظف بنجاح', life: 3000 });
      this.Partials = [...this.Partials];
      this.PackagesDialog = false;
      this.Partial = {};
  }


  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.Partials.length; i++) {
          if (this.Partials[i].id === id) {
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
          const worksheet = xlsx.utils.json_to_sheet(this.Partials);
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
