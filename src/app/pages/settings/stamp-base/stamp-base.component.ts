import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { StampBase,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-stamp-Base',
  templateUrl: './stamp-Base.component.html',
  styleUrls: ['./stamp-Base.component.scss']
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

constructor(private settingService: SettingsService, private messageService: MessageService, private confirmationService: ConfirmationService,private router:Router) { }
applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
}
ngOnInit() {
    this.Delete = "حذف";
    this.settingService.getStampBases().subscribe(
        (res: any) => {
            this.StampBases = res
        },
        (error) => console.log(error));
        
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
            this.StampBases = this.StampBases.filter(val => val.id !== StampBases.id);
            this.settingService.deleteStampBase(StampBases.id);
            this.StampBase = {};
            this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف الدمغة', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

hideDialog() {
    this.StampBasesDialog = false;
    this.submitted = false;
}
editStampBasesD(StampBases: StampBase) {
    this.settingService.editStampBase(StampBases);
    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الدمغة بنجاح', life: 3000 });
    this.StampBases = [...this.StampBases];
    this.StampBasesDialog = false;
    this.StampBase = {};
    this.reloadCurrentRoute();
}
saveStampBases(StampBases: StampBase) {
    this.submitted = true;
    this.settingService.addStampBase(StampBases);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الدمغة بنجاح', life: 3000 });
    this.StampBases = [...this.StampBases];
    this.StampBasesDialog = false;
    this.StampBase = {};
    this.reloadCurrentRoute();
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

// exportPdf() {
//     import("jspdf").then(jsPDF => {
//         import("jspdf-autotable").then(x => {
//             const doc = new jsPDF.default(0,0);
//             doc.autoTable(this.exportColumns, this.StampBasess);
//             doc.save('StampBasess.pdf');
//         })
//     })
// }

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

reloadCurrentRoute() {
    // let currentUrl = this.router.url;
    // this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['dashboard/settings/StampBasess']);
    // });
  }
}