import { Advance, AdvanceAccount } from './../../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Emp, EmpService } from 'src/app/services/emp.service';
import { SettingsService } from 'src/app/services/settings.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-advance-details',
  templateUrl: './advance-details.component.html',
  styleUrls: ['./advance-details.component.scss']
})
export class AdvanceDetailsComponent {

emp!:Emp;
emps!:Emp[];
advance!:Advance;
advances!:Advance[];
advanceAccount!:AdvanceAccount;
advanceAccounts!:AdvanceAccount[];
constructor(
  private router: Router,
  private settingService: SettingsService,
  private EmpService: EmpService,
  private messageService: MessageService,
  private confirmationService: ConfirmationService
) {}
async ngOnInit(): Promise<void> {
  {
    this.advanceAccount = {} as AdvanceAccount;
    this.advanceAccounts = {} as AdvanceAccount[];
      this.advance = {} as Advance;
      this.advances = {} as Advance[];
      this.emp = {} as Emp;
      await this.EmpService.getEmp(localStorage.getItem("AdvanceEmpId")).subscribe(
        (res: any) => {
          this.emp = res;
          this.settingService.getAdvanceAccountByEmpId(localStorage.getItem("AdvanceEmpId")).then(
            (res: any) => {
              this.advanceAccounts = res;
            },
          );
          this.settingService.getAdvanceByEmpId(localStorage.getItem("AdvanceEmpId")).then(
            (res: any) => {
              this.advances = res;
            },
          );
          this.settingService.getAdvanceAccountByEmpId(localStorage.getItem("AdvanceEmpId")).then(
            (res: any) => {
              this.advanceAccounts = res;
            },
          );
        },
        (error) => console.log(error)
      );
    console.log(this.advanceAccounts);
  }
}
  edit()
  {

  }
  back()
  {
    this.router.navigate(["dashboard/advance"]);
  }
}
