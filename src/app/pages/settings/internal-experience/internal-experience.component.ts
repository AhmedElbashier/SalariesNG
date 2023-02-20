import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { InternalExperience,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-internal-experience',
  templateUrl: './internal-experience.component.html',
  styleUrls: ['./internal-experience.component.scss']
})
export class InternalExperienceComponent {
// dt: any;
@ViewChild('dt') dt: Table | undefined;

InternalExperiencesDialog!: boolean;
InternalExperiencesEditDialog!: boolean;
InternalExperiences!: InternalExperience[];
InternalExperience!: InternalExperience;
selectedInternalExperiences!: InternalExperience[];
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
    this.settingService.getInternalExperiences().subscribe(
        (res: any) => {
            this.InternalExperiences = res
        },
        (error) => console.log(error));
        
}
openNew() {

    this.InternalExperience = {};
    this.submitted = false;
    this.InternalExperiencesDialog = true;
}
editInternalExperiences(InternalExperiences: InternalExperience) {
    this.InternalExperience = { ...InternalExperiences };
    this.InternalExperiencesEditDialog = true;
}
deleteInternalExperiences(InternalExperiences: InternalExperience) {
    this.confirmationService.confirm({
        message: 'هل انت متأكد من أنك تريد حذف الحافز  ' + InternalExperiences.name + '؟',
        header: 'تأكيد  ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.InternalExperiences = this.InternalExperiences.filter(val => val.id !== InternalExperiences.id);
            this.settingService.deleteInternalExperience(InternalExperiences.id);
            this.InternalExperience = {};
            this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف الحافز', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

hideDialog() {
    this.InternalExperiencesDialog = false;
    this.submitted = false;
}
editInternalExperiencesD(InternalExperiences: InternalExperience) {
    this.settingService.editInternalExperience(InternalExperiences);
    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل الحافز بنجاح', life: 3000 });
    this.InternalExperiences = [...this.InternalExperiences];
    this.InternalExperiencesDialog = false;
    this.InternalExperience = {};
    this.reloadCurrentRoute();
}
saveInternalExperiences(InternalExperiences: InternalExperience) {
    this.submitted = true;
    this.settingService.addInternalExperience(InternalExperiences);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة الحافز بنجاح', life: 3000 });
    this.InternalExperiences = [...this.InternalExperiences];
    this.InternalExperiencesDialog = false;
    this.InternalExperience = {};
    this.reloadCurrentRoute();
}


findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.InternalExperiences.length; i++) {
        if (this.InternalExperiences[i].id === id) {
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
//             doc.autoTable(this.exportColumns, this.InternalExperiencess);
//             doc.save('InternalExperiencess.pdf');
//         })
//     })
// }

exportExcel() {
    const xlsx = "xlsx";
    import(xlsx).then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.InternalExperiences);
        const workbook = { Sheets: { 'الحافز': worksheet }, SheetNames: ['الحافز'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "الحافز");
        
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
    //     this.router.navigate(['dashboard/settings/InternalExperiencess']);
    // });
  }
}