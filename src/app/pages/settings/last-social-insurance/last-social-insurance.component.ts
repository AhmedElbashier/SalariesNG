import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { LastSocialTaxOnVariableAllowance,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-last-social-insurance',
  templateUrl: './last-social-insurance.component.html',
  styleUrls: ['./last-social-insurance.component.scss']
})
export class LastSocialInsuranceComponent {
// dt: any;
@ViewChild('dt') dt: Table | undefined;

LastSocialTaxOnVariableAllowancesDialog!: boolean;
LastSocialTaxOnVariableAllowancesEditDialog!: boolean;
LastSocialTaxOnVariableAllowances!: LastSocialTaxOnVariableAllowance[];
LastSocialTaxOnVariableAllowance!: LastSocialTaxOnVariableAllowance;
selectedLastSocialTaxOnVariableAllowances!: LastSocialTaxOnVariableAllowance[];
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
    this.settingService.getLastSocialTaxOnVariableAllowances().subscribe(
        (res: any) => {
            this.LastSocialTaxOnVariableAllowances = res
        },
        (error) => console.log(error));
        
}
openNew() {

    this.LastSocialTaxOnVariableAllowance = {};
    this.submitted = false;
    this.LastSocialTaxOnVariableAllowancesDialog = true;
}
editLastSocialTaxOnVariableAllowances(LastSocialTaxOnVariableAllowances: LastSocialTaxOnVariableAllowance) {
    this.LastSocialTaxOnVariableAllowance = { ...LastSocialTaxOnVariableAllowances };
    this.LastSocialTaxOnVariableAllowancesEditDialog = true;
}
deleteLastSocialTaxOnVariableAllowances(LastSocialTaxOnVariableAllowances: LastSocialTaxOnVariableAllowance) {
    this.confirmationService.confirm({
        message: 'هل انت متأكد من أنك تريد حذف التأمين  ' + LastSocialTaxOnVariableAllowances.name + '؟',
        header: 'تأكيد  ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.LastSocialTaxOnVariableAllowances = this.LastSocialTaxOnVariableAllowances.filter(val => val.id !== LastSocialTaxOnVariableAllowances.id);
            this.settingService.deleteLastSocialTaxOnVariableAllowance(LastSocialTaxOnVariableAllowances.id);
            this.LastSocialTaxOnVariableAllowance = {};
            this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف التأمين', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

hideDialog() {
    this.LastSocialTaxOnVariableAllowancesDialog = false;
    this.submitted = false;
}
editLastSocialTaxOnVariableAllowancesD(LastSocialTaxOnVariableAllowances: LastSocialTaxOnVariableAllowance) {
    this.settingService.editLastSocialTaxOnVariableAllowance(LastSocialTaxOnVariableAllowances);
    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل التأمين بنجاح', life: 3000 });
    this.LastSocialTaxOnVariableAllowances = [...this.LastSocialTaxOnVariableAllowances];
    this.LastSocialTaxOnVariableAllowancesDialog = false;
    this.LastSocialTaxOnVariableAllowance = {};
    this.reloadCurrentRoute();
}
saveLastSocialTaxOnVariableAllowances(LastSocialTaxOnVariableAllowances: LastSocialTaxOnVariableAllowance) {
    this.submitted = true;
    this.settingService.addLastSocialTaxOnVariableAllowance(LastSocialTaxOnVariableAllowances);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة التأمين بنجاح', life: 3000 });
    this.LastSocialTaxOnVariableAllowances = [...this.LastSocialTaxOnVariableAllowances];
    this.LastSocialTaxOnVariableAllowancesDialog = false;
    this.LastSocialTaxOnVariableAllowance = {};
    this.reloadCurrentRoute();
}


findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.LastSocialTaxOnVariableAllowances.length; i++) {
        if (this.LastSocialTaxOnVariableAllowances[i].id === id) {
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
//             doc.autoTable(this.exportColumns, this.LastSocialTaxOnVariableAllowancess);
//             doc.save('LastSocialTaxOnVariableAllowancess.pdf');
//         })
//     })
// }

exportExcel() {
    const xlsx = "xlsx";
    import(xlsx).then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.LastSocialTaxOnVariableAllowances);
        const workbook = { Sheets: { 'التأمينات': worksheet }, SheetNames: ['التأمينات'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "التأمينات");
        
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
    //     this.router.navigate(['dashboard/settings/LastSocialTaxOnVariableAllowances']);
    // });
  }
}