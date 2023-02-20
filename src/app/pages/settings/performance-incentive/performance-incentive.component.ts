import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PerformanceIncentive,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-performance-incentive',
  templateUrl: './performance-incentive.component.html',
  styleUrls: ['./performance-incentive.component.scss']
})
export class PerformanceIncentiveComponent {
// dt: any;
@ViewChild('dt') dt: Table | undefined;

PerformanceIncentivesDialog!: boolean;
PerformanceIncentivesEditDialog!: boolean;
PerformanceIncentives!: PerformanceIncentive[];
PerformanceIncentive!: PerformanceIncentive;
selectedPerformanceIncentives!: PerformanceIncentive[];
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
    this.settingService.getPerformanceIncentives().subscribe(
        (res: any) => {
            this.PerformanceIncentives = res
        },
        (error) => console.log(error));
        
}
openNew() {

    this.PerformanceIncentive = {};
    this.submitted = false;
    this.PerformanceIncentivesDialog = true;
}
editPerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.PerformanceIncentive = { ...PerformanceIncentives };
    this.PerformanceIncentivesEditDialog = true;
}
deletePerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.confirmationService.confirm({
        message: 'هل انت متأكد من أنك تريد حذف المتسخدم  ' + PerformanceIncentives.name + '؟',
        header: 'تأكيد  ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.PerformanceIncentives = this.PerformanceIncentives.filter(val => val.id !== PerformanceIncentives.id);
            this.settingService.deletePerformanceIncentive(PerformanceIncentives.id);
            this.PerformanceIncentive = {};
            this.messageService.add({ severity: 'error', summary: 'تم', detail: 'تم حذف المستخدم', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

hideDialog() {
    this.PerformanceIncentivesDialog = false;
    this.submitted = false;
}
editPerformanceIncentivesD(PerformanceIncentives: PerformanceIncentive) {
    this.settingService.editPerformanceIncentive(PerformanceIncentives);
    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل المستخدم بنجاح', life: 3000 });
    this.PerformanceIncentives = [...this.PerformanceIncentives];
    this.PerformanceIncentivesDialog = false;
    this.PerformanceIncentive = {};
    this.reloadCurrentRoute();
}
savePerformanceIncentives(PerformanceIncentives: PerformanceIncentive) {
    this.submitted = true;
    this.settingService.addPerformanceIncentive(PerformanceIncentives);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة المستخدم بنجاح', life: 3000 });
    this.PerformanceIncentives = [...this.PerformanceIncentives];
    this.PerformanceIncentivesDialog = false;
    this.PerformanceIncentive = {};
    this.reloadCurrentRoute();
}


findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.PerformanceIncentives.length; i++) {
        if (this.PerformanceIncentives[i].id === id) {
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
//             doc.autoTable(this.exportColumns, this.PerformanceIncentivess);
//             doc.save('PerformanceIncentivess.pdf');
//         })
//     })
// }

exportExcel() {
    const xlsx = "xlsx";
    import(xlsx).then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.PerformanceIncentives);
        const workbook = { Sheets: { 'المستخدمين': worksheet }, SheetNames: ['المستخدمين'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "المستخدمين");
        
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
    //     this.router.navigate(['dashboard/settings/PerformanceIncentives']);
    // });
  }
}