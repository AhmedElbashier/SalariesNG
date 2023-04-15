import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Partial,
  PartialAdvance,
  PartialAdvanceAccount,
  SettingsService,
} from 'src/app/services/settings.service';

@Component({
  selector: 'app-partial-advance-details',
  templateUrl: './partial-advance-details.component.html',
  styleUrls: ['./partial-advance-details.component.scss'],
})
export class PartialAdvanceDetailsComponent {
  partial!: Partial;
  partials!: Partial[];
  advance!: PartialAdvance;
  advances!: PartialAdvance[];
  advanceAccount!: PartialAdvanceAccount;
  advanceAccounts!: PartialAdvanceAccount[];
  constructor(
    private router: Router,
    private settingService: SettingsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  async ngOnInit(): Promise<void> {
    {
      this.advanceAccount = {} as PartialAdvanceAccount;
      this.advanceAccounts = {} as PartialAdvanceAccount[];
      this.advance = {} as PartialAdvance;
      this.advances = {} as PartialAdvance[];
      this.partial = {} as Partial;
      await this.settingService
        .getPartial(localStorage.getItem('PartialAdvancePartialId'))
        .then(
          (res: any) => {
            this.partial = res;
            this.settingService
              .getPartialAdvanceAccountByPartialId(
                localStorage.getItem('PartialAdvancePartialId')
              )
              .then((res: any) => {
                this.advanceAccounts = res;
              });
            this.settingService
              .getPartialAdvanceByPartialId(
                localStorage.getItem('PartialAdvancePartialId')
              )
              .then((res: any) => {
                this.advances = res;
              });
            this.settingService
              .getPartialAdvanceAccountByPartialId(
                localStorage.getItem('PartialAdvancePartialId')
              )
              .then((res: any) => {
                this.advanceAccounts = res;
              });
          },
          (error) => console.log(error)
        );
      console.log(this.advanceAccounts);
    }
  }
  edit() {}
  back() {
    this.router.navigate(['dashboard/partialAdvance']);
  }
}
