import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  APIUrl = "http://127.0.0.1:5001/api/v1";
  UserUrl = this.APIUrl + "/User";
  UserByNameUrl = this.APIUrl + "/User/ByName";
  PerformanceIncentiveUrl = this.APIUrl + "/PerformanceIncentive";
  PerformanceIncentiveByNameUrl = this.APIUrl +"/PerformanceIncentive/ByName";
  InternalExperienceUrl = this.APIUrl + "/InternalExperience";
  InternalExperienceByNameUrl = this.APIUrl + "/InternalExperience/ByName";
  DegreeRollerUrl = this.APIUrl + "/DegreeRoller";
  DegreeRollerByExpUrl = this.APIUrl + "/DegreeRoller/ByExp";
  FirstSocialTaxOnVariableAllowanceUrl = this.APIUrl + "/FirstSocialInsurance";
  FirstSocialTaxOnVariableAllowanceByNameUrl = this.APIUrl + "/FirstSocialInsurance/ByName";
  LastSocialTaxOnVariableAllowanceByNameUrl = this.APIUrl + "/LastSocialInsurance/ByName";
  LastSocialTaxOnVariableAllowanceUrl = this.APIUrl + "/LastSocialInsurance";
  PersonalIncomeTaxUrl = this.APIUrl + "/PersonalIncomeTax";
  TaxOnVariableAllowanceUrl = this.APIUrl +'/TaxAllowance';
  TaxOnVariableAllowanceByNameUrl = this.APIUrl +'/TaxAllowance/ByName';
  StampBaseUrl = this.APIUrl + "/StampBase";
  StampBaseByNameUrl = this.APIUrl + "/StampBase/ByName";
  StampSignUrl = this.APIUrl + "/StampSign";
  StampSignByNameUrl = this.APIUrl + "/StampSign/ByName";
  BooksAndResearchUrl = this.APIUrl + "/BookAndSearch";
  BooksAndResearchByNameUrl = this.APIUrl + "/BookAndSearch/ByName";
  PackageUrl=this.APIUrl+"/Package";
  PackagePayRoll=this.APIUrl+"/PackagePayRoll";
  PackagePayRolByIdUrl=this.APIUrl+"/PackagePayRoll/ByIdAndMonth";
  PackageByIdUrl=this.APIUrl+"/Package/ById";
  TrainingUrl=this.APIUrl+"/Training";
  TrainingByIdUrl=this.APIUrl+"/Training/ById";
  TrainingPayRolUrl=this.APIUrl+"/TrainingPayRoll";
  TrainingPayRolByIdUrl=this.APIUrl+"/TrainingPayRoll/ByIdAndMonth";
  DepartmentUrl= this.APIUrl+"/Department";
  DepartmentByTypeUrl= this.APIUrl+"/Department/ByType";
  EmpUrl = this.APIUrl+"/Employee";
  EmpByNameUrl = this.APIUrl+"/Employee/ByName";
  EmpByTtUrl = this.APIUrl+"/Employee/ByTt";
  PayRollUrl = this.APIUrl+"/PayRoll";
  PayRollByIdAndMonthUrl = this.APIUrl+"/PayRoll/ByIdAndMonth";
  AbsenceUrl = this.APIUrl+"/Absence";
  AbsenceByNameAndMonthUrl = this.APIUrl+"/Absence/ByNameAndMonth";
  AbsenceByEmpId = this.APIUrl+"/Absence/ByEmpId";
  AdvanceUrl = this.APIUrl+"/Advance";
  AdvanceByNameAndMonthUrl = this.APIUrl+"/Advance/ByNameAndMonth";
  AdvanceByEmpId = this.APIUrl+"/Advance/ByEmpId";
  AdvanceAccountUrl = this.APIUrl+"/AdvanceAccount";
  PartialAdvanceUrl = this.APIUrl+"/PartialAdvance";
  PartialAdvanceByNameAndMonthUrl = this.APIUrl+"/PartialAdvance/ByNameAndMonth";
  PartialAdvanceByEmpId = this.APIUrl+"/PartialAdvance/ByEmpId";
  AdvanceAccountByNameAndMonthUrl = this.APIUrl+"/AdvanceAccount/ByNameAndMonth";
  PartialAdvanceAccountUrl = this.APIUrl+"/PartialAdvanceAccount";
  PartialAdvanceAccountByNameAndMonthUrl = this.APIUrl+"/PartialAdvanceAccount/ByNameAndMonth";
  PartialAdvanceAccountByEmpId = this.APIUrl+"/PartialAdvanceAccount/ByEmpId";
  AdvanceAccountByEmpId = this.APIUrl+"/AdvanceAccount/ByEmpId";
  AllowanceUrl = this.APIUrl+"/Allowance";
  AllowanceByNameUrl = this.APIUrl+"/Allowance/ByName";
  PartialUrl = this.APIUrl+"/Partial";
  PartialByNameUrl = this.APIUrl+"/Partial/ByName";
  PartialPayRollUrl = this.APIUrl+"/PartialPayRoll";
  PartialPayRollByNameUrl = this.APIUrl+"/PartialPayRoll/ByName";
  PartialPayRollByIdAndMonthUrl = this.APIUrl+"/PartialPayRoll/ByIdAndMonth";
  RoleUrl = this.APIUrl + "/Role";
}
