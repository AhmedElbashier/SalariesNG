import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {ToastModule} from 'primeng/toast';
import {CheckboxModule} from 'primeng/checkbox';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {StyleClassModule} from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {Table, TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {ChipModule} from 'primeng/chip';
import {DataViewModule} from 'primeng/dataview';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/settings/users/users.component';
import { PerformanceIncentiveComponent } from './pages/settings/performance-incentive/performance-incentive.component';
import { InternalExperienceComponent } from './pages/settings/internal-experience/internal-experience.component';
import { DegreeRollerComponent } from './pages/settings/degree-roller/degree-roller.component';
import { FirstSocialInsuranceComponent } from './pages/settings/first-social-insurance/first-social-insurance.component';
import { LastSocialInsuranceComponent } from './pages/settings/last-social-insurance/last-social-insurance.component';
import { TaxOnVariableAllowancesComponent } from './pages/settings/tax-on-variable-allowances/tax-on-variable-allowances.component';
import { StampBaseComponent } from './pages/settings/stamp-base/stamp-base.component';
import { StampSignComponent } from './pages/settings/stamp-sign/stamp-sign.component';
import { BooksAndResearchComponent } from './pages/settings/books-and-research/books-and-research.component';
import { AdminEmpComponent } from './pages/admin-emp/admin-emp.component';
import { AcademicEmpComponent } from './pages/academic-emp/academic-emp.component';
import { AdminPayrollComponent } from './pages/admin-payroll/admin-payroll.component';
import { AcademicPayrollComponent } from './pages/academic-payroll/academic-payroll.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PackageComponent } from './pages/settings/package/package.component';
import { DepartmentComponent } from './pages/settings/department/department.component';
import { AcademicNewComponent } from './pages/academic-new/academic-new.component';
import { AdminNewComponent } from './pages/admin-new/admin-new.component';
import { AdminDetailsComponent } from './pages/admin-details/admin-details.component';
import { AcademicDetailsComponent } from './pages/academic-details/academic-details.component';
import { StatiscsComponent } from './pages/statiscs/statiscs.component';
import { PersoanlIncomeTaxComponent } from './pages/settings/persoanl-income-tax/persoanl-income-tax.component';
import { AdminPayrollDetailsComponent } from './pages/admin-payroll-details/admin-payroll-details.component';
import { AcademicPayrollDetailsComponent } from './pages/academic-payroll-details/academic-payroll-details.component';
import { AcademicsRateComponent } from './pages/settings/academics-rate/academics-rate.component';
import { AdminsRateComponent } from './pages/settings/admins-rate/admins-rate.component';
import { TrainingComponent } from './pages/settings/training/training.component';
import { TrainingPayrollComponent } from './pages/training-payroll/training-payroll.component';
import { PackagePayrollComponent } from './pages/package-payroll/package-payroll.component';
import { PackagePayrollDetailsComponent } from './pages/package-payroll-details/package-payroll-details.component';
import { TrainingPayrollDetailsComponent } from './pages/training-payroll-details/training-payroll-details.component';
import { TrainingInvoiceComponent } from './pages/training-payroll-details/training-invoice/training-invoice.component';
import { PackageInvoiceComponent } from './pages/package-payroll-details/package-invoice/package-invoice.component';
import { AdminInvoiceOneComponent } from './pages/admin-payroll-details/admin-invoice-one/admin-invoice-one.component';
import { AdminInvoiceTwoComponent } from './pages/admin-payroll-details/admin-invoice-two/admin-invoice-two.component';
import { AcademicInvoiceOneComponent } from './pages/academic-payroll-details/academic-invoice-one/academic-invoice-one.component';
import { AcademicInvoiceTwoComponent } from './pages/academic-payroll-details/academic-invoice-two/academic-invoice-two.component';
import { AdvancesComponent } from './pages/settings/advances/advances.component';
import { AbsenceComponent } from './pages/settings/absence/absence.component';
import { AdvanceDetailsComponent } from './pages/settings/advance-details/advance-details.component';
import { AllowanceComponent } from './pages/settings/allowance/allowance.component';
import { PartialComponent } from './pages/settings/partial/partial.component';
import { PartialPayRollComponent } from './pages/partial-pay-roll/partial-pay-roll.component';
import { PartialPayRollDetailsComponent } from './pages/partial-pay-roll-details/partial-pay-roll-details.component';
import { PartialInvoiceComponent } from './pages/partial-pay-roll-details/partial-invoice/partial-invoice.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    PerformanceIncentiveComponent,
    InternalExperienceComponent,
    DegreeRollerComponent,
    FirstSocialInsuranceComponent,
    LastSocialInsuranceComponent,
    TaxOnVariableAllowancesComponent,
    StampBaseComponent,
    StampSignComponent,
    BooksAndResearchComponent,
    AdminEmpComponent,
    AcademicEmpComponent,
    AdminPayrollComponent,
    AcademicPayrollComponent,
    ReportsComponent,
    PackageComponent,
    DepartmentComponent,
    AcademicNewComponent,
    AdminNewComponent,
    AdminDetailsComponent,
    AcademicDetailsComponent,
    StatiscsComponent,
    PersoanlIncomeTaxComponent,
    AdminPayrollDetailsComponent,
    AcademicPayrollDetailsComponent,
    AcademicsRateComponent,
    AdminsRateComponent,
    PackageComponent,
    TrainingComponent,
    TrainingComponent,
    TrainingPayrollComponent,
    PackagePayrollComponent,
    PackagePayrollDetailsComponent,
    TrainingPayrollDetailsComponent,
    TrainingInvoiceComponent,
    PackageInvoiceComponent,
    AdminInvoiceOneComponent,
    AdminInvoiceTwoComponent,
    AcademicInvoiceOneComponent,
    AcademicInvoiceTwoComponent,
    AdvancesComponent,
    AbsenceComponent,
    AdvanceDetailsComponent,
    AllowanceComponent,
    PartialComponent,
    PartialPayRollComponent,
    PartialPayRollDetailsComponent,
    PartialInvoiceComponent
  ],
  imports: [
    LoggerModule.forRoot({
    serverLoggingUrl: 'http://localhost:3000/acmst/logs',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR}),
    BrowserModule,
    RouterModule,
    CheckboxModule,
    AppRoutingModule,
    StyleClassModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    MenubarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    PasswordModule,
    ChartModule,
    DataViewModule,
    ChipModule,

  ],
  providers: [MessageService,ConfirmationService,{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
