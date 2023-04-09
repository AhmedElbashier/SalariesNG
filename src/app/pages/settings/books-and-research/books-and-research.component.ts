import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  BooksAndResearch,
  SettingsService,
} from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-books-and-research',
  templateUrl: './books-and-research.component.html',
  styleUrls: ['./books-and-research.component.scss'],
})
export class BooksAndResearchComponent {
  // dt: any;
  @ViewChild('dt') dt: Table | undefined;

  BooksAndResearchsDialog!: boolean;
  BooksAndResearchsEditDialog!: boolean;
  BooksAndResearchs!: BooksAndResearch[];
  BooksAndResearch!: BooksAndResearch;
  selectedBooksAndResearchs!: BooksAndResearch[];
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
  getData()
  {
    this.settingService.getBooksAndResearchs().subscribe(
      (res: any) => {
        this.BooksAndResearchs = res;
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
    this.BooksAndResearch = {};
    this.submitted = false;
    this.BooksAndResearchsDialog = true;
  }
  editBooksAndResearchs(BooksAndResearchs: BooksAndResearch) {
    this.BooksAndResearch = { ...BooksAndResearchs };
    this.BooksAndResearchsEditDialog = true;
  }
  deleteBooksAndResearchs(BooksAndResearchs: BooksAndResearch) {
    this.confirmationService.confirm({
      message:
        'هل انت متأكد من أنك تريد حذف الحافز  ' + BooksAndResearchs.name + '؟',
      header: 'تأكيد  ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.settingService.deleteBooksAndResearch(BooksAndResearchs.id).then(
          (res) =>
          {
            this.messageService.add({
              severity: 'success',
              summary: 'تم بنجاح',
              detail: 'تم حذف الحافز',
              life: 3000,
            });
            this.BooksAndResearchs = this.BooksAndResearchs.filter(
              (val) => val.id !== BooksAndResearchs.id
            );
          },
          (error) =>
          {

          }
        );
        this.BooksAndResearch = {};
        this.getData();
      },
    });
  }
  hideDialog() {
    this.BooksAndResearchsDialog = false;
    this.submitted = false;
  }
  editBooksAndResearchsD(BooksAndResearchs: BooksAndResearch) {
    this.settingService.editBooksAndResearch(BooksAndResearchs).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت تعديل الحافز بنجاح',
          life: 3000,
        });
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
    this.BooksAndResearchs = [...this.BooksAndResearchs];
    this.BooksAndResearchsDialog = false;
    this.BooksAndResearch = {};
    this.getData();
  }
  saveBooksAndResearchs(BooksAndResearchs: BooksAndResearch) {
    this.submitted = true;
    this.settingService.addBooksAndResearch(BooksAndResearchs).then(
      (res) =>
      {
        this.messageService.add({
          severity: 'success',
          summary: 'تم بنجاح',
          detail: 'تمت اضافة الحافز بنجاح',
          life: 3000,
        });
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
    this.BooksAndResearchs = [...this.BooksAndResearchs];
    this.BooksAndResearchsDialog = false;
    this.BooksAndResearch = {};
    this.getData();
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.BooksAndResearchs.length; i++) {
      if (this.BooksAndResearchs[i].id === id) {
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
      const worksheet = xlsx.utils.json_to_sheet(this.BooksAndResearchs);
      const workbook = {
        Sheets: { 'حوافز الكتب والبحوث': worksheet },
        SheetNames: ['حوافز الكتب والبحوث'],
      };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'حوافز الكتب والبحوث');
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
