import { PartialPayRollComponent } from './pages/partial-pay-roll/partial-pay-roll.component';
import { PartialComponent } from './pages/settings/partial/partial.component';
import { AllowanceComponent } from './pages/settings/allowance/allowance.component';
import { AdvanceDetailsComponent } from './pages/settings/advance-details/advance-details.component';
import { AbsenceComponent } from './pages/settings/absence/absence.component';
import { AdvancesComponent } from './pages/settings/advances/advances.component';
import { AcademicInvoiceTwoComponent } from './pages/academic-payroll-details/academic-invoice-two/academic-invoice-two.component';
import { AcademicInvoiceOneComponent } from './pages/academic-payroll-details/academic-invoice-one/academic-invoice-one.component';
import { AdminInvoiceTwoComponent } from './pages/admin-payroll-details/admin-invoice-two/admin-invoice-two.component';
import { AdminInvoiceOneComponent } from './pages/admin-payroll-details/admin-invoice-one/admin-invoice-one.component';
import { PackageInvoiceComponent } from './pages/package-payroll-details/package-invoice/package-invoice.component';
import { TrainingInvoiceComponent } from './pages/training-payroll-details/training-invoice/training-invoice.component';
import { TrainingPayrollDetailsComponent } from './pages/training-payroll-details/training-payroll-details.component';
import { PackagePayrollDetailsComponent } from './pages/package-payroll-details/package-payroll-details.component';
import { PackagePayrollComponent } from './pages/package-payroll/package-payroll.component';
import { TrainingPayrollComponent } from './pages/training-payroll/training-payroll.component';
import { TrainingComponent } from './pages/settings/training/training.component';
import { AdminsRateComponent } from './pages/settings/admins-rate/admins-rate.component';
import { AcademicsRateComponent } from './pages/settings/academics-rate/academics-rate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicDetailsComponent } from './pages/academic-details/academic-details.component';
import { AcademicEmpComponent } from './pages/academic-emp/academic-emp.component';
import { AcademicNewComponent } from './pages/academic-new/academic-new.component';
import { AcademicPayrollDetailsComponent } from './pages/academic-payroll-details/academic-payroll-details.component';
import { AcademicPayrollComponent } from './pages/academic-payroll/academic-payroll.component';
import { AdminDetailsComponent } from './pages/admin-details/admin-details.component';
import { AdminEmpComponent } from './pages/admin-emp/admin-emp.component';
import { AdminNewComponent } from './pages/admin-new/admin-new.component';
import { AdminPayrollDetailsComponent } from './pages/admin-payroll-details/admin-payroll-details.component';
import { AdminPayrollComponent } from './pages/admin-payroll/admin-payroll.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { BooksAndResearchComponent } from './pages/settings/books-and-research/books-and-research.component';
import { DegreeRollerComponent } from './pages/settings/degree-roller/degree-roller.component';
import { DepartmentComponent } from './pages/settings/department/department.component';
import { FirstSocialInsuranceComponent } from './pages/settings/first-social-insurance/first-social-insurance.component';
import { InternalExperienceComponent } from './pages/settings/internal-experience/internal-experience.component';
import { LastSocialInsuranceComponent } from './pages/settings/last-social-insurance/last-social-insurance.component';
import { PackageComponent } from './pages/settings/package/package.component';
import { PerformanceIncentiveComponent } from './pages/settings/performance-incentive/performance-incentive.component';
import { PersoanlIncomeTaxComponent } from './pages/settings/persoanl-income-tax/persoanl-income-tax.component';
import { StampBaseComponent } from './pages/settings/stamp-base/stamp-base.component';
import { StampSignComponent } from './pages/settings/stamp-sign/stamp-sign.component';
import { TaxOnVariableAllowancesComponent } from './pages/settings/tax-on-variable-allowances/tax-on-variable-allowances.component';
import { UsersComponent } from './pages/settings/users/users.component';
import { StatiscsComponent } from './pages/statiscs/statiscs.component';
import { PartialPayRollDetailsComponent } from './pages/partial-pay-roll-details/partial-pay-roll-details.component';
import { PartialInvoiceComponent } from './pages/partial-pay-roll-details/partial-invoice/partial-invoice.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'trainingInvoice', component: TrainingInvoiceComponent },
  { path: 'packageInvoice', component: PackageInvoiceComponent },
  { path: 'adminInvoiceOne', component: AdminInvoiceOneComponent },
  { path: 'adminInvoiceTwo', component: AdminInvoiceTwoComponent },
  { path: 'academicInvoiceOne', component: AcademicInvoiceOneComponent },
  { path: 'academicInvoiceTwo', component: AcademicInvoiceTwoComponent },
  { path: 'partialInvoice', component: PartialInvoiceComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'statiscs', component: StatiscsComponent },
      { path: 'adminEmp', component: AdminEmpComponent },
      { path: 'academicEmp', component: AcademicEmpComponent },
      { path: 'adminNew', component: AdminNewComponent },
      { path: 'academicNew', component: AcademicNewComponent },
      { path: 'adminDetails', component: AdminDetailsComponent },
      { path: 'academicDetails', component: AcademicDetailsComponent },
      { path: 'adminPayroll', component: AdminPayrollComponent },
      { path: 'adminPayrollDetails', component: AdminPayrollDetailsComponent },
      { path: 'academicPayroll', component: AcademicPayrollComponent },
      { path: 'packagePayroll', component: PackagePayrollComponent },
      { path: 'packagePayrollDetails', component: PackagePayrollDetailsComponent },
      { path: 'trainingPayRoll', component: TrainingPayrollComponent },
      { path: 'trainingPayRollDetails', component: TrainingPayrollDetailsComponent },
      { path: 'advance', component: AdvancesComponent },
      { path: 'advanceDetails', component: AdvanceDetailsComponent },
      { path: 'absence', component: AbsenceComponent },
      { path: 'partialPayRoll', component: PartialPayRollComponent },
      { path: 'partialPayRollDetails', component: PartialPayRollDetailsComponent },

      {
        path: 'academicPayrollDetails',
        component: AcademicPayrollDetailsComponent,
      },
      { path: 'reports', component: ReportsComponent },
      {
        path: 'settings',
        children: [
          { path: 'users', component: UsersComponent },
          {
            path: 'performanceIncentive',
            component: PerformanceIncentiveComponent,
          },
          {
            path: 'adminsRate',
            component: AdminsRateComponent,
          },
          {
            path: 'academicsRate',
            component: AcademicsRateComponent,
          },
          {
            path: 'internalExperience',
            component: InternalExperienceComponent,
          },
          { path: 'degreeRoller', component: DegreeRollerComponent },
          {
            path: 'firstSocialInsurance',
            component: FirstSocialInsuranceComponent,
          },
          {
            path: 'lastSocialInsurance',
            component: LastSocialInsuranceComponent,
          },
          {
            path: 'taxOnVariableAllowances',
            component: TaxOnVariableAllowancesComponent,
          },
          { path: 'stampBase', component: StampBaseComponent },
          { path: 'stampSign', component: StampSignComponent },
          { path: 'booksAndResearch', component: BooksAndResearchComponent },
          { path: 'package', component: PackageComponent },
          { path: 'training', component: TrainingComponent },
          { path: 'department', component: DepartmentComponent },
          { path: 'personalIncomeTax', component: PersoanlIncomeTaxComponent },
          { path: 'allowance', component: AllowanceComponent },
          { path: 'partial', component: PartialComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
