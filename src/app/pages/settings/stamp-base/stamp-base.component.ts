import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StampBase,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-stamp-Base',
  templateUrl: './stamp-base.component.html',
  styleUrls: ['./stamp-base.component.scss']
})
export class StampBaseComponent {
// dt: any;
@ViewChild('dt') dt: Table | undefined;

StampBasesDialog!: boolean;
StampBasesEditDialog!: boolean;
StampBases!: StampBase[];
StampBase!: StampBase;
selectedStampBases!: StampBase[];
submitted!: boolean;
Delete!: string;
cols!: any[];

exportColumns!: any[];

constructor(private cdr: ChangeDetectorRef,private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }
applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}
ngOnInit() {
    this.Delete = "حذف";
    this.getData();
}
getData()
{
  this.settingService.getStampBases().subscribe(
    (res: any) => {
        this.StampBases = res;
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

    this.StampBase = {};
    this.submitted = false;
    this.StampBasesDialog = true;
}
editStampBases(StampBases: StampBase) {
    this.StampBase = { ...StampBases };
    this.StampBasesEditDialog = true;
}
deleteStampBases(StampBases: StampBase) {
    this.confirmationService.confirm({
        message: 'هل انت متأكد من أنك تريد حذف الدمغة  ' + StampBases.name + '؟',
        header: 'تأكيد  ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.settingService.deleteStampBase(StampBases.id).then(
              (res) =>
              {
                this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف الدمغة', life: 3000 });
                this.StampBases = this.StampBases.filter(val => val.id !== StampBases.id);

              },
              (error) =>
              {
                this.messageService.add({
                  severity: 'error',
                  summary: 'فشل',
                  detail: 'حدث خطأ ',
                  life: 3000,
                });
              }
            );
            this.StampBase = {};
            this.getData();
        }
    });
}

hideDialog() {
    this.StampBasesDialog = false;
    this.submitted = false;
}
editStampBasesD(StampBases: StampBase) {
    this.settingService.editStampBase(StampBases).then(
      (res) =>
      {
        this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الدمغة بنجاح', life: 3000 });

      },
      (error) =>
      {
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );
    this.StampBases = [...this.StampBases];
    this.StampBasesDialog = false;
    this.StampBase = {};
    this.getData();
}
saveStampBases(StampBases: StampBase) {
    this.submitted = true;
    this.settingService.addStampBase(StampBases).then(
      (res) =>
      {
        this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الدمغة بنجاح', life: 3000 });

      },
      (error) =>
      {
        this.messageService.add({
          severity: 'error',
          summary: 'فشل',
          detail: 'حدث خطأ ',
          life: 3000,
        });
      }
    );
    this.StampBases = [...this.StampBases];
    this.StampBasesDialog = false;
    this.StampBase = {};
    this.getData();
}
findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.StampBases.length; i++) {
        if (this.StampBases[i].id === id) {
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
        const worksheet = xlsx.utils.json_to_sheet(this.StampBases);
        const workbook = { Sheets: { 'الدمغات على المرتب الأساسي': worksheet }, SheetNames: ['الدمغات على المرتب الأساسي'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "الدمغات على المرتب الأساسي");

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
