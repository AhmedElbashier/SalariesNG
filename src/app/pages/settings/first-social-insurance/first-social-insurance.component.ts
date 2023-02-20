import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FirstSocialTaxOnVariableAllowance,SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-first-social-insurance',
  templateUrl: './first-social-insurance.component.html',
  styleUrls: ['./first-social-insurance.component.scss']
})
export class FirstSocialInsuranceComponent {
// dt: any;
@ViewChild('dt') dt: Table | undefined;

FirstSocialTaxOnVariableAllowancesDialog!: boolean;
FirstSocialTaxOnVariableAllowancesEditDialog!: boolean;
FirstSocialTaxOnVariableAllowances!: FirstSocialTaxOnVariableAllowance[];
FirstSocialTaxOnVariableAllowance!: FirstSocialTaxOnVariableAllowance;
selectedFirstSocialTaxOnVariableAllowances!: FirstSocialTaxOnVariableAllowance[];
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
    this.settingService.getFirstSocialTaxOnVariableAllowance().subscribe(
        (res: any) => {
            this.FirstSocialTaxOnVariableAllowances = res
        },
        (error) => console.log(error));
        
}
openNew() {

    this.FirstSocialTaxOnVariableAllowance = {};
    this.submitted = false;
    this.FirstSocialTaxOnVariableAllowancesDialog = true;
}
editFirstSocialTaxOnVariableAllowances(FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance) {
    this.FirstSocialTaxOnVariableAllowance = { ...FirstSocialTaxOnVariableAllowances };
    this.FirstSocialTaxOnVariableAllowancesEditDialog = true;
}
deleteFirstSocialTaxOnVariableAllowances(FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance) {
    this.confirmationService.confirm({
        message: 'هل انت متأكد من أنك تريد حذف التأمين  ' + FirstSocialTaxOnVariableAllowances.name + '؟',
        header: 'تأكيد  ',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.FirstSocialTaxOnVariableAllowances = this.FirstSocialTaxOnVariableAllowances.filter(val => val.id !== FirstSocialTaxOnVariableAllowances.id);
            this.settingService.deleteFirstSocialTaxOnVariableAllowance(FirstSocialTaxOnVariableAllowances.id);
            this.FirstSocialTaxOnVariableAllowance = {};
            this.messageService.add({ severity: 'error', summary: 'تم ', detail: 'تم حذف التأمين', life: 3000 });
            this.reloadCurrentRoute();
        }
    });
}

hideDialog() {
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.submitted = false;
}
editFirstSocialTaxOnVariableAllowancesD(FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance) {
    this.settingService.editFirstSocialTaxOnVariableAllowance(FirstSocialTaxOnVariableAllowances);
    this.messageService.add({ severity: 'warn', summary: 'تم ', detail: 'تمت تعديل التأمين بنجاح', life: 3000 });
    this.FirstSocialTaxOnVariableAllowances = [...this.FirstSocialTaxOnVariableAllowances];
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.FirstSocialTaxOnVariableAllowance = {};
    this.reloadCurrentRoute();
}
saveFirstSocialTaxOnVariableAllowances(FirstSocialTaxOnVariableAllowances: FirstSocialTaxOnVariableAllowance) {
    this.submitted = true;
    this.settingService.addFirstSocialTaxOnVariableAllowance(FirstSocialTaxOnVariableAllowances);
    this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تمت اضافة التأمين بنجاح', life: 3000 });
    this.FirstSocialTaxOnVariableAllowances = [...this.FirstSocialTaxOnVariableAllowances];
    this.FirstSocialTaxOnVariableAllowancesDialog = false;
    this.FirstSocialTaxOnVariableAllowance = {};
    this.reloadCurrentRoute();
}


findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.FirstSocialTaxOnVariableAllowances.length; i++) {
        if (this.FirstSocialTaxOnVariableAllowances[i].id === id) {
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
//             doc.autoTable(this.exportColumns, this.FirstSocialTaxOnVariableAllowancess);
//             doc.save('FirstSocialTaxOnVariableAllowancess.pdf');
//         })
//     })
// }

exportExcel() {
    const xlsx = "xlsx";
    import(xlsx).then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.FirstSocialTaxOnVariableAllowances);
        const workbook = { Sheets: { 'التأمين': worksheet }, SheetNames: ['التأمين'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "التأمين");
        
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
    //     this.router.navigate(['dashboard/settings/FirstSocialTaxOnVariableAllowances']);
    // });
  }
}